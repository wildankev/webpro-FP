import React, { useState, useEffect } from 'react';
import { Menu, ArrowRight, UserCircle } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetail } from './components/ProductDetail';
import { AdminDashboard } from './components/AdminDashboard';
import { Toast } from './components/Toast';
import { PRODUCTS, Product, CartItem } from './lib/data';
import { formatRupiah } from './lib/utils';

type ViewState = 'home' | 'catalog' | 'detail' | 'login' | 'admin' | 'success';

export default function App() {
  // State
  const [view, setView] = useState<ViewState>('home');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('myits_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toast, setToast] = useState({ msg: '', show: false });
  const [isAdmin, setIsAdmin] = useState(false);

  // Auth State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Persist Cart
  useEffect(() => {
    localStorage.setItem('myits_cart', JSON.stringify(cart));
  }, [cart]);

  // Actions
  const showToast = (msg: string) => {
    setToast({ msg, show: true });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  const addToCart = (id: number) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`${product.name} masuk keranjang!`);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    if (confirm(`Total pembayaran ${formatRupiah(cart.reduce((a,b)=>a+(b.price*b.qty),0))}. Lanjutkan?`)) {
      setCart([]);
      setIsCartOpen(false);
      setView('success');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@its.ac.id' && password === 'admin') {
      setIsAdmin(true);
      setView('admin');
      showToast("Login Admin Berhasil");
    } else {
      alert("Email/Password Salah! (Gunakan: admin@its.ac.id / admin)");
    }
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm("Hapus produk ini?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  // Render Views
  const renderContent = () => {
    switch (view) {
      case 'home':
        return (
          <div className="animate-in fade-in duration-500">
            <Hero onShopNow={() => setView('catalog')} />
            
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xl font-bold border-l-4 border-[#007BC0] pl-3 text-white">
                Produk Terbaru
              </h4>
              <button 
                onClick={() => setView('catalog')} 
                className="text-gray-400 hover:text-white flex items-center gap-2 text-sm font-medium"
              >
                Lihat Semua <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.slice(0, 4).map(p => (
                <ProductCard 
                  key={p.id} 
                  product={p} 
                  onAddToCart={addToCart}
                  onClick={() => { setActiveProduct(p); setView('detail'); }}
                />
              ))}
            </div>
          </div>
        );

      case 'catalog':
        return (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold text-white mb-6">Katalog Lengkap</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(p => (
                <ProductCard 
                  key={p.id} 
                  product={p} 
                  onAddToCart={addToCart}
                  onClick={() => { setActiveProduct(p); setView('detail'); }}
                />
              ))}
            </div>
          </div>
        );

      case 'detail':
        return activeProduct ? (
          <ProductDetail 
            product={activeProduct} 
            onBack={() => setView('catalog')}
            onAddToCart={addToCart}
          />
        ) : null;

      case 'login':
        return (
          <div className="flex justify-center mt-12 animate-in zoom-in-95 duration-300">
            <div className="w-full max-w-md bg-[#1E1E1E] border border-[#333] p-8 rounded-2xl shadow-2xl">
              <div className="text-center mb-8">
                <UserCircle className="w-16 h-16 text-[#007BC0] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white">Login Admin</h3>
              </div>
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="block text-gray-400 text-sm mb-2">Email ITS</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-black border border-[#333] rounded-lg px-4 py-3 text-white focus:border-[#007BC0] focus:outline-none transition-colors"
                    placeholder="admin@its.ac.id"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-400 text-sm mb-2">Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-black border border-[#333] rounded-lg px-4 py-3 text-white focus:border-[#007BC0] focus:outline-none transition-colors"
                    placeholder="admin"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-[#007BC0] hover:bg-[#005A8D] text-white font-bold py-3 rounded-lg transition-colors">
                  Masuk Dashboard
                </button>
              </form>
            </div>
          </div>
        );

      case 'admin':
        return (
          <AdminDashboard 
            products={products} 
            onDelete={handleDeleteProduct}
            onLogout={() => { setIsAdmin(false); setView('home'); }}
          />
        );

      case 'success':
        return (
          <div className="text-center mt-20 animate-in zoom-in-95 duration-500">
            <div className="mb-6 inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500/20 text-green-500">
              <CheckCircle className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Pesanan Berhasil!</h2>
            <p className="text-gray-400 mb-8">Terima kasih telah berbelanja di myITS Merchandise.</p>
            <button 
              onClick={() => setView('home')}
              className="bg-[#007BC0] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#005A8D] transition-colors"
            >
              Kembali ke Beranda
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white font-['Poppins']">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-4 bg-[#1E1E1E] border-b border-[#333] sticky top-0 z-[1030]">
        <div className="font-bold text-lg"><span className="text-[#007BC0]">my</span>ITS Merch</div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <Sidebar 
        activeView={view === 'admin' ? 'login' : view}
        onNavigate={(v) => {
          if (v === 'login' && isAdmin) setView('admin');
          else setView(v as ViewState);
          setIsSidebarOpen(false);
        }}
        cartCount={cart.reduce((a,b) => a + b.qty, 0)}
        onToggleCart={() => setIsCartOpen(true)}
        isOpen={isSidebarOpen}
      />

      <main className="main-content min-h-screen">
        {renderContent()}
      </main>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />

      <Toast 
        message={toast.msg} 
        isVisible={toast.show} 
        onClose={() => setToast(prev => ({ ...prev, show: false }))}
      />
    </div>
  );
}
