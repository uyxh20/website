#!/usr/bin/env python3
"""Assemble the Webflow carbon copy plus Face, injected after Portfolio."""

from __future__ import annotations

import argparse
import re
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
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

PORTFOLIO_HEADING = (
    '<div class="w-container"><h1 class="heading-6">Portfolio</h1></div>'
)
LEGACY_PAST_PROJECTS_HEADING = (
    '<div class="w-container"><h1 class="heading-6">Past Projects</h1></div>'
)
CASE_STUDY_RE = re.compile(
    r'\s*<div class="w-container"><h1 class="heading-5">User Research'
    r'[\s\S]*?(?=<script src="(?:/)?webflow/js/jquery)',
    re.I,
)

FACE_BLOCK_RE = re.compile(
    r'\s*<iframe id="uh-face-portfolio"[\s\S]*?</iframe>\s*'
    r'(?:<script>[\s\S]*?uh-face-portfolio[\s\S]*?</script>\s*)?',
    re.I,
)

APPEND = """
<iframe id="uh-face-portfolio" src="portfolio.html" title="Ulysse AI Product and Transformation Portfolio" style="display:block;width:100%;border:0;margin:0;padding:0;background:#ffffff;height:0;min-height:0;overflow:hidden"></iframe>
<script>
(function () {
  var frame = document.getElementById("uh-face-portfolio");
  if (!frame) return;
  var fitting = false;
  function fit() {
    if (fitting) return;
    fitting = true;
    try {
      var doc = frame.contentDocument || frame.contentWindow.document;
      if (!doc) return;
      var shell = doc.querySelector("main.shell") || doc.body;
      if (!shell) return;
      var height = Math.ceil(Math.max(shell.offsetHeight, shell.getBoundingClientRect().height));
      if (height > 0 && String(height) !== String(parseInt(frame.style.height, 10))) {
        frame.style.height = height + "px";
      }
    } catch (e) {}
    fitting = false;
  }
  frame.addEventListener("load", function () {
    fit();
    [50, 250, 500, 800].forEach(function (ms) { setTimeout(fit, ms); });
    try {
      var doc = frame.contentDocument || frame.contentWindow.document;
      if (!doc) return;
      var requested = window.location.hash.match(/^#specimen-(0[1-7])$/);
      if (requested) frame.contentWindow.postMessage({ type: "portfolio-open", id: requested[0].slice(1) }, window.location.origin);
      if (window.ResizeObserver) {
        var ro = new ResizeObserver(fit);
        var shell = doc.querySelector("main.shell");
        if (shell) ro.observe(shell);
      } else {
        setInterval(fit, 1000);
      }
      doc.querySelectorAll("details").forEach(function (node) {
        node.addEventListener("toggle", fit);
      });
      doc.addEventListener("click", function () {
        [50, 250, 500].forEach(function (ms) { setTimeout(fit, ms); });
      });
    } catch (e) {
      setInterval(fit, 1000);
    }
  });
  window.addEventListener("message", function (event) {
    if (event.origin !== window.location.origin || event.source !== frame.contentWindow || !event.data || event.data.type !== "portfolio-folder") return;
    if (!/^specimen-0[1-7]$/.test(event.data.id)) return;
    history.replaceState(null, "", window.location.pathname + window.location.search + "#" + event.data.id);
    [50, 250, 500].forEach(function (ms) { setTimeout(fit, ms); });
  });
})();
</script>
"""


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
    # Relative so the site works at both `/` (local Next) and `/website/` (GitHub Pages).
    return local_path_for(url).relative_to(PUBLIC).as_posix()


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
    for remote, local in sorted(mapping.items(), key=lambda kv: len(kv[0]), reverse=True):
        html = html.replace(remote, local)
        html = html.replace(urllib.parse.unquote(remote), local)
    return html


def fetch_live() -> str:
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
    return rewrite_html(html, mapping)


def make_site_relative(html: str) -> str:
    html = html.replace("/webflow/", "webflow/")
    html = html.replace('src="/portfolio.html"', 'src="portfolio.html"')
    html = html.replace("src='/portfolio.html'", "src='portfolio.html'")
    return html


def strip_webflow_badge(html: str) -> str:
    html = html.replace("<!-- This site was created in Webflow. https://www.webflow.com -->", "")
    html = html.replace(' data-wf-domain="ulysseh.webflow.io"', "")
    html = html.replace('<meta content="Webflow" name="generator"/>', "")
    return html


def normalize_portfolio_heading(html: str) -> str:
    if PORTFOLIO_HEADING in html:
        return html
    if LEGACY_PAST_PROJECTS_HEADING in html:
        return html.replace(LEGACY_PAST_PROJECTS_HEADING, PORTFOLIO_HEADING, 1)
    raise SystemExit(
        "Portfolio heading not found; refusing to append Face at </body>"
    )


def strip_case_studies(html: str) -> str:
    html, n = CASE_STUDY_RE.subn("\n", html, count=1)
    return html


def inject_face(html: str) -> str:
    html = FACE_BLOCK_RE.sub("\n", html)
    html = normalize_portfolio_heading(html)
    html = strip_case_studies(html)
    if "</body>" not in html.lower():
        raise SystemExit("no body close tag")
    return html.replace(PORTFOLIO_HEADING, PORTFOLIO_HEADING + APPEND, 1)


def face_is_under_portfolio(html: str) -> bool:
    face_at = html.find('id="uh-face-portfolio"')
    heading_at = html.find(PORTFOLIO_HEADING)
    if face_at < 0 or heading_at < 0 or face_at < heading_at:
        return False
    for banned in (
        "User Research",
        "PROGRAM MANAGEMENT",
        "Ops Optimisation",
        '<h1 class="heading-5">Communication</h1>',
    ):
        if banned in html:
            return False
    return True


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--from-live",
        action="store_true",
        help="Re-fetch ulysseh.webflow.io instead of re-injecting into local site.html",
    )
    args = parser.parse_args()

    if not PORTFOLIO.exists():
        raise SystemExit("missing public/portfolio.html")

    if args.from_live or not SITE.exists():
        html = fetch_live()
    else:
        html = SITE.read_text()

    html = strip_webflow_badge(inject_face(html))
    html = make_site_relative(html)
    if not face_is_under_portfolio(html):
        raise SystemExit("Face iframe is not under Portfolio, or case studies remain")

    SITE.write_text(html)
    print("wrote", SITE, "bytes", SITE.stat().st_size)


if __name__ == "__main__":
    main()
