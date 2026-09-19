#!/usr/bin/env python3
"""Assemble a carbon copy of ulysseh.webflow.io plus the Face portfolio append."""

from __future__ import annotations

import re
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path("/workspace")
PUBLIC = ROOT / "public"
WEBFLOW_DIR = PUBLIC / "webflow"
SITE = PUBLIC / "site.html"
PORTFOLIO = PUBLIC / "portfolio.html"
LIVE = "https://ulysseh.webflow.io/"
UA = {"User-Agent": "Mozilla/5.0"}

REWRITE_PREFIXES = (
    "https://uploads-ssl.webflow.com/",
    "http://uploads-ssl.webflow.com/",
    "https://d3e54v103j8qbb.cloudfront.net/",
)


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=120) as res:
        return res.read()


def local_path_for(url: str) -> Path:
    parsed = urllib.parse.urlparse(url)
    rel = parsed.path.lstrip("/")
    if parsed.netloc.startswith("d3e54v103j8qbb"):
        rel = "js/" + Path(rel).name.split("?")[0]
        if not rel.endswith(".js"):
            rel = "js/jquery-3.5.1.min.js"
    return WEBFLOW_DIR / urllib.parse.unquote(rel)


def public_url_for(url: str) -> str:
    path = local_path_for(url)
    return "/" + path.relative_to(PUBLIC).as_posix()


def collect_urls(html: str) -> list[str]:
    found: list[str] = []
    found += re.findall(r'(?:href|src)=["\']([^"\']+)["\']', html)
    for srcset in re.findall(r'srcset=["\']([^"\']+)["\']', html):
        for part in srcset.split(","):
            u = part.strip().split(" ")[0]
            if u:
                found.append(u)
    found += re.findall(r'"url":\s*"(https:[^"]+)"', html)
    out: list[str] = []
    seen: set[str] = set()
    for raw in found:
        if raw.startswith("//"):
            raw = "https:" + raw
        if not raw.startswith("http"):
            continue
        if not any(raw.startswith(p) for p in REWRITE_PREFIXES) and "uploads-ssl.webflow.com" not in raw and "webflow.com/img/" not in raw:
            if "d3e54v103j8qbb.cloudfront.net" not in raw:
                continue
        key = raw.split("?")[0]
        if key in seen:
            continue
        seen.add(key)
        out.append(raw)
    return out


def rewrite_html(html: str, mapping: dict[str, str]) -> str:
    # Longest first so srcset variants don't partially collide wrongly
    for remote, local in sorted(mapping.items(), key=lambda kv: len(kv[0]), reverse=True):
        html = html.replace(remote, local)
        html = html.replace(urllib.parse.unquote(remote), local)
    return html


APPEND = """
<iframe id="uh-face-portfolio" src="/portfolio.html" title="Ulysse AI Product and Transformation Portfolio" style="display:block;width:100%;border:0;margin:0;padding:0;min-height:100vh;height:100vh"></iframe>
<script>
(function () {
  var frame = document.getElementById("uh-face-portfolio");
  if (!frame) return;
  function fit() {
    try {
      var doc = frame.contentDocument || frame.contentWindow.document;
      var height = Math.max(
        doc.documentElement.scrollHeight,
        doc.body.scrollHeight
      );
      frame.style.height = height + "px";
    } catch (e) {}
  }
  frame.addEventListener("load", function () {
    fit();
    try {
      var doc = frame.contentDocument || frame.contentWindow.document;
      if (window.ResizeObserver) {
        new ResizeObserver(fit).observe(doc.documentElement);
        new ResizeObserver(fit).observe(doc.body);
      } else {
        setInterval(fit, 1000);
      }
    } catch (e) {
      setInterval(fit, 1000);
    }
  });
})();
</script>
"""


def main() -> None:
    WEBFLOW_DIR.mkdir(parents=True, exist_ok=True)
    html = fetch(LIVE).decode("utf-8", errors="replace")
    mapping: dict[str, str] = {}
    for url in collect_urls(html):
        dest = local_path_for(url)
        dest.parent.mkdir(parents=True, exist_ok=True)
        if not dest.exists():
            print("download", url)
            dest.write_bytes(fetch(url.split("?")[0] if "cloudfront" not in url else url))
        mapping[url] = public_url_for(url)
        mapping[url.split("?")[0]] = public_url_for(url)

    html = rewrite_html(html, mapping)
    if "</body>" not in html.lower():
        raise SystemExit("no body close tag")
    # Append Face portfolio on the same canvas, after the Webflow clone.
    html = re.sub(r"</body>", APPEND + "</body>", html, count=1, flags=re.I)

    if not PORTFOLIO.exists():
        raise SystemExit("missing public/portfolio.html")

    SITE.write_text(html)
    print("wrote", SITE, "bytes", SITE.stat().st_size)


if __name__ == "__main__":
    main()
