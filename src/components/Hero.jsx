import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample data for the top category quick-links
  const categories = [
    { name: 'Grocery', icon: '🛒' },
    { name: 'Mobiles', icon: '📱' },
    { name: 'Fashion', icon: '👕' },
    { name: 'Electronics', icon: '💻' },
    { name: 'Home & Furniture', icon: '🛋️' },
    { name: 'Appliances', icon: '📺' },
    { name: 'Travel', icon: '✈️' },
    { name: 'Beauty, Toys & More', icon: '🧸' },
  ];

  // Flipkart-style promo banners (Using high-quality placeholder gradients/images)
  const banners = [
    {
      id: 1,
      bg: 'from-blue-600 to-indigo-800',
      title: 'Big Upgrade Sale',
      subtitle: 'Latest Smartphones & Electronics',
      offer: 'Up to 40% OFF',
      tag: 'Incl. Exchange Offers',
    },
    {
      id: 2,
      bg: 'from-amber-500 to-orange-600',
      title: 'Home Makeover Days',
      subtitle: 'Furniture, Mattresses & Decor',
      offer: '70%+ Festive Deals',
      tag: 'No Cost EMI Available',
    },
    {
      id: 3,
      bg: 'from-teal-600 to-emerald-800',
      title: 'Fashion Grand Finale',
      subtitle: 'T-Shirts, Sneakers, Watches & More',
      offer: 'Buy 2 Get 1 FREE',
      tag: 'Top Brands Featured',
    },
  ];

  // Auto-play carousel effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-gray-100 min-h-fit pb-4">
      
      {/* 1. Flipkart-style Category Quick Bar */}
      <div className="bg-white shadow-sm mb-3 overflow-x-auto scrollbar-hide">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center min-w-[800px]">
          {categories.map((cat, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center justify-center cursor-pointer group px-2"
            >
              <span className="text-2xl mb-1 group-hover:scale-110 transition-transform duration-200">
                {cat.icon}
              </span>
              <span className="text-xs font-semibold text-gray-700 group-hover:text-[#2874f0] transition-colors">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Main Hero Banner Carousel */}
      <div className="max-w-6xl mx-auto px-2 sm:px-4 relative group">
        <div className="relative h-[220px] md:h-[280px] w-full rounded-sm overflow-hidden shadow-sm bg-gray-200">
          
          {/* Slides Wrapper */}
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 w-full h-full bg-gradient-to-r ${banner.bg} text-white flex items-center px-8 md:px-16 transition-opacity duration-500 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* Slide Content */}
              <div className="max-w-lg select-none">
                <span className="bg-white/20 text-xs px-2.5 py-1 rounded-full uppercase tracking-wider font-bold backdrop-blur-sm">
                  {banner.tag}
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mt-3">
                  {banner.title}
                </h2>
                <p className="text-sm md:text-lg text-gray-100 font-medium mt-1">
                  {banner.subtitle}
                </p>
                <div className="text-xl md:text-3xl font-black text-[#ffe500] mt-2 drop-shadow-sm">
                  {banner.offer}
                </div>
                <button className="mt-4 bg-white text-gray-900 text-xs md:text-sm font-bold px-5 py-2 rounded-sm shadow hover:bg-gray-50 transition-colors">
                  Shop Now
                </button>
              </div>

              {/* Decorative Right-side Graphic Element */}
              <div className="hidden md:block absolute right-20 bottom-0 top-0 w-1/3 bg-white/10 skew-x-12 backdrop-blur-3xl transform origin-top-right border-l border-white/20" />
            </div>
          ))}

          {/* Slider Controls (Hidden on mobile, appears on hover for desktop) */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-50 text-gray-800 p-3 h-24 rounded-r-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center focus:outline-none"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-50 text-gray-800 p-3 h-24 rounded-l-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center focus:outline-none"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Indicators / Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white w-4' : 'bg-white/50'
                }`}
              />
            ))}
          </div>

        </div>
      </div>

    </div>
  );
};

export default Hero;