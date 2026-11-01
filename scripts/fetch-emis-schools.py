#!/usr/bin/env python3
"""Download the public EMIS school register into data/ug-schools.json."""

import html
import http.cookiejar
import json
import re
import socket
import threading
import time
import urllib.request
from pathlib import Path

socket.setdefaulttimeout(45)

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "ug-schools.json"
JSONL = ROOT / "data" / "ug-schools.jsonl"
STATE = ROOT / "data" / "emis-fetch-state.json"
TYPES = ["1", "2", "3", "4", "5", "6", "7"]
PAGE_SIZE = 200
WORKERS = 4

lock = threading.Lock()
state = {"pages": [], "schools": {}}


def load_state():
    if JSONL.exists():
        for line in JSONL.read_text().splitlines():
            if not line.strip():
                continue
            row = json.loads(line)
            state["schools"][row["id"]] = row
    if STATE.exists():
        saved = json.loads(STATE.read_text())
        state["pages"] = saved.get("pages", [])


def save_page(type_id, page, rows):
    with lock:
        key = f"{type_id}:{page}"
        if key not in state["pages"]:
            state["pages"].append(key)
        with JSONL.open("a") as handle:
            for row in rows:
                if row["id"] in state["schools"]:
                    continue
                state["schools"][row["id"]] = row
                handle.write(json.dumps(row, ensure_ascii=False) + "\n")
        STATE.write_text(json.dumps({"pages": state["pages"]}))


def write_catalog():
    rows = sorted(state["schools"].values(), key=lambda row: (row["name"], row["district"]))
    payload = {
        "source": "Ministry of Education and Sports EMIS public register",
        "url": "https://emis.go.ug/emis/public-search",
        "fetched": "2026-10-31",
        "count": len(rows),
        "schools": rows,
    }
    OUT.write_text(json.dumps(payload, ensure_ascii=False))
    print(f"wrote {len(rows)} schools", flush=True)


def parse_cards(fragment):
    rows = []
    for part in fragment.split("showSchoolDetails(")[1:]:
        id_match = re.match(r"(\d+)", part)
        name_match = re.search(r'class="title text-dark">([^<]+)</span>', part)
        if not id_match or not name_match:
            continue
        place = re.search(r'ni-map-pin"></em>\s*<span[^>]*>([^<]+)</span>', part)
        level = re.search(r'ni-book"></em>\s*<span[^>]*>([^<]+)</span>', part)
        status = re.search(r"badge[^>]*>\s*([A-Z][A-Z ]*)\s*<", part)
        rows.append(
            {
                "id": id_match.group(1),
                "name": html.unescape(name_match.group(1)).strip(),
                "district": html.unescape(place.group(1)).strip() if place else "",
                "level": html.unescape(level.group(1)).strip() if level else "",
                "status": status.group(1).strip() if status else "ACTIVE",
            }
        )
    return rows


class Session:
    def __init__(self):
        self.jar = http.cookiejar.CookieJar()
        self.opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(self.jar))
        self.csrf = ""
        self.snap = ""
        self.open_search()

    def open_search(self):
        request = urllib.request.Request(
            "https://emis.go.ug/emis/public-search",
            headers={"User-Agent": "SchoolQuest/1.0"},
        )
        page = self.opener.open(request, timeout=40).read().decode("utf-8", "replace")
        self.csrf = re.search(r'csrf-token" content="([^"]+)"', page).group(1)
        self.snap = html.unescape(re.search(r'wire:snapshot="([^"]+)"', page).group(1))

    def call(self, updates, calls):
        payload = {
            "_token": self.csrf,
            "components": [{"snapshot": self.snap, "updates": updates, "calls": calls}],
        }
        request = urllib.request.Request(
            "https://emis.go.ug/livewire/update",
            data=json.dumps(payload).encode(),
            headers={
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Livewire": "true",
                "User-Agent": "SchoolQuest/1.0",
                "Referer": "https://emis.go.ug/emis/public-search",
                "Origin": "https://emis.go.ug",
                "X-CSRF-TOKEN": self.csrf,
            },
        )
        body = json.loads(self.opener.open(request, timeout=90).read().decode())
        component = body["components"][0]
        self.snap = component["snapshot"]
        return component

    def search(self, type_id):
        component = self.call(
            {"school_type_id": type_id, "schoolPerPage": PAGE_SIZE, "schoolSearch": ""},
            [{"path": "", "method": "performSchoolSearch", "params": []}],
        )
        data = json.loads(component["snapshot"])["data"]
        return int(data["schoolTotalPages"]), component["effects"].get("html", "")

    def page(self, number):
        component = self.call({}, [{"path": "", "method": "schoolGoToPage", "params": [number]}])
        return component["effects"].get("html", "")


def walk(type_id, pages):
    page = 1
    while page <= pages:
        key = f"{type_id}:{page}"
        if key in state["pages"]:
            page += 1
            continue
        try:
            session = Session()
            total, fragment = session.search(type_id)
            pages = total
            if page > total:
                return
            if page != 1:
                fragment = session.page(page)
            while page <= total:
                key = f"{type_id}:{page}"
                if key not in state["pages"]:
                    rows = parse_cards(fragment)
                    if not rows:
                        raise RuntimeError(f"empty {key}")
                    save_page(type_id, page, rows)
                    print(f"{key} {len(rows)} total {len(state['schools'])}", flush=True)
                page += 1
                if page <= total:
                    fragment = session.page(page)
        except Exception as error:
            print(f"retry {type_id}:{page} {error}", flush=True)
            time.sleep(2)


def totals():
    return [("1", 143), ("2", 266), ("3", 45), ("4", 8), ("5", 30), ("6", 30), ("7", 30)]


def main():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    load_state()
    print(f"resume schools {len(state['schools'])}", flush=True)
    for item in totals():
        walk(*item)
    write_catalog()


if __name__ == "__main__":
    main()
