/**
 * myITS Merchandise - Product Detail Page Logic
 * Handles product detail page with URL parameter support
 */

/**
 * Get product ID from URL query parameter
 * @returns {number|null} Product ID as integer or null
 */
function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id === null) return null;
    
    // Validate and parse as integer
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId) || parsedId < 0) {
        return null;
    }
    return parsedId;
}

/**
 * Escape HTML entities in text content
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Render product detail content
 * @param {Object} product - Product object to display
 */
function renderProductDetail(product) {
    const container = document.getElementById('productDetailContent');
    if (!container) return;

    // Validate and sanitize product data
    const productId = parseInt(product.id, 10);
    const safeName = escapeHtml(product.name);
    const safeCategory = escapeHtml(product.category);
    const safeDesc = escapeHtml(product.desc);
    const safeImage = escapeHtml(product.image);
    const safeStock = parseInt(product.stock, 10);

    // Update page title
    document.title = `${safeName} - myITS Merchandise`;

    container.innerHTML = `
        <div class="row g-4">
            <div class="col-md-6">
                <div class="bg-dark-card p-3 rounded-4 border border-secondary">
                    <img src="${safeImage}" alt="${safeName}" class="product-detail-img">
                </div>
            </div>
            <div class="col-md-6">
                <div class="text-its-blue fw-bold text-uppercase small mb-2 letter-spacing-1">
                    ${safeCategory}
                </div>
                <h1 class="display-6 fw-bold text-white mb-3">
                    ${safeName}
                </h1>
                <div class="text-its-cyan fs-3 fw-bold mb-4">
                    ${formatRupiah(product.price)}
                </div>
                <p class="text-secondary fs-5 mb-4" style="line-height: 1.7;">
                    ${safeDesc}
                </p>
                <div class="product-detail-info-box mb-4">
                    <div class="d-flex justify-content-between mb-2">
                        <span class="text-muted">Stok Tersedia</span>
                        <span class="fw-bold text-white">${safeStock} pcs</span>
                    </div>
                    <div class="d-flex justify-content-between">
                        <span class="text-muted">Pengiriman</span>
                        <span class="fw-bold text-white">Surabaya</span>
                    </div>
                </div>
                <button class="btn btn-its-blue btn-lg w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                        onclick="addToCart(${productId})">
                    <i class="bi bi-cart-plus fs-5"></i>
                    Tambah ke Keranjang
                </button>
            </div>
        </div>
    `;
}

/**
 * Show error message when product not found
 */
function showProductNotFound() {
    const container = document.getElementById('productDetailContent');
    if (!container) return;

    document.title = 'Produk Tidak Ditemukan - myITS Merchandise';

    container.innerHTML = `
        <div class="text-center py-5">
            <i class="bi bi-exclamation-circle text-warning display-1 mb-4"></i>
            <h2 class="text-white mb-3">Produk Tidak Ditemukan</h2>
            <p class="text-muted mb-4">Maaf, produk yang Anda cari tidak tersedia.</p>
            <a href="catalog.html" class="btn btn-its-blue btn-lg">
                <i class="bi bi-arrow-left me-2"></i>Kembali ke Katalog
            </a>
        </div>
    `;
}

/**
 * Initialize product detail page
 */
function initProductDetailPage() {
    const productId = getProductIdFromURL();
    
    if (!productId) {
        showProductNotFound();
        return;
    }

    const product = Products.getById(productId);
    
    if (!product) {
        showProductNotFound();
        return;
    }

    renderProductDetail(product);
    console.log('Product detail page initialized for product:', product.name);
}

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', initProductDetailPage);
