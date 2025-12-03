# myITS Merchandise - Official Store

Web application untuk toko merchandise resmi Institut Teknologi Sepuluh Nopember (ITS).

## Technology Stack

- **HTML5** - Semantic markup
- **Bootstrap 5.3** - CSS framework via CDN
- **Vanilla JavaScript (ES6+)** - No framework, pure JavaScript
- **CSS3** - Custom styling minimal untuk branding ITS

## Menjalankan Aplikasi

Cukup buka file `index.html` di browser. Tidak perlu build process atau npm install.

```bash
# Atau gunakan live server sederhana
python3 -m http.server 8000
# Lalu buka http://localhost:8000
```

## Struktur Project

```
/
├── index.html          # Main HTML file (SPA)
├── css/
│   └── style.css       # Custom CSS (minimal, melengkapi Bootstrap)
├── js/
│   └── script.js       # Vanilla JavaScript untuk semua logic
└── README.md           # Dokumentasi
```

## Fitur

1. **Hero Section** - Landing page dengan CTA
2. **Katalog Produk** - Tampilan grid produk merchandise
3. **Detail Produk** - Halaman detail produk dengan deskripsi
4. **Keranjang Belanja** - Cart drawer dengan fungsi tambah/hapus item
5. **Checkout** - Proses checkout sederhana
6. **Login Admin** - Form login untuk admin
   - Email: `admin@its.ac.id`
   - Password: `admin`
7. **Dashboard Admin** - Halaman untuk manage produk (view, delete)
8. **Local Storage** - Persist data keranjang dan produk
9. **Toast Notifications** - Notifikasi untuk aksi user
10. **Responsive Design** - Mobile-friendly menggunakan Bootstrap grid system

## Branding

- **Primary Color**: #007BC0 (ITS Blue)
- **Dark Theme**: Background gelap dengan aksen biru ITS
- **Font**: Poppins (Google Fonts)

## Credits

Design original: [ITS Merchandise Web Version - Figma](https://www.figma.com/design/oqHFtHagw5N0X7ikz6jQEh/ITS-Merchandise-Web-Version)
