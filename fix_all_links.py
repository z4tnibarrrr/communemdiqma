import os
import re

directory = 'c:/Users/abc/OneDrive/Desktop/majlis'

FOOTER_OLD = """                    <div class="social-links">
                        <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                        <a href="#"><i class="fa-brands fa-twitter"></i></a>
                        <a href="#"><i class="fa-brands fa-youtube"></i></a>
                    </div>"""

FOOTER_NEW = """                    <div class="social-links">
                        <a href="https://facebook.com/communemdiq"><i class="fa-brands fa-facebook-f"></i></a>
                        <a href="https://twitter.com/communemdiq"><i class="fa-brands fa-twitter"></i></a>
                        <a href="https://youtube.com/communemdiq"><i class="fa-brands fa-youtube"></i></a>
                    </div>"""

def replace_links(content, filename):
    # 1. Update Footer
    content = content.replace(FOOTER_OLD, FOOTER_NEW)

    content = content.replace('href="#">خريطة الموقع</a>', 'href="details.html">خريطة الموقع</a>')
    content = content.replace('href="#">فضاء الاقتراحات</a>', 'href="contact.html">فضاء الاقتراحات</a>')
    content = content.replace('href="#">الأسئلة الشائعة</a>', 'href="faq.html">الأسئلة الشائعة</a>')
    
    content = content.replace('href="#">بوابة المغرب</a>', 'href="https://www.maroc.ma">بوابة المغرب</a>')
    content = content.replace('href="#">بوابة الصفقات العمومية</a>', 'href="https://www.marchespublics.gov.ma">بوابة الصفقات العمومية</a>')
    content = content.replace('href="#">الأمانة العامة للحكومة</a>', 'href="http://www.sgg.gov.ma">الأمانة العامة للحكومة</a>')
    content = content.replace('href="#">وزارة الداخلية</a>', 'href="https://www.interieur.gov.ma">وزارة الداخلية</a>')

    # 2. Specific Page Elements
    if filename == 'eservices.html':
        content = re.sub(r'<a href="#" class="btn btn-outline"(.*?)Watiqa.*?</p>\s*<a href="#"', 
                         r'<a href="https://www.watiqa.ma" class="btn btn-outline" target="_blank"', content, flags=re.DOTALL)
        content = content.replace('href="#" class="btn btn-outline" style="width: 100%;">الولوج للمنصة', 'href="https://www.rokhas.ma" class="btn btn-outline" target="_blank" style="width: 100%;">الولوج للمنصة')
        # Just catch any remaining href="#" in eservices except nav
        content = re.sub(r'href="#"([^>]*)>الولوج للمنصة', r'href="https://service-public.ma"\1>الولوج للمنصة', content)

    # 3. Downloads (Decisions, Taxes, Services)
    pdf_text_patterns = [
        "تحميل المحضر", 
        "تحميل الوثيقة (PDF)", 
        "التفاصيل (PDF)", 
        "تحميل التقارير",
        "تنزيل"
    ]
    for pattern in pdf_text_patterns:
        content = re.sub(r'href="#"([^>]*)>' + pattern, r'href="assets/document.pdf" download="document.pdf"\1>' + pattern, content)
        
    # 4. Read More / See Details buttons 
    # This targets class="btn btn-primary" or "btn-outline" followed by something like التفاصيل or similar
    detail_patterns = [
        "الاطلاع على التفاصيل",
        "تصفح الهيكلة",
        "قائمة المشاريع",
        "الاطلاع على الإعلانات",
        "تشكيلة اللجنة",
        "التفاصيل"
    ]
    for pattern in detail_patterns:
        content = re.sub(r'href="#"([^>]*)>[\s<i[a-z"=\- ]*>]*' + pattern, r'href="details.html"\1>' + pattern, content)

    # Clean up generic details button
    content = re.sub(r'href="#"([^>]*)>(\s*<i[^>]*>.*?</i>\s*)?التفاصيل', r'href="details.html"\1>\2التفاصيل', content)
    
    return content


files = [f for f in os.listdir(directory) if f.endswith('.html')]

for f in files:
    filepath = os.path.join(directory, f)
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    
    new_content = replace_links(content, f)
    
    with open(filepath, 'w', encoding='utf-8') as file:
        file.write(new_content)
        
print("Bulk replacement complete.")
