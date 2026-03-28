import os
from PIL import Image

directory = 'c:/Users/abc/OneDrive/Desktop/majlis'

# 1. Update logo size in all HTML files
html_files = [f for f in os.listdir(directory) if f.endswith('.html')]

for f in html_files:
    filepath = os.path.join(directory, f)
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace height: 40px with height: 65px for a noticeably bigger logo
    content = content.replace('style="height: 40px;', 'style="height: 65px;')
    
    with open(filepath, 'w', encoding='utf-8') as file:
        file.write(content)

print(f"Updated logo height to 65px in {len(html_files)} HTML files.")

# 2. Remove white background from logo.png
img_path = os.path.join(directory, 'assets', 'images', 'logo.png')
try:
    img = Image.open(img_path)
    
    # Ensure it's in RGBA (so it supports transparency)
    img = img.convert("RGBA")
    
    datas = img.getdata()
    newData = []
    
    # Target all very bright pixels (white/off-white background) and make them completely transparent
    for item in datas:
        # Check if R, G, B channels are all high (light gray/white)
        # 240+ covers standard #FFFFFF and #F8F8F8 compression artifacts
        if item[0] >= 235 and item[1] >= 235 and item[2] >= 235:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(img_path, "PNG")
    print("Successfully removed the white background from the uploaded logo image.")
except Exception as e:
    print(f"Could not process image: {e}")
