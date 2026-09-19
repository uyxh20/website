from __future__ import annotations

from pathlib import Path
import re

ROOT = Path(".")


def transform_site() -> None:
    site = (ROOT / "public/site.html").read_text()
    if "In-Between" in site and "User Research" not in site:
        print("site.html already transformed")
        return
    site = site.replace(
        '<h1 class="heading-8">The Go-Between<br/></h1>',
        '<h1 class="heading-8">In-Between<br/></h1>',
        1,
    )
    site = site.replace(
        '<div class="text-block-15">Where Human-Digital Intersection Happens</div>',
        '<div class="text-block-15">Where Human Digital Intersect</div>',
        1,
    )
    old_insights = (
        '<div class="container-2 w-container"><h1 class="heading-3">Human Insights</h1>'
        '<p class="paragraph-2">What do people want? Do they even know what they want? Build with insights. Let me help.</p>'
        '<div class="text-block-2"><a href="mailto:ulysse.ha.19@ucl.ac.uk" class="link-3">Contact</a></div>'
        '<div class="text-block-2"><a href="https://www.linkedin.com/in/ulysse-ha-5945b91ab/" class="link-3">LinkedIn</a></div></div>'
    )
    new_insights = (
        '<style>.uh-plain-links{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px 1.5rem;margin:12px 0 4px;border:0}'
        ".uh-plain-links a{border:0;text-decoration:none}</style>"
        '<div class="container-2 w-container"><h1 class="heading-3">Human Insights</h1>'
        '<p class="paragraph-2">What do people want? Do they even know what they want? Build with insights. Let me help.</p>'
        '<div class="uh-plain-links"><a href="mailto:ulysse.ha.19@ucl.ac.uk" class="link-3">Contact</a>'
        '<a href="https://www.linkedin.com/in/ulysse-ha-5945b91ab/" class="link-3">LinkedIn</a></div></div>'
    )
    if old_insights not in site:
        raise SystemExit("insights block not found")
    site = site.replace(old_insights, new_insights, 1)
    old_writings = (
        '<div class="w-container"><h1 class="heading-3">Writings</h1>'
        '<p class="paragraph-2">All about human-technology interaction: dynamics, culture, emotional experience, perception, and beyond.</p>'
        '<div class="text-block-2"><a href="https://medium.com/@ulysseha" class="link-3">Medium                            </a></div></div>'
    )
    new_writings = (
        '<div class="w-container"><h1 class="heading-3">Writings</h1>'
        '<p class="paragraph-2">All about human-technology interaction: dynamics, culture, emotional experience, perception, and beyond.</p>'
        '<div class="uh-plain-links"><a href="https://medium.com/@ulysseha" class="link-3">Medium</a></div></div>'
    )
    if old_writings not in site:
        raise SystemExit("writings block not found")
    site = site.replace(old_writings, new_writings, 1)
    site = site.replace(
        ".uh-bio-map{position:relative;width:100%;overflow:visible;background:#fff;line-height:0}",
        ".uh-bio-map{position:relative;width:66.666%;margin-left:auto;margin-right:auto;overflow:visible;background:#fff;line-height:0}",
        1,
    )
    old_chips = """<button type=\"button\" class=\"uh-bio-chip\" data-place=\"copenhagen\" style=\"left:54.22%;top:18.96%\" aria-controls=\"uh-bio-card\" aria-expanded=\"false\"><span class=\"uh-bio-city\">Copenhagen</span><span class=\"uh-bio-dot\"></span></button>\n<button type=\"button\" class=\"uh-bio-chip\" data-place=\"london\" style=\"left:49.22%;top:25.63%\" aria-controls=\"uh-bio-card\" aria-expanded=\"false\"><span class=\"uh-bio-city\">London</span><span class=\"uh-bio-dot\"></span></button>\n<button type=\"button\" class=\"uh-bio-chip\" data-place=\"bath\" style=\"left:44.50%;top:28.80%\" aria-controls=\"uh-bio-card\" aria-expanded=\"false\"><span class=\"uh-bio-city\">Bath</span><span class=\"uh-bio-dot\"></span></button>\n<button type=\"button\" class=\"uh-bio-chip\" data-place=\"paris\" style=\"left:50.96%;top:32.50%\" aria-controls=\"uh-bio-card\" aria-expanded=\"false\"><span class=\"uh-bio-city\">Paris</span><span class=\"uh-bio-dot\"></span></button>\n<button type=\"button\" class=\"uh-bio-chip\" data-place=\"chengdu\" style=\"left:73.20%;top:36.80%\" aria-controls=\"uh-bio-card\" aria-expanded=\"false\"><span class=\"uh-bio-city\">Chengdu</span><span class=\"uh-bio-dot\"></span></button>\n<button type=\"button\" class=\"uh-bio-chip uh-bio-chip--east\" data-place=\"shanghai\" style=\"left:83.40%;top:33.60%\" aria-controls=\"uh-bio-card\" aria-expanded=\"false\"><span class=\"uh-bio-city\">Shanghai</span><span class=\"uh-bio-dot\"></span></button>\n<button type=\"button\" class=\"uh-bio-chip\" data-place=\"shenzhen\" style=\"left:80.80%;top:41.80%\" aria-controls=\"uh-bio-card\" aria-expanded=\"false\"><span class=\"uh-bio-city\">Shenzhen</span><span class=\"uh-bio-dot\"></span></button>\n<button type=\"button\" class=\"uh-bio-chip uh-bio-chip--east\" data-place=\"hong-kong\" style=\"left:85.48%;top:43.54%\" aria-controls=\"uh-bio-card\" aria-expanded=\"false\"><span class=\"uh-bio-city\">Hong Kong</span><span class=\"uh-bio-dot\"></span></button>"""
    new_chips = """<button type=\"button\" class=\"uh-bio-chip\" data-place=\"copenhagen\" style=\"left:54.94%;top:21.88%\" aria-controls=\"uh-bio-card\" aria-expanded=\"false\"><span class=\"uh-bio-city\">Copenhagen</span><span class=\"uh-bio-dot\"></span></button>\n<button type=\"button\" class=\"uh-bio-chip uh-bio-chip--east\" data-place=\"london\" style=\"left:49.56%;top:29.10%\" aria-controls=\"uh-bio-card\" aria-expanded=\"false\"><span class=\"uh-bio-city\">London</span><span class=\"uh-bio-dot\"></span></button>\n<button type=\"button\" class=\"uh-bio-chip\" data-place=\"bath\" style=\"left:48.21%;top:31.53%\" aria-controls=\"uh-bio-card\" aria-expanded=\"false\"><span class=\"uh-bio-city\">Bath</span><span class=\"uh-bio-dot\"></span></button>\n<button type=\"button\" class=\"uh-bio-chip uh-bio-chip--east\" data-place=\"paris\" style=\"left:52.28%;top:31.52%\" aria-controls=\"uh-bio-card\" aria-expanded=\"false\"><span class=\"uh-bio-city\">Paris</span><span class=\"uh-bio-dot\"></span></button>\n<button type=\"button\" class=\"uh-bio-chip\" data-place=\"chengdu\" style=\"left:73.87%;top:33.94%\" aria-controls=\"uh-bio-card\" aria-expanded=\"false\"><span class=\"uh-bio-city\">Chengdu</span><span class=\"uh-bio-dot\"></span></button>\n<button type=\"button\" class=\"uh-bio-chip uh-bio-chip--east\" data-place=\"shanghai\" style=\"left:87.44%;top:31.54%\" aria-controls=\"uh-bio-card\" aria-expanded=\"false\"><span class=\"uh-bio-city\">Shanghai</span><span class=\"uh-bio-dot\"></span></button>\n<button type=\"button\" class=\"uh-bio-chip\" data-place=\"shenzhen\" style=\"left:84.70%;top:41.21%\" aria-controls=\"uh-bio-card\" aria-expanded=\"false\"><span class=\"uh-bio-city\">Shenzhen</span><span class=\"uh-bio-dot\"></span></button>\n<button type=\"button\" class=\"uh-bio-chip uh-bio-chip--east\" data-place=\"hong-kong\" style=\"left:84.48%;top:43.71%\" aria-controls=\"uh-bio-card\" aria-expanded=\"false\"><span class=\"uh-bio-city\">Hong Kong</span><span class=\"uh-bio-dot\"></span></button>"""
    if old_chips not in site:
        raise SystemExit("chips not found")
    site = site.replace(old_chips, new_chips, 1)
    old_pp = '<div class="w-container"><h1 class="heading-6">Past Projects</h1></div>'
    new_pp = '<div class="w-container"><h1 class="heading-6">Portfolio</h1></div>'
    if old_pp not in site:
        raise SystemExit("Past Projects heading not found")
    site = site.replace(old_pp, new_pp, 1)
    m = re.search(
        r'\n<div class="w-container"><h1 class="heading-5">User Research[\s\S]*?(?=<script src="webflow/js/jquery)',
        site,
    )
    if not m:
        raise SystemExit("case study block not found")
    site = site[: m.start()] + "\n" + site[m.end() :]
    (ROOT / "public/site.html").write_text(site)
    print("wrote site.html", len(site))


def transform_portfolio() -> None:
    pf = (ROOT / "public/portfolio.html").read_text()
    if 'show("specimen-01")' in pf and "border-bottom:1px solid #767676" not in pf.split(".projects")[0]:
        print("portfolio.html already transformed")
        return
    old_css = """    .specimen-index a{\n      display:grid;\n      grid-template-columns:.18fr 1fr;\n      gap:0 12px;\n      text-decoration:none;\n      color:#030303\n    }\n    .specimen-index-num{\n      color:#767676;\n      text-transform:uppercase;\n      font-family:Roboto,sans-serif;\n      font-size:16px;\n      font-weight:400;\n      border-bottom:1px solid #767676;\n      margin:5px 0 10px;\n      padding-bottom:2px\n    }\n    .specimen-index-title{\n      border-bottom:1px solid #767676;\n      margin:5px 0 10px;\n      padding-bottom:2px;\n      font-weight:400\n    }\n    .projects{display:flex;flex-direction:column;gap:8px}\n    .project{\n      background:#ffffff;\n      border:0;\n      border-top:1px solid #767676;\n      border-radius:0;\n      box-shadow:none;\n      display:flex;\n      flex-direction:column;\n      overflow:visible\n    }"""
    new_css = """    .specimen-index a{\n      display:grid;\n      grid-template-columns:.18fr 1fr;\n      gap:0 12px;\n      text-decoration:none;\n      color:#030303;\n      cursor:pointer;\n      border:0;\n      border-bottom:0\n    }\n    .specimen-index a.is-selected{\n      color:#030303\n    }\n    .specimen-index a.is-selected .specimen-index-num,\n    .specimen-index a.is-selected .specimen-index-title{\n      font-weight:500\n    }\n    .specimen-index-num{\n      color:#767676;\n      text-transform:uppercase;\n      font-family:Roboto,sans-serif;\n      font-size:16px;\n      font-weight:400;\n      border:0;\n      border-bottom:0;\n      margin:5px 0 4px;\n      padding-bottom:0\n    }\n    .specimen-index-title{\n      border:0;\n      border-bottom:0;\n      margin:5px 0 4px;\n      padding-bottom:0;\n      font-weight:400\n    }\n    .projects{display:flex;flex-direction:column;gap:8px}\n    .project{\n      background:#ffffff;\n      border:0;\n      border-top:0;\n      border-radius:0;\n      box-shadow:none;\n      display:flex;\n      flex-direction:column;\n      overflow:visible\n    }"""
    if old_css not in pf:
        raise SystemExit("portfolio css not found")
    pf = pf.replace(old_css, new_css, 1)
    marker = (
        "q('promoxBack').onclick=()=>{if(step>0){step--;render(false)}};"
        "q('promoxNext').onclick=()=>next(true);render(false);\n})();\n</script>\n</body>\n</html>\n"
    )
    inject = marker.replace(
        "</script>\n</body>\n</html>\n",
        """</script>
<script>
(function () {
  var nav = document.querySelector(".specimen-index");
  if (!nav) return;
  var links = nav.querySelectorAll("a[href^='#specimen-']");
  var projects = document.querySelectorAll(".project[id^='specimen-']");
  function show(id) {
    projects.forEach(function (p) {
      p.hidden = p.id !== id;
    });
    links.forEach(function (a) {
      var on = a.getAttribute("href") === "#" + id;
      a.classList.toggle("is-selected", on);
      if (on) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  }
  nav.addEventListener("click", function (e) {
    var a = e.target.closest("a[href^='#specimen-']");
    if (!a || !nav.contains(a)) return;
    e.preventDefault();
    show(a.getAttribute("href").slice(1));
  });
  show("specimen-01");
})();
</script>
</body>
</html>
""",
    )
    if marker not in pf:
        raise SystemExit("portfolio script marker not found")
    pf = pf.replace(marker, inject, 1)
    (ROOT / "public/portfolio.html").write_text(pf)
    print("wrote portfolio.html", len(pf))


def cleanup_workflow() -> None:
    for p in (
        Path(".github/workflows/apply-in-between.py"),
        Path(".github/workflows/apply-in-between.yml"),
    ):
        if p.exists():
            p.unlink()
            print("removed", p)


if __name__ == "__main__":
    transform_site()
    transform_portfolio()
    cleanup_workflow()
