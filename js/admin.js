/**
 * myITS Merchandise - Admin Page Logic
 * Handles login and admin dashboard functionality
 */

// ============================================
// Login Functions
// ============================================

/**
 * Handle admin login form submission
 * @param {Event} e - Form submit event
 */
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (Auth.login(email, password)) {
        showToast('Login Admin Berhasil');
        window.location.href = 'admin-dashboard.html';
    } else {
        alert('Email/Password Salah! (Gunakan: admin@its.ac.id / admin)');
    }
}

/**
 * Initialize login page
 */
function initLoginPage() {
    // Check if already logged in
    if (Auth.isLoggedIn()) {
        window.location.href = 'admin-dashboard.html';
        return;
    }
    
    // Setup login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    console.log('Login page initialized');
}

// ============================================
// Admin Dashboard Functions
// ============================================

/**
 * Handle admin logout
 */
function handleLogout() {
    Auth.logout();
    showToast('Berhasil logout');
    window.location.href = 'index.html';
}

/**
 * Render products table in admin dashboard
 */
function renderAdminProducts() {
    const container = document.getElementById('adminProductList');
    if (!container) return;
    
    const products = Products.getAll();
    
    container.innerHTML = products.map(product => `
        <tr>
            <td class="px-4 py-3">#${product.id}</td>
            <td class="px-4 py-3">
                <div class="d-flex align-items-center gap-3">
                    <img src="${product.image}" alt="${product.name}" 
                         class="rounded" style="width: 40px; height: 40px; object-fit: cover;">
                    <span class="fw-medium text-white">${product.name}</span>
                </div>
            </td>
            <td class="px-4 py-3">${formatRupiah(product.price)}</td>
            <td class="px-4 py-3">${product.stock}</td>
            <td class="px-4 py-3">
                <button class="btn btn-outline-danger btn-sm" onclick="deleteProduct(${product.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

/**
 * Delete a product (admin function)
 * @param {number} productId - Product ID to delete
 */
function deleteProduct(productId) {
    if (confirm('Hapus produk ini?')) {
        Products.delete(productId);
        renderAdminProducts();
        showToast('Produk berhasil dihapus');
    }
}

/**
 * Check admin authentication and redirect if not logged in
 */
function checkAdminAuth() {
    if (!Auth.isLoggedIn()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

/**
 * Initialize admin dashboard page
 */
function initAdminDashboard() {
    // Check authentication
    if (!checkAdminAuth()) return;
    
    // Render products
    renderAdminProducts();
    
    console.log('Admin dashboard initialized');
}

// Determine which page we're on and initialize accordingly
document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    
    if (path.includes('login.html')) {
        initLoginPage();
    } else if (path.includes('admin-dashboard.html')) {
        initAdminDashboard();
    }
});
