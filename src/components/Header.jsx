import React, { useState } from 'react';
import { Search, ShoppingCart, ChevronDown, User, ShoppingBag, Heart, LogOut, Percent } from 'lucide-react';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3); // Example cart count

  return (
    <header className="bg-[#2874f0] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo */}
        <div className="flex flex-col items-start justify-center cursor-pointer select-none min-w-[110px]">
          <h1 className="text-xl font-bold italic tracking-wide leading-none">
            FlipZone
          </h1>
          <span className="text-[10px] italic font-medium text-[#ffe500] hover:underline flex items-center mt-0.5">
            Explore <span className="text-white font-bold mx-0.5">Plus</span>
            <Percent className="w-2.5 h-2.5 fill-[#ffe500] stroke-none ml-0.5" />
          </span>
        </div>

        {/* Center: Flipkart-style Search Bar */}
        <div className="flex-1 max-w-xl relative">
          <form className="w-full flex items-center bg-white rounded-sm overflow-hidden shadow-sm">
            <input
              type="text"
              placeholder="Search for products, brands and more"
              className="w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
            />
            <button type="submit" className="pr-4 pl-2 text-[#2874f0] hover:text-[#1e57b8] transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Right: Actions / Navigation */}
        <div className="flex items-center gap-8 font-medium text-sm">
          
          {/* Profile Dropdown Trigger */}
          <div 
            className="relative cursor-pointer py-2 group"
            onMouseEnter={() => setIsProfileOpen(true)}
            onMouseLeave={() => setIsProfileOpen(false)}
          >
            <div className="bg-white text-[#2874f0] px-5 py-1.5 rounded-sm font-semibold text-sm hover:bg-gray-50 transition-colors flex items-center gap-1 shadow-sm">
              Sign In
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-60 bg-white text-gray-800 rounded-sm shadow-xl border border-gray-100 py-1 mt-0">
                {/* Micro-arrow on top */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-t border-l border-gray-100"></div>
                
                <a href="#profile" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                  <User className="w-4 h-4 text-[#2874f0]" />
                  <span>My Profile</span>
                </a>
                <a href="#orders" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                  <ShoppingBag className="w-4 h-4 text-[#2874f0]" />
                  <span>Orders</span>
                </a>
                <a href="#wishlist" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                  <Heart className="w-4 h-4 text-[#2874f0]" />
                  <span>Wishlist</span>
                </a>
                <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left text-red-600">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Become a Seller link */}
          <a href="#seller" className="hidden md:block hover:text-gray-100 whitespace-nowrap">
            Become a Seller
          </a>

          {/* Cart Icon */}
          <a href="#cart" className="flex items-center gap-2 hover:text-gray-100 relative py-2">
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-[#2874f0]">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="font-semibold">Cart</span>
          </a>

        </div>
      </div>
    </header>
  );
};

export default Header;