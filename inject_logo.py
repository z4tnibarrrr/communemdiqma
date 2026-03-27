import os

directory = 'c:/Users/abc/OneDrive/Desktop/majlis'

SEARCH_ICON = '<i class="fa-solid fa-building-columns"></i>'
REPLACE_IMG = '<img src="assets/images/logo.png" alt="شعار جماعة المضيق" style="height: 40px; width: auto; max-width: 100%; object-fit: contain;">'

files = [f for f in os.listdir(directory) if f.endswith('.html')]

for f in files:
    filepath = os.path.join(directory, f)
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # In index.html, commune.html, etc, the logo is used as:
    # <a href="index.html" class="logo">
    #     <i class="fa-solid fa-building-columns"></i>
    #     <span>جماعة المضيق</span>
    # </a>
    # Same within .footer-logo
    
    # Let's target the exact string and context to avoid replacing random icons
    content = content.replace(f'class="logo">\n                {SEARCH_ICON}', f'class="logo">\n                {REPLACE_IMG}')
    content = content.replace(f'class="footer-logo">\n                        {SEARCH_ICON}', f'class="footer-logo">\n                        {REPLACE_IMG}')
    
    # Just to be extremely careful if tabs/spaces differ:
    content = content.replace(f'<a href="index.html" class="logo">\n                <i class="fa-solid fa-building-columns"></i>', f'<a href="index.html" class="logo">\n                {REPLACE_IMG}')
    content = content.replace(f'<a href="#" class="logo">\n                <i class="fa-solid fa-building-columns"></i>', f'<a href="index.html" class="logo">\n                {REPLACE_IMG}')
    content = content.replace(f'<a href="index.html" class="footer-logo">\n                        <i class="fa-solid fa-building-columns"></i>', f'<a href="index.html" class="footer-logo">\n                        {REPLACE_IMG}')
    content = content.replace(f'<a href="#" class="footer-logo">\n                        <i class="fa-solid fa-building-columns"></i>', f'<a href="index.html" class="footer-logo">\n                        {REPLACE_IMG}')
    
    with open(filepath, 'w', encoding='utf-8') as file:
        file.write(content)
        
print("Logo injection complete.")
