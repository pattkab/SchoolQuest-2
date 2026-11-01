#!/usr/bin/env python3
"""Used by both native IDE builds: reject a local or placeholder Release shell."""
import json
import re
import sys
from urllib.parse import urlsplit

try:
    with open(sys.argv[1], encoding="utf8") as config_file:
        server = json.load(config_file).get("server", {})
    url = urlsplit(server.get("url", ""))
    host = (url.hostname or "").lower()
    if (url.scheme != "https" or not host or "." not in host
            or ":" in host or re.match(r"\d+\.", host)
            or re.search(r"(^|\.)(localhost|local|test|example|invalid)$", host)
            or url.username or url.password or url.query or url.fragment
            or url.path not in ("", "/") or server.get("cleartext") is not False):
        raise ValueError("Release requires a public HTTPS SchoolQuest origin with cleartext disabled")
except (OSError, ValueError, IndexError) as error:
    sys.exit(f"SchoolQuest release blocked: {error}. Set SCHOOLQUEST_APP_URL and run npm run android:release or ios:release.")
print("SchoolQuest hosted release configuration verified.")
