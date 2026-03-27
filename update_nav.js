const fs = require('fs');
const path = require('path');

const directoryPath = 'c:/Users/abc/OneDrive/Desktop/majlis';
const files = [
    'index.html',
    'commune.html',
    'features.html',
    'opportunities.html',
    'council.html',
    'committees.html',
    'decisions.html',
    'services.html',
    'taxes.html',
    'eservices.html',
    'governance.html',
    'contact.html'
];

function getNavBlock(fileName) {
    const isIndex = fileName === 'index.html' ? ' active' : '';
    
    const isCommune = ['commune.html', 'features.html', 'opportunities.html'].includes(fileName) ? ' active' : '';
    
    const isCouncil = ['council.html', 'committees.html', 'decisions.html'].includes(fileName) ? ' active' : '';
    
    const isServices = ['services.html', 'taxes.html', 'eservices.html'].includes(fileName) ? ' active' : '';
    
    const isGovernance = fileName === 'governance.html' ? ' active' : '';
    const isContact = fileName === 'contact.html' ? ' active' : '';

    return `<nav class="nav-menu" id="nav-menu" aria-label="Main Navigation">
                <ul class="nav-list">
                    <li><a href="index.html" class="nav-link${isIndex}">الرئيسية</a></li>
                    <li class="dropdown">
                        <a href="#" class="nav-link${isCommune}" aria-haspopup="true" aria-expanded="false" role="button">الجماعة <i class="fa-solid fa-chevron-down"></i></a>
                        <ul class="dropdown-menu" aria-label="submenu">
                            <li><a href="commune.html">تقديم الجماعة</a></li>
                            <li><a href="features.html">المؤهلات والمميزات</a></li>
                            <li><a href="opportunities.html">الفرص</a></li>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a href="#" class="nav-link${isCouncil}" aria-haspopup="true" aria-expanded="false" role="button">المجلس الجماعي <i class="fa-solid fa-chevron-down"></i></a>
                        <ul class="dropdown-menu" aria-label="submenu">
                            <li><a href="council.html">مكتب المجلس</a></li>
                            <li><a href="committees.html">لجان المجلس</a></li>
                            <li><a href="decisions.html">مقررات الدورات</a></li>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a href="#" class="nav-link${isServices}" aria-haspopup="true" aria-expanded="false" role="button">الخدمات <i class="fa-solid fa-chevron-down"></i></a>
                        <ul class="dropdown-menu" aria-label="submenu">
                            <li><a href="services.html">قائمة الخدمات</a></li>
                            <li><a href="taxes.html">الضرائب والرسوم</a></li>
                            <li><a href="eservices.html">خدمات إلكترونية</a></li>
                        </ul>
                    </li>
                    <li><a href="governance.html" class="nav-link${isGovernance}">الحكامة</a></li>
                    <li><a href="contact.html" class="nav-link${isContact}">اتصل بنا</a></li>
                </ul>
            </nav>`;
}

files.forEach(file => {
    const filePath = path.join(directoryPath, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Regex to match the nav-menu block
        const regex = /<nav class="nav-menu"([\s\S]*?)<\/nav>/;
        
        if (regex.test(content)) {
            const newContent = content.replace(regex, getNavBlock(file));
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Updated navigation in ${file}`);
        } else {
            console.log(`Nav block not found in ${file}`);
        }
    } else {
        console.log(`File not found: ${file}`);
    }
});
console.log('Update Complete.');
