import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Tag, ShieldCheck, MapPin, Truck, RefreshCw, Lightbulb, CheckCircle2, Sparkles, X, Package } from 'lucide-react';
import { getProductById } from "../services/productService";
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const [selectedImage, setSelectedImage] = useState(0);
  if (!product) {
    return (
      <div className="max-w-6xl mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold">Product Not Found</h1>
      </div>
    );
  }

  // --- Operational & Dopamine States ---
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null);

  const [cartCount, setCartCount] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [generatedOrderNo, setGeneratedOrderNo] = useState('');

  const original = product.originalPrice || 0;
  const current = product.price || 0;
  const discount = original > 0 ? Math.round(((original - current) / original) * 100) : 0;

  // Trigger quick temporary notifications
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    triggerToast(`🛒 Added ${product.title.slice(0, 30)}... to cart successfully!`);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate high-speed instant banking validation
    setTimeout(() => {
      setIsProcessing(false);
      setGeneratedOrderNo(`FZ-${Math.floor(100000 + Math.random() * 900000)}`);
      setShowOrderSuccess(true);
    }, 1200);
  };

  const checkDelivery = (e) => {
    e.preventDefault();
    if (pincode.trim().length === 6) {
      setDeliveryStatus({ available: true, message: '🎉 Super Fast Delivery by tomorrow, 11:00 AM | Free' });
    } else {
      setDeliveryStatus({ available: false, message: 'Please enter a valid 6-digit pin code.' });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-5 relative font-sans selection:bg-blue-500 selection:text-white">

      {/* ================= DOPAMINE ALERT TOAST SYSTEM ================= */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-gray-900 text-white text-xs sm:text-sm font-semibold px-5 py-3.5 rounded-sm shadow-2xl border border-gray-800 flex items-center gap-2.5 animate-slide-up">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================= EXPERIENTIAL ORDER CONFIRMATION MODAL ================= */}
      {showOrderSuccess && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-sm shadow-2xl max-w-md w-full p-6 relative border-t-4 border-emerald-600 text-center animate-scale-up">
            <button
              onClick={() => setShowOrderSuccess(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <h2 className="text-xl font-black text-gray-950 tracking-tight">Order Placed Successfully!</h2>
            <p className="text-xs text-gray-400 font-mono mt-1">Receipt ID: {generatedOrderNo}</p>

            <div className="my-5 p-4 bg-gray-50 rounded-sm border border-gray-100 flex items-center gap-4 text-left">
              <span className="text-4xl select-none">{product.image}</span>
              <div>
                <h4 className="text-xs font-bold text-gray-900 line-clamp-1">{product.title}</h4>
                <p className="text-xs text-emerald-600 font-bold mt-0.5">Estimated Arrival: Tomorrow Morning</p>
              </div>
            </div>

            <p className="text-xs text-gray-500 font-medium px-2 leading-relaxed">
              Your instant simulator processed this order automatically. Get ready to experience that package unboxing high!
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowOrderSuccess(false)}
                className="border border-gray-200 text-gray-700 font-bold text-xs uppercase tracking-wider py-3 rounded-sm hover:bg-gray-50 transition-colors"
              >
                Keep Browsing
              </button>
              <button
                onClick={() => { setShowOrderSuccess(false); navigate('/'); }}
                className="bg-[#2874f0] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-sm hover:bg-[#1e57b8] transition-colors shadow-sm"
              >
                Go To Fleet Home
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MAIN INTERFACE MATRIX ================= */}
      <div className="max-w-6xl mx-auto px-2 sm:px-4 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

        {/* LEFT COLUMN: VISUAL ENGINE */}
        <div className="md:col-span-5 flex flex-col gap-4 md:sticky md:top-20">

          {/* ================= PRODUCT GALLERY ================= */}

          <div className="md:col-span-5 md:sticky md:top-20">

            <div className="flex gap-4">

              {/* ---------- THUMBNAILS ---------- */}

              <div className="flex flex-col gap-3">

                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 bg-white border rounded-lg overflow-hidden transition-all duration-200 ${selectedImage === index
                        ? "border-[#2874f0] ring-2 ring-[#2874f0]/20"
                        : "border-gray-200 hover:border-[#2874f0]"
                      }`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-contain p-2"
                    />
                  </button>
                ))}

              </div>

              {/* ---------- MAIN IMAGE ---------- */}

              <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">

                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded">
                    {product.badge}
                  </span>
                </div>

                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="absolute top-4 right-4 z-10 bg-white rounded-full p-3 shadow-lg hover:scale-110 transition"
                >
                  <Heart
                    className={`w-5 h-5 ${isWishlisted
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                      }`}
                  />
                </button>

                <div className="h-[520px] flex items-center justify-center p-8">

                  <img
                    src={product.images[selectedImage]}
                    alt={product.title}
                    className="max-w-full max-h-full object-contain transition duration-300 group-hover:scale-105"
                  />

                </div>

              </div>

            </div>

            {/* ---------- IMAGE COUNT ---------- */}

            <div className="flex justify-center gap-2 mt-5">

              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`h-2 rounded-full transition-all ${selectedImage === index
                      ? "w-8 bg-[#2874f0]"
                      : "w-2 bg-gray-300"
                    }`}
                />
              ))}

            </div>

            {/* ---------- ACTION BUTTONS ---------- */}

            <div className="grid grid-cols-2 gap-4 mt-6">

              <button
                onClick={handleAddToCart}
                className="bg-[#ff9f00] hover:bg-[#e88d00] text-white py-4 rounded-lg font-bold uppercase flex justify-center items-center gap-2 shadow"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="bg-[#fb641b] hover:bg-[#e85b14] text-white py-4 rounded-lg font-bold uppercase flex justify-center items-center gap-2 shadow"
              >
                <Lightbulb className="w-5 h-5" />
                Buy Now
              </button>

            </div>

          </div>
          {/* DRIVER CTA CONTROLS */}
          <div className="grid grid-cols-2 gap-3 font-semibold text-sm sm:text-base">
            <button
              onClick={handleAddToCart}
              className="bg-[#ff9f00] hover:bg-[#e68f00] active:scale-[0.98] text-white py-3.5 px-4 rounded-sm shadow-sm transition-all flex items-center justify-center gap-2 uppercase tracking-wide relative overflow-hidden"
            >
              <ShoppingCart className="w-5 h-5 fill-white stroke-none" />
              <span>Add to Cart</span>
              {cartCount > 0 && (
                <span className="absolute top-1 right-2 bg-red-500 text-white text-[10px] font-black rounded-full h-4 w-4 flex items-center justify-center animate-scale-up">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isProcessing}
              className="bg-[#fb641b] hover:bg-[#e15615] active:scale-[0.98] disabled:opacity-80 text-white py-3.5 px-4 rounded-sm shadow-sm transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
            >
              <Lightbulb className={`w-5 h-5 fill-white stroke-none ${isProcessing ? 'animate-spin' : ''}`} />
              <span>{isProcessing ? 'Routing Escrow...' : 'Buy Now'}</span>
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: CORE METADATA */}
        <div className="md:col-span-7 flex flex-col gap-5 text-gray-800 bg-white p-4 sm:p-6 rounded-sm border border-gray-200/60 shadow-sm">

          <div>
            <nav className="text-xs text-gray-400 font-medium mb-1">
              Home &gt; Premium Discovery &gt; Inventory &gt; <span className="text-gray-600 font-bold">{product.brand || 'Luxury Product'}</span>
            </nav>
            <h1 className="text-lg md:text-xl font-normal text-gray-900 leading-snug tracking-tight">
              {product.title}
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <div className="bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-0.5 shadow-sm">
              {product.rating || '4.5'} <Star className="w-3 h-3 fill-white stroke-none" />
            </div>
            <span className="text-gray-400 font-bold">
              {product.ratingsCount || '12,482'} Ratings & {product.reviewsCount || '1,094'} Verified Reviews
            </span>
            <span className="inline-block bg-[#2874f0]/10 text-[#2874f0] text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm ml-2 animate-pulse">
              ⚡ Instant Assured
            </span>
          </div>

          <div className="flex items-baseline gap-3 border-b border-gray-100 pb-3">
            <span className="text-2xl md:text-3xl font-black text-gray-950">₹{(product.price || 0).toLocaleString()}</span>
            <span className="text-sm md:text-base text-gray-400 line-through font-medium">₹{(product.originalPrice || 0).toLocaleString()}</span>
            <span className="text-sm md:text-base font-extrabold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-sm">{discount}% off</span>
          </div>

          {/* OFFERS WORKSPACE */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-sm text-gray-900 tracking-wide flex items-center gap-1.5">
              <Package className="w-4 h-4 text-emerald-600" /> Unlockable Incentives Available
            </h3>
            <div className="flex flex-col gap-2 mt-1">
              {(product.offers || []).map((offer, index) => (
                <div key={index} className="flex items-start gap-2 text-xs font-medium text-gray-700 bg-gray-50 p-2 rounded-sm border border-gray-100 hover:border-emerald-200 transition-colors">
                  <Tag className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5 fill-emerald-600/10" />
                  <p>{offer}</p>
                </div>
              ))}
              {(!product.offers || product.offers.length === 0) && (
                <p className="text-xs text-gray-400 italic">No special conditions attached to this generation item.</p>
              )}
            </div>
          </div>

          {/* INTERACTIVE PINCODE CHECKER */}
          <div className="border border-gray-200 rounded-sm p-4 bg-gray-50/50 flex flex-col gap-3 mt-2">
            <h4 className="font-bold text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-gray-400" /> Dispatch Router Link
            </h4>
            <form onSubmit={checkDelivery} className="flex max-w-sm border-b-2 border-[#2874f0] bg-white rounded-t-sm overflow-hidden shadow-sm">
              <input
                type="text"
                placeholder="Type your 6-digit pin code"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                className="w-full px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none font-semibold tracking-wide"
              />
              <button type="submit" className="px-4 py-2 text-xs text-[#2874f0] font-black uppercase tracking-wider hover:bg-blue-50 transition-colors">
                Verify
              </button>
            </form>
            {deliveryStatus && (
              <p className={`text-xs font-bold ${deliveryStatus.available ? 'text-emerald-600' : 'text-red-500'} animate-scale-up`}>
                {deliveryStatus.message}
              </p>
            )}

            <div className="grid grid-cols-3 gap-2 text-[11px] font-semibold text-gray-500 mt-2 border-t border-gray-100 pt-3">
              <div className="flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4 text-[#2874f0]" /> <span>Immediate Reset</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#2874f0]" /> <span>Free Virtual Routing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2874f0]" /> <span>Simulated Warranty</span>
              </div>
            </div>
          </div>

          {/* SUMMARY SPECIFICATION DOTS */}
          <div className="mt-2">
            <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2 mb-2">Item Specifications</h3>
            <ul className="list-disc pl-4 text-xs font-medium text-gray-600 flex flex-col gap-2.5 leading-relaxed">
              {(product.highlights || []).map((item, idx) => (
                <li key={idx} className="marker:text-blue-400 text-gray-700">{item}</li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetail;