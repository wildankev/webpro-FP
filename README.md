# myITS Merchandise - Official Store

Web application untuk toko merchandise resmi Institut Teknologi Sepuluh Nopember (ITS).

## Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **Bootstrap 5.3** - CSS framework via CDN
- **Vanilla JavaScript (ES6+)** - No framework, pure JavaScript
- **CSS3** - Custom styling minimal untuk branding ITS

### Backend
- **PHP 8.x** - Native PHP backend
- **JSON File Storage** - Simple file-based data storage (can be extended to MySQL)
- **RESTful API** - Clean API architecture for server-side operations

## Menjalankan Aplikasi

### Frontend Only (Static)
Cukup buka file `index.html` di browser. Tidak perlu build process atau npm install.

```bash
# Atau gunakan live server sederhana
python3 -m http.server 8000
# Lalu buka http://localhost:8000
```

### Dengan Backend (PHP)
```bash
# Menggunakan PHP built-in server
cd /path/to/project
php -S localhost:8080

# Akses frontend di http://localhost:8080
# Akses API di http://localhost:8080/backend/api/
```

## Struktur Project

```
/
├── index.html              # Homepage
├── catalog.html            # Product catalog page
├── product-detail.html     # Product detail page
├── login.html              # Admin login page
├── admin-dashboard.html    # Admin dashboard page
├── checkout-success.html   # Checkout success page
├── css/
│   └── style.css           # Custom CSS styling
├── js/
│   ├── data.js             # Data management (Products, Cart, Auth)
│   ├── shared.js           # Shared utilities and cart drawer
│   ├── home.js             # Home page logic
│   ├── catalog.js          # Catalog page logic
│   ├── product-detail.js   # Product detail page logic
│   ├── admin.js            # Admin page logic
│   └── script.js           # Legacy SPA script (for reference)
├── backend/
│   ├── api/
│   │   ├── index.php       # Main API router
│   │   ├── products.php    # Products API endpoints
│   │   ├── cart.php        # Cart API endpoints
│   │   └── auth.php        # Authentication API endpoints
│   ├── config/
│   │   ├── config.php      # Application configuration
│   │   └── database.php    # Database configuration
│   ├── includes/
│   │   └── helpers.php     # Helper functions
│   ├── database/
│   │   └── schema.sql      # MySQL schema (for future use)
│   └── data/
│       └── products.json   # Product data storage
├── .gitignore              # Git ignore rules
└── README.md               # Documentation
```

## Backend API Documentation

### Base URL
```
http://localhost:8080/backend/api/
```

### API Status
```
GET /backend/api/
```
Returns API status and version information.

### Products API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/backend/api/products` | Get all products |
| GET | `/backend/api/products?limit=4` | Get limited products |
| GET | `/backend/api/products?category=Apparel` | Filter by category |
| GET | `/backend/api/products/{id}` | Get single product |
| POST | `/backend/api/products` | Create new product |
| PUT | `/backend/api/products/{id}` | Update product |
| DELETE | `/backend/api/products/{id}` | Delete product |

### Cart API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/backend/api/cart?session={sessionId}` | Get cart contents |
| POST | `/backend/api/cart/add` | Add item to cart |
| POST | `/backend/api/cart/update` | Update item quantity |
| POST | `/backend/api/cart/remove` | Remove item from cart |
| POST | `/backend/api/cart/clear` | Clear entire cart |

### Authentication API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/backend/api/auth/login` | Admin login |
| POST | `/backend/api/auth/logout` | Admin logout |
| GET | `/backend/api/auth/check` | Check auth status |

### Example API Requests

**Get all products:**
```bash
curl http://localhost:8080/backend/api/products
```

**Add item to cart:**
```bash
curl -X POST http://localhost:8080/backend/api/cart/add \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 2}'
```

**Admin login:**
```bash
curl -X POST http://localhost:8080/backend/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@its.ac.id", "password": "admin"}'
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
