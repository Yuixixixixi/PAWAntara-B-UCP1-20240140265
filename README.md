Toko Sembako Ariesta — PAW Antara Kelas B (UCP1)

Nama : T.Rayendra
NIM : 20240140265
Kelas : B

- Deskripsi Project :
Website Toko Sembako Ariesta milik Ibu Aries. Pelanggan dapat melihat daftar produk sembako beserta harga & stok, mencari/memfilter produk, membuka halaman detail produk, dan bertanya lewat halaman Tanya AI (balasan diproses di server berdasarkan data produk terbaru). Admin bisa login dan mengelola produk (tambah, ubah, hapus) melalui dashboard.
Dibangun dengan Node.js + Express 5, view engine EJS (dengan partials), session login memakai express-session, konfigurasi lewat dotenv, dan styling CSS custom + JavaScript vanilla (Fetch API).

Sprint 1: HTML semantik, layout responsif (hamburger menu), server Express, routing dinamis, filter query string, static files, custom middleware logger.
Sprint 2: login/logout berbasis session, REST API CRUD produk yang terproteksi, validasi input, endpoint POST /api/chat, dashboard admin dengan Fetch API tanpa reload.

- Cara Menjalankan Secara Lokal
1. git clone https://github.com/Yuixixixixi/PAWAntara-B-UCP1-20240140265.git
2. cd PAWAntara-B-UCP1-20240140265
3. npm install
4. Buat file .env di root project:
5. Jalankan server:
npm run dev    # dengan nodemon (auto reload)
# atau
npm start
6. Buka http://localhost:3000.

- Daftar Route Halaman
Method	Endpoint	Akses	Deskripsi
1. GET	/	Publik	Beranda: hero + 4 produk unggulan
<img width="1340" height="696" alt="image" src="https://github.com/user-attachments/assets/392da518-6a64-4d9d-8027-68ffb049d350" />

2. GET	/produk	Publik	Daftar semua produk (card grid)
<img width="1341" height="690" alt="image" src="https://github.com/user-attachments/assets/a17188a0-e5b3-4529-a6e2-9fedea3cffd2" />

3. GET	/produk/4	Publik	Filter id (server-side)
<img width="1354" height="694" alt="image" src="https://github.com/user-attachments/assets/97b943d0-ec6b-4d15-88ec-aec90a5b5fcb" />

4. GET	/produk?search=beras	Publik	Pencarian nama produk (server-side)
<img width="1339" height="691" alt="image" src="https://github.com/user-attachments/assets/8633c468-d69b-447a-9f3e-7a7d9785511c" />

5. GET	/produk/:id	Publik	Detail produk; ID tidak valid → halaman "Produk tidak ditemukan" 
<img width="1360" height="707" alt="image" src="https://github.com/user-attachments/assets/6d17bbd9-d3de-483b-9653-ba5ad5be50ca" />

6. GET	/tanya-ai	Publik	Tampilan chat + form Tanya AI
<img width="1342" height="690" alt="image" src="https://github.com/user-attachments/assets/a9bffcc8-6714-40ef-9ce8-c621876e70b1" />

7. GET	/login	Publik	Form login (redirect ke /admin jika sudah login)
<img width="1359" height="697" alt="image" src="https://github.com/user-attachments/assets/7bfd6036-745f-49e9-add7-1a69a6dc6179" />

8. POST	/login	Publik	Proses login; gagal → render ulang dengan pesan error
<img width="1360" height="695" alt="image" src="https://github.com/user-attachments/assets/c8e7e249-9771-4765-ab5b-d4601f5be525" />

- Penjelasan Tampilan (UI)
1. Navbar (partial): logo + menu Beranda / Produk / Tanya AI; menu Dashboard dan tombol Logout muncul hanya saat admin login. Di layar kecil berubah jadi hamburger menu (vanilla JS classList.toggle + aria-expanded).
2. Beranda: hero, ringkasan jumlah produk, dan grid produk unggulan.
3. Halaman Produk: form filter (search + kategori) diproses server-side, jumlah hasil ditampilkan, hasil kosong → pesan ramah.
4. Detail Produk: gambar, harga, satuan, deskripsi, dan status stok.
5. Tanya AI: bubble chat pelanggan vs AI, indikator mengetik, form aksesibel.
6. Dashboard Admin: kartu ringkasan (total produk, total stok, nilai stok) + tabel produk responsif dengan aksi Edit & Hapus via Fetch API (tanpa reload).
7. Semantik & responsif: header, nav, main, section, article, aside, footer; Flexbox + CSS Grid dengan media query untuk mobile & desktop.
8. Custom middleware logger: mencatat setiap request [waktu] METHOD /url.
