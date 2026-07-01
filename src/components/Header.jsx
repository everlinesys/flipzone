import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, ChevronDown, User, ShoppingBag, Heart, LogOut, Zap } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Header = ({ cartCount = 0 }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [shouldPulse, setShouldPulse] = useState(false);
  const navigate = useNavigate();

  // Trigger a visual pop animation every single time the cart quantity updates
  useEffect(() => {
    if (cartCount > 0) {
      setShouldPulse(true);
      const timer = setTimeout(() => setShouldPulse(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <header className="bg-[#2874f0] text-white sticky top-0 z-50 shadow-md font-sans">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        
        {/* ================= LEFT: BRAND IDENTITY ================= */}
        <Link 
          to="/" 
          className="flex flex-col items-start justify-center cursor-pointer select-none min-w-[110px] group"
        >
          <h1 className="text-2xl font-black italic tracking-tighter leading-none group-hover:scale-105 transition-transform duration-200">
            Dopcart
          </h1>
          <span className="text-[10px] italic font-black text-[#ffe500] flex items-center mt-0.5 tracking-wide">
            Explore <span className="text-white mx-0.5 underline">Infinite Plus</span>
            <Zap className="w-2.5 h-2.5 fill-[#ffe500] stroke-none ml-0.5 animate-pulse" />
          </span>
        </Link>

        {/* ================= CENTER: FUNCTIONAL SEARCH BAR ================= */}
        <div className="flex-1 max-w-xl relative">
          <form 
            onSubmit={handleSearchSubmit} 
            className="w-full flex items-center bg-white rounded-sm overflow-hidden shadow-inner focus-within:ring-2 focus-within:ring-amber-400 transition-all"
          >
            <input
              type="text"
              placeholder="Search mock items (e.g., Headset, Shoes, Luxury)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none font-medium"
            />
            <button 
              type="submit" 
              className="pr-4 pl-2 text-[#2874f0] hover:text-[#1e57b8] active:scale-95 transition-transform"
            >
              <Search className="w-5 h-5 stroke-[2.5]" />
            </button>
          </form>
        </div>

        {/* ================= RIGHT: INTERACTIVE VALUE ACTIONS ================= */}
        <div className="flex items-center gap-6 md:gap-8 font-semibold text-sm">
          
          {/* VIP PROFILE DROPDOWN */}
          <div 
            className="relative cursor-pointer py-2"
            onMouseEnter={() => setIsProfileOpen(true)}
            onMouseLeave={() => setIsProfileOpen(false)}
          >
            <div className="bg-white text-[#2874f0] px-4 py-1.5 rounded-sm text-xs md:text-sm font-bold hover:bg-gray-50 transition-colors flex items-center gap-1 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mr-1"></span>
              John Doe (PRO)
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Dropdown Nodes */}
            {isProfileOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white text-gray-800 rounded-sm shadow-2xl border border-gray-100 py-1 mt-0 animate-scale-up z-50">
                {/* Arrow Decorator */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-t border-l border-gray-100"></div>
                
                <Link to="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50/50 border-b border-gray-50 text-xs font-bold text-gray-700 transition-colors">
                  <User className="w-4 h-4 text-[#2874f0]" />
                  <span>Dopamine Wallet</span>
                </Link>
                
                <Link to="/orders" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50/50 border-b border-gray-50 text-xs font-bold text-gray-700 transition-colors">
                  <ShoppingBag className="w-4 h-4 text-[#2874f0]" />
                  <span>Simulated Orders</span>
                </Link>
                
                <Link to="/wishlist" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50/50 border-b border-gray-50 text-xs font-bold text-gray-700 transition-colors">
                  <Heart className="w-4 h-4 text-red-500 fill-red-500/10" />
                  <span>Heart Collection</span>
                </Link>
                
                <button 
                  onClick={() => alert("Simulated account logging loop reset!")} 
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-left text-xs font-bold text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Reset Sandbox</span>
                </button>
              </div>
            )}
          </div>

          {/* Infinite Credit Tagline */}
          <span className="hidden lg:flex items-center gap-1 text-xs text-amber-300 font-black tracking-wider bg-white/10 px-2 py-1 rounded-sm select-none border border-amber-400/30">
            BAL: ∞ CREDIT
          </span>

          {/* STICKY CART METRICS ANCHOR */}
          <Link 
            to="/cart" 
            className="flex items-center gap-2 text-white hover:text-amber-300 transition-colors relative py-2 group"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 group-hover:animate-bounce transition-transform" />
              
              {/* CART NUMBER COUNTER BADGE */}
              {cartCount > 0 && (
                <span className={`absolute -top-2 -right-2.5 bg-red-500 text-white text-[10px] font-black rounded-full min-w-4 h-4 px-1 flex items-center justify-center border border-[#2874f0] shadow-md transition-all duration-300 ${shouldPulse ? 'scale-125 bg-amber-400' : 'scale-100'}`}>
                  {cartCount}
                </span>
              )}
            </div>
            <span className="font-bold hidden sm:inline">Cart</span>
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Header;