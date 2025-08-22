# نشر موقع MAX TV PRO على Cloudways

## معلومات الخادم:
- **IP:** 209.38.216.128
- **Username:** extramaxpro
- **Password:** eXtr@1122
- **Webroot:** public_html/

## خطوات النشر:

### 1. رفع الملفات
```bash
# ضغط الملفات (استثناء المجلدات غير المطلوبة)
tar -czf max-tv-pro.tar.gz --exclude=node_modules --exclude=.git --exclude=.next .

# رفع الملف المضغوط
scp max-tv-pro.tar.gz extramaxpro@209.38.216.128:~/
```

### 2. الاتصال بالخادم وإعداد المشروع
```bash
# الاتصال بالخادم
ssh extramaxpro@209.38.216.128

# استخراج الملفات
cd ~/public_html
tar -xzf ../max-tv-pro.tar.gz

# تثبيت المتطلبات
npm install

# بناء المشروع
npm run build

# تشغيل المشروع (للاختبار)
npm start
```

### 3. إعداد PM2 للتشغيل المستمر
```bash
# تثبيت PM2 (إذا لم يكن مثبت)
npm install -g pm2

# تشغيل المشروع مع PM2
pm2 start npm --name "max-tv-pro" -- start

# حفظ إعدادات PM2
pm2 save
pm2 startup
```

### 4. إعداد Nginx (إذا لزم الأمر)
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## ملاحظات مهمة:
- الموقع يعمل على المنفذ 3000 افتراضياً
- يدعم اللغتين العربية والإنجليزية
- جميع تحسينات SEO مفعلة
- الصور محسنة للأداء

## اختبار الموقع:
بعد النشر، تأكد من:
- [ ] الصفحة الرئيسية تعمل
- [ ] التبديل بين اللغات يعمل
- [ ] الصور تظهر بشكل صحيح
- [ ] نماذج الاتصال تعمل
- [ ] الـ SEO metadata موجود

## استكشاف الأخطاء:
```bash
# عرض سجلات PM2
pm2 logs max-tv-pro

# إعادة تشغيل التطبيق
pm2 restart max-tv-pro

# حالة التطبيق
pm2 status
```
