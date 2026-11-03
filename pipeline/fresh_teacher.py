"""Inventory the complete Fresh Teacher GitHub Pages tree at a pinned revision."""
import argparse
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
import json
from pathlib import Path
from urllib.parse import quote, urljoin, urlsplit, unquote, urldefrag
from urllib.request import Request, urlopen

REPO = "Fresh-Teacher/fresh-teacher.github.io"
API = f"https://api.github.com/repos/{REPO}"


def get_json(url):
    with urlopen(Request(url, headers={"Accept": "application/vnd.github+json"}), timeout=45) as response:
        return json.load(response)


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = []

    def handle_starttag(self, tag, attrs):
        self.urls.extend(value for name, value in attrs if name in {"href", "src", "data"} and value)


def read_links(revision, path):
    url = f"https://raw.githubusercontent.com/{REPO}/{revision}/{quote(path)}"
    try:
        with urlopen(url, timeout=30) as response:
            body = response.read().decode("utf-8-sig", errors="replace")
        if path.lower().endswith(".json"):
            rows = json.loads(body)
            if not isinstance(rows, list):
                return path, [], None
            return path, [
                value for row in rows if isinstance(row, dict)
                for key, value in row.items()
                if key.lower() in {"pdfurl", "url", "link"} and isinstance(value, str)
            ], None
        parser = Links()
        parser.feed(body)
        return path, parser.urls, None
    except (OSError, ValueError) as error:
        return path, [], str(error)


def inventory(crawl_links=False):
    revision = get_json(f"{API}/commits/HEAD")["sha"]
    tree = get_json(f"{API}/git/trees/{revision}?recursive=1")
    if tree["truncated"]:
        raise RuntimeError("GitHub returned a partial tree. No inventory was written.")
    documents = {}
    for entry in tree["tree"]:
        path = entry["path"]
        if entry["type"] != "blob" or not path.lower().endswith(".pdf"):
            continue
        digest = entry["sha"]
        document = documents.setdefault(digest, {
            "gitBlob": digest, "bytes": entry["size"], "paths": [],
        })
        document["paths"].append(path)
    for document in documents.values():
        path = quote(document["paths"][0])
        document["sourceUrl"] = f"https://raw.githubusercontent.com/{REPO}/{revision}/{path}"
        document["rights"] = "unverified"
    result = {"repository": REPO, "revision": revision, "documents": list(documents.values())}
    if crawl_links:
        by_path = {path: doc for doc in documents.values() for path in doc["paths"]}
        pages = [entry["path"] for entry in tree["tree"]
                 if entry["type"] == "blob" and entry["path"].lower().endswith((".html", ".json"))]
        external = {}
        failures = {}
        with ThreadPoolExecutor(max_workers=8) as workers:
            for page, links, error in workers.map(lambda path: read_links(revision, path), pages):
                if error:
                    failures[page] = error
                for link in links:
                    url = urldefrag(urljoin(f"https://fresh-teacher.github.io/{quote(page)}", link))[0]
                    parsed = urlsplit(url)
                    path = unquote(parsed.path.lstrip("/"))
                    if parsed.scheme not in {"http", "https"} or not path.lower().endswith(".pdf"):
                        continue
                    document = by_path.get(path) if parsed.hostname == "fresh-teacher.github.io" else None
                    pages_for_link = document.setdefault("listedIn", []) if document else external.setdefault(url, [])
                    if page not in pages_for_link:
                        pages_for_link.append(page)
        result["crawl"] = {"filesScanned": len(pages) - len(failures), "failures": failures,
                           "unresolvedPdfLinks": external}
    return result


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("output", type=Path)
    parser.add_argument("--crawl-links", action="store_true", help="Scan every HTML and JSON file for PDF links")
    args = parser.parse_args()
    result = inventory(args.crawl_links)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    temporary = args.output.with_suffix(".tmp")
    temporary.write_text(json.dumps(result, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    temporary.replace(args.output)
    documents = result["documents"]
    print(f'{sum(len(d["paths"]) for d in documents)} PDF paths, {len(documents)} unique blobs')
