import React, { useState } from 'react';
import { Star, SlidersHorizontal, Grid, List, Heart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getProducts } from "../services/productService";

const AllProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract real-time URL search queries (e.g., /products?search=headset)
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  // Fetch real inventory data from your central service
  const catalogProducts = getProducts() || [];

  // Layout & Filtering State Engines
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceMax, setPriceMax] = useState(6000);
  const [minRating, setMinRating] = useState(0);
  const [wishlist, setWishlist] = useState([]);

  // Extract unique categories dynamically from your dataset for the sidebar
  const categories = ['All', ...new Set(catalogProducts.map(p => p.category).filter(Boolean))];

  // Routing navigation click handler matching your structure
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Processing: Advanced Filter, Match Query & Sort Pipeline Execution
  const filteredProducts = catalogProducts
    .filter(p => {
      if (!searchQuery.trim()) return true;
      const term = searchQuery.toLowerCase().trim();
      // Searches across titles, categories, and brand tags for high-accuracy matches
      return (
        p.title?.toLowerCase().includes(term) ||
        p.category?.toLowerCase().includes(term) ||
        p.brand?.toLowerCase().includes(term)
      );
    })
    .filter(p => selectedCategory === 'All' ? true : p.category === selectedCategory)
    .filter(p => p.price <= priceMax)
    .filter(p => p.rating >= minRating)
    .sort((a, b) => {
      if (sortBy === 'lowToHigh') return a.price - b.price;
      if (sortBy === 'highToLow') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.id - a.id;
    });

  return (
    <div className="bg-gray-100 min-h-screen py-3">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 flex flex-col md:flex-row gap-3 items-start">

        {/* ================= LEFT SIDEBAR: ADVANCED FILTERS ================= */}
        <aside className="w-full md:w-60 bg-white rounded-sm shadow-sm border border-gray-200/60 flex-shrink-0">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-sm tracking-wide flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-gray-500" /> Filters
            </h3>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setPriceMax(6000);
                setMinRating(0);
                // Clears out the search parameters to return back to pristine state
                if (searchQuery) navigate('/products');
              }}
              className="text-[#2874f0] text-xs font-semibold uppercase tracking-wider hover:underline"
            >
              Clear All
            </button>
          </div>

          {/* Category Filter Group */}
          <div className="p-4 border-b border-gray-100">
            <h4 className="text-gray-900 font-bold text-xs uppercase tracking-wider mb-2">Category</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-700">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                    className="w-3.5 h-3.5 accent-[#2874f0]"
                  />
                  <span className={selectedCategory === cat ? 'text-[#2874f0] font-semibold' : ''}>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Slider Group */}
          <div className="p-4 border-b border-gray-100">
            <h4 className="text-gray-900 font-bold text-xs uppercase tracking-wider mb-2">Price Range</h4>
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2874f0]"
            />
            <div className="flex justify-between items-center mt-2 text-xs text-gray-500 font-semibold font-mono">
              <span>Min: ₹100</span>
              <span className="bg-gray-50 border border-gray-200 px-2 py-0.5 rounded text-gray-800">Max: ₹{priceMax}</span>
            </div>
          </div>

          {/* Customer Rating Filter Group */}
          <div className="p-4">
            <h4 className="text-gray-900 font-bold text-xs uppercase tracking-wider mb-2">Customer Rating</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-700">
              {[4, 3, 2].map((num) => (
                <label key={num} className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === num}
                    onChange={() => setMinRating(num)}
                    className="w-3.5 h-3.5 accent-[#2874f0]"
                  />
                  <span className="flex items-center gap-1">
                    {num} <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" /> & Above
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* ================= RIGHT MAIN CATALOG PANEL ================= */}
        <main className="flex-1 w-full bg-white rounded-sm shadow-sm border border-gray-200/60 overflow-hidden">

          {/* Top Control Bar: Sort Options & Layout Anchors */}
          <div className="border-b border-gray-100 px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-4 text-gray-500 font-medium">
              <div className="flex flex-col gap-0.5">
                <span className="text-gray-900 font-bold text-sm">Showing {filteredProducts.length} Results</span>
                {searchQuery && (
                  <span className="text-[11px] text-gray-400">
                    Filtered by: <strong className="text-gray-600 font-semibold">"{searchQuery}"</strong>
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-gray-300">|</span>
              <span className="font-bold uppercase tracking-wider text-gray-400 text-[10px]">Sort By:</span>
              {[
                { label: 'Popularity', value: 'popularity' },
                { label: 'Price -- Low to High', value: 'lowToHigh' },
                { label: 'Price -- High to Low', value: 'highToLow' },
                { label: 'Customer Rating', value: 'rating' }
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSortBy(opt.value)}
                  className={`pb-0.5 transition-colors ${sortBy === opt.value ? 'text-[#2874f0] font-bold border-b-2 border-[#2874f0]' : 'hover:text-gray-800'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* View Mode Switching Handles */}
            <div className="hidden sm:flex items-center gap-1.5 border border-gray-200 rounded-sm p-0.5 self-end sm:self-auto">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1 rounded-sm ${viewMode === 'grid' ? 'bg-gray-100 text-[#2874f0]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1 rounded-sm ${viewMode === 'list' ? 'bg-gray-100 text-[#2874f0]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Empty Search Fallback */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 px-4">
              <span className="text-5xl">🔍</span>
              <h4 className="text-base font-bold text-gray-700 mt-3">No match found!</h4>
              <p className="text-xs text-gray-400 mt-1">
                We couldn't find anything matching "{searchQuery}". Try updating your targets.
              </p>
              <button
                onClick={() => navigate('/products')}
                className="mt-4 px-4 py-2 bg-[#2874f0] text-white text-xs font-bold rounded-sm shadow-sm"
              >
                Reset Search Query
              </button>
            </div>
          )}

          {/* Product Cards Grid Layout Renderer */}
          <div className={viewMode === 'grid'
            ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 border-l border-t border-gray-100'
            : 'flex flex-col'
          }>
            {filteredProducts.map((product) => {
              const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
              const isWishlisted = wishlist.includes(product.id);

              return (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className={`bg-white border-b border-r border-gray-100 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] transition-shadow duration-200 relative group cursor-pointer ${viewMode === 'grid' ? 'p-4 flex flex-col justify-between' : 'p-5 flex gap-6 items-center'
                    }`}
                >
                  {/* Wishlist Pin */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/90 border border-gray-100 shadow-sm hover:bg-white transition-colors"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 stroke-red-500' : 'text-gray-400'}`} />
                  </button>

                  {/* Image Holder */}
                  {/* <div className={`flex-shrink-0 bg-gray-50/50 rounded-sm flex items-center justify-center select-none text-4xl group-hover:scale-105 transition-transform duration-200 ${
                    viewMode === 'grid' ? 'h-36 w-full mb-3' : 'h-32 w-32'
                  }`}>
                    {product.image}
                  </div> */}
                  <div className={`flex-shrink-0 bg-gray-50/50 rounded-sm flex items-center justify-center select-none group-hover:scale-105 transition-transform duration-200 ${viewMode === 'grid' ? 'h-36 w-full mb-3' : 'h-32 w-32'
                    }`}>
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Information Details Cluster */}
                  <div className="flex-1 flex flex-col gap-1 w-full">
                    <h4 className="text-xs font-semibold text-gray-800 line-clamp-2 group-hover:text-[#2874f0] transition-colors leading-relaxed">
                      {product.title}
                    </h4>

                    {product.brand && (
                      <span className="text-[10px] text-gray-400 font-bold tracking-wider uppercase mt-0.5">{product.brand}</span>
                    )}

                    {/* Star Rating Badge */}
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        {product.rating} <Star className="w-2.5 h-2.5 fill-white stroke-none" />
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold">({product.reviews || 0})</span>
                    </div>

                    {/* Pricing Row */}
                    <div className="flex items-baseline gap-2 mt-2 flex-wrap">
                      <span className="text-sm font-black text-gray-900">₹{product.price.toLocaleString()}</span>
                      <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                      <span className="text-xs font-bold text-emerald-600">{discount}% off</span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </main>

      </div>
    </div>
  );
};

export default AllProducts;