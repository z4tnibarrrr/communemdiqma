"""
Injects the page progress bar div into all HTML pages that are missing it.
"""
import os
import re

pages = [
    "commune.html", "features.html", "opportunities.html",
    "council.html", "committees.html", "decisions.html",
    "services.html", "taxes.html", "eservices.html",
    "governance.html", "contact.html", "faq.html",
    "details.html"
]

progress_bar = '    <!-- Page Progress Bar -->\n    <div id="page-progress" style="width:0%"></div>\n'

base = r"c:\Users\abc\OneDrive\Desktop\majlis"

for page in pages:
    filepath = os.path.join(base, page)
    if not os.path.exists(filepath):
        print(f"SKIP (not found): {page}")
        continue

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    if 'id="page-progress"' in content:
        print(f"SKIP (already has): {page}")
        continue

    # Insert right after <body>
    new_content = re.sub(
        r'(<body[^>]*>)',
        r'\1\n' + progress_bar,
        content,
        count=1
    )

    if new_content != content:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"UPDATED: {page}")
    else:
        print(f"NO MATCH: {page}")
