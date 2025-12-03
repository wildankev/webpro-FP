/**
 * myITS Merchandise - Catalog Page Logic
 * Handles catalog page specific functionality
 */

/**
 * Render all products on catalog page
 */
function renderAllProducts() {
    const container = document.getElementById('allProducts');
    if (!container) return;
    
    const products = Products.getAll();
    container.innerHTML = products.map(createProductCardHTML).join('');
}

/**
 * Initialize catalog page
 */
function initCatalogPage() {
    renderAllProducts();
    console.log('Catalog page initialized');
}

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', initCatalogPage);
