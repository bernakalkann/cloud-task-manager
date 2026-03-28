# Cloud Task Manager

3522 Bulut Bilişim Dersi (Proje 1) kapsamında Çift Katmanlı (Dual-Tier) bir Web Uygulaması olarak geliştirilmiştir.

Uygulama, modern **React** ile ön yüz (Frontend) ve **Node.js/Express** ile REST API sunucusu (Backend) olarak iki ayrı parça halinde tasarlanmıştır.

## Proje Mimarisi

- **Frontend:** React + Vite, Glassmorphism CSS tasarımı (Mor ve Yeşil neon tema)
- **Backend:** Node.js + Express (in-memory datastore)
- **Dağıtım (Deployment):** Frontend için yönlendirilen AWS S3 Bucket (Statik Web Sitesi Barındırma)

---

## Kurulum ve Çalıştırma (Kendi Bilgisayarında)

### 1. Backend Sunucusunu Ayağa Kaldırmak
Backend klasörüne giderek servisleri kurun ve çalıştırın.
```bash
cd backend
npm install
node server.js
```
*Sunucu, `http://localhost:3001/api/tasks` adresinden hizmet vermeye başlar.*

### 2. Frontend Uygulamasını Ayağa Kaldırmak
Yeni bir terminalde, frontend klasörüne gidin:
```bash
cd frontend
npm install
npm run dev
```
*Uygulama `http://localhost:5173` adresinde çalışmaya başlar.*

---

##AWS S3'e Yükleme (Deployment)

1. Frontend klasörüne gidip üretim versiyonunu (build) oluşturun:
   ```bash
   cd frontend
   npm run build
   ```
2. Bu işlem sonucunda `frontend/dist` adında bir klasör oluşur. 
3. **AWS Console** üzerinden `S3` servisine girin.
4. Yeni bir Bucket oluşturun:
   - "Bucket adını" belirleyin (örneğin: `bulut-bilisim-proje-123`).
   - "Block all public access" seçeneğinin tikini **kaldırın** (Aksi halde web sitesine kimse giremez).
5. Bucket özelliklerinden (Properties) en alta inip **"Static website hosting"** özelliğini aktif hale getirin ve index dokümanı olarak `index.html` yazıp kaydedin.
6. Bucket izinleri (Permissions) kısmına gidip aşağıdaki "Bucket Policy" (Kova İlkesi) kodunu ekleyin (Bucket-Adi kısmını kendi kovanızın adıyla değiştirin):
   ```json
   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Sid": "PublicReadGetObject",
               "Effect": "Allow",
               "Principal": "*",
               "Action": "s3:GetObject",
               "Resource": "arn:aws:s3:::<SENIN-BUCKET-ADIN>/*"
           }
       ]
   }
   ```
7. `dist` klasörü içerisindeki tüm dosyaları (klasörü değil, içindeki html ve css/js dosyalarını) bu S3 Bucket'ının içine sürükleyerek yükleyin (Upload).
8. Artık AWS'nin size verdiği S3 Static Website adresine tıkladığınızda projeniz çalışır durumda olacaktır!

