import React, { useState, useEffect } from 'react';
import { Heart, Star, Timer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Products = () => {
  const navigate = useNavigate();
  // Mock products data with real discount math
  const initialProducts = [
    {
      id: 1,
      title: 'Wireless Bluetooth Headset with ANC',
      image: '🎧',
      rating: 4.3,
      reviews: '12,450',
      price: 1499,
      originalPrice: 3999,
      tag: 'Top Deal',
    },
    {
      id: 2,
      title: 'Smart Fitness Watch AMOLED Display',
      image: '⌚',
      rating: 4.1,
      reviews: '8,120',
      price: 2199,
      originalPrice: 5999,
      tag: 'Trending',
    },
    {
      id: 3,
      title: 'Premium Leather Minimalist Wallet',
      image: '💼',
      rating: 4.5,
      reviews: '2,340',
      price: 499,
      originalPrice: 1299,
      tag: 'Hot Item',
    },
    {
      id: 4,
      title: 'Ergonomic Mechanical Gaming Keyboard',
      image: '⌨️',
      rating: 4.6,
      reviews: '1,105',
      price: 2499,
      originalPrice: 4999,
      tag: 'Best Seller',
    },
    {
      id: 5,
      title: 'Ultra Portable Power Bank 20000mAh',
      image: '🔋',
      rating: 4.2,
      reviews: '24,890',
      price: 1199,
      originalPrice: 2999,
      tag: 'Top Deal',
    },
  ];

  // Simple countdown state for that Flipkart urgency feel
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        clearInterval(interval);
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 pb-12">
      {/* Container holding the white grid container */}
      <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Urgent "Deals of the Day" Header Box */}
        <div className="p-5 flex flex-col justify-between items-start border-b md:border-b-0 md:border-r border-gray-100 min-w-[220px] bg-gradient-to-b from-blue-50/30 to-white">
          <div>
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Deals of the Day</h3>
            
            {/* Countdown Clock */}
            <div className="flex items-center gap-1.5 mt-3 text-gray-500 font-medium text-sm">
              <Timer className="w-4 h-4 text-red-500 animate-pulse" />
              <span className="text-xs uppercase tracking-wider font-semibold text-gray-400">Ends In:</span>
              <span className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-gray-800 font-bold">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              <span>:</span>
              <span className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-gray-800 font-bold">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              <span>:</span>
              <span className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-gray-800 font-bold">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>

          <button onClick={()=>{
            navigate("products")
          }} className="mt-6 md:mt-0 bg-[#2874f0] text-white font-semibold text-xs uppercase tracking-wide px-5 py-2.5 rounded-sm shadow-sm hover:bg-[#1e57b8] transition-colors w-full md:w-auto text-center">
            View All
          </button>
        </div>

        {/* Right Side: Product Horizon Grid */}
        <div className="flex-1 overflow-x-auto scrollbar-hide py-4 px-2 flex gap-4 items-stretch">
          {initialProducts.map((product) => {
            // Calculate exact percentage off dynamically
            const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
            const isWishlisted = wishlist.includes(product.id);

            return (
              <div
                key={product.id}
                className="min-w-[190px] max-w-[210px] bg-white border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-200 rounded p-3 flex flex-col justify-between relative group cursor-pointer"
              >
                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 shadow-sm border border-gray-100 hover:bg-white transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isWishlisted ? 'fill-red-500 stroke-red-500' : 'text-gray-400'
                    }`}
                  />
                </button>

                {/* Tag Overlay */}
                {product.tag && (
                  <span className="absolute top-3 left-3 z-10 bg-emerald-600 text-white font-bold text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm">
                    {product.tag}
                  </span>
                )}

                {/* Product Image Presenter */}
                <div className="h-36 w-full flex items-center justify-center bg-gray-50/50 rounded-sm mb-3 group-hover:scale-105 transition-transform duration-200 select-none text-5xl">
                  {product.image}
                </div>

                {/* Info Bundle */}
                <div className="flex flex-col gap-1">
                  {/* Title */}
                  <h4 className="text-xs font-semibold text-gray-800 line-clamp-1 group-hover:text-[#2874f0] transition-colors">
                    {product.title}
                  </h4>

                  {/* Ratings Star Pill */}
                  <div className="flex items-center gap-1">
                    <div className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      {product.rating}
                      <Star className="w-2.5 h-2.5 fill-white stroke-none" />
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">({product.reviews})</span>
                  </div>

                  {/* Price Cluster */}
                  <div className="flex items-baseline gap-1.5 mt-1 flex-wrap">
                    <span className="text-sm font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                    <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    <span className="text-xs font-bold text-emerald-600 whitespace-nowrap">{discount}% off</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Products;