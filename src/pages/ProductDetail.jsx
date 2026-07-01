import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Tag, ShieldCheck, MapPin, Truck, RefreshCw, Lightbulb } from 'lucide-react';

const ProductDetail = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null);

  // Mock product details database
  const product = {
    title: 'FlipZone Premium Wireless Headset with Active Noise Cancellation (ANC), 60H Playtime, Fast Charging Bluetooth 5.3 (Matte Black)',
    brand: 'OmniTech',
    rating: 4.4,
    ratingsCount: '45,218 ratings',
    reviewsCount: '3,842 reviews',
    price: 1499,
    originalPrice: 3999,
    image: '🎧',
    highlights: [
      'Active Noise Cancellation (up to 30dB) for crystal clear audio',
      'Massive 60 Hours total playtime with lightning-fast Type-C charging',
      'Dual-device pairing mode to seamlessly jump between mobile and laptop',
      'Ultra low latency gaming mode (40ms response rate)',
      '1 Year brand replacement warranty against manufacturing defects'
    ],
    offers: [
      'Bank Offer: 10% instant discount on XYZ Bank Credit Cards, up to ₹1,500.',
      'Bank Offer: 5% Unlimited Cashback on FlipZone Axis Bank Credit Card.',
      'Special Price: Get extra ₹2500 off (price inclusive of cashback/coupon).',
      'Partner Offer: Sign up for FlipZone Pay Later and get a gift card worth ₹100.'
    ]
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const checkDelivery = (e) => {
    e.preventDefault();
    if (pincode.trim().length === 6) {
      setDeliveryStatus({ available: true, message: 'Delivery by tomorrow, Thursday | Free' });
    } else {
      setDeliveryStatus({ available: false, message: 'Please enter a valid 6-digit pin code.' });
    }
  };

  return (
    <div className="bg-white min-h-screen py-5">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* ================= LEFT COLUMN: STICKY GALLERY & BUY ROW ================= */}
        <div className="md:col-span-5 flex flex-col gap-4 md:sticky md:top-20">
          
          {/* Main Showcase Hero Container */}
          <div className="border border-gray-200 rounded-sm p-8 h-[350px] md:h-[420px] w-full flex items-center justify-center relative select-none bg-white">
            <span className="text-9xl transform hover:scale-110 transition-transform duration-300">
              {product.image}
            </span>
            
            {/* Wishlist Bubble */}
            <button 
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white shadow-md border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 stroke-red-500' : 'text-gray-400'}`} />
            </button>
          </div>

          {/* Core Intent Action Button Matrix */}
          <div className="grid grid-cols-2 gap-3 font-semibold text-sm sm:text-base">
            <button className="bg-[#ff9f00] hover:bg-[#e68f00] text-white py-3.5 px-4 rounded-sm shadow-sm transition-colors flex items-center justify-center gap-2 uppercase tracking-wide">
              <ShoppingCart className="w-5 h-5 fill-white stroke-none" />
              Add to Cart
            </button>
            <button className="bg-[#fb641b] hover:bg-[#e15615] text-white py-3.5 px-4 rounded-sm shadow-sm transition-colors flex items-center justify-center gap-2 uppercase tracking-wide">
              <Lightbulb className="w-5 h-5 fill-white stroke-none" />
              Buy Now
            </button>
          </div>

        </div>

        {/* ================= RIGHT COLUMN: METADATA & DYNAMIC BLOCKS ================= */}
        <div className="md:col-span-7 flex flex-col gap-5 text-gray-800">
          
          {/* Header Block */}
          <div>
            <nav className="text-xs text-gray-400 font-medium mb-1">
              Home &gt; Electronics &gt; Audio &gt; <span className="text-gray-600">{product.brand}</span>
            </nav>
            <h1 className="text-lg md:text-xl font-normal text-gray-900 leading-snug">
              {product.title}
            </h1>
          </div>

          {/* Social Proof Rating Aggregator */}
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <div className="bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-0.5">
              {product.rating} <Star className="w-3 h-3 fill-white stroke-none" />
            </div>
            <span className="text-gray-400 font-bold">
              {product.ratingsCount} & {product.reviewsCount}
            </span>
            <span className="inline-block bg-[#2874f0]/10 text-[#2874f0] text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm ml-2">
              Plus Assured
            </span>
          </div>

          {/* Pricing Workspace */}
          <div className="flex items-baseline gap-3 border-b border-gray-100 pb-3">
            <span className="text-2xl md:text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
            <span className="text-sm md:text-base text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
            <span className="text-sm md:text-base font-bold text-emerald-600">{discount}% off</span>
          </div>

          {/* Bank Promotion Blocks */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-sm text-gray-900 tracking-wide">Available Offers</h3>
            <div className="flex flex-col gap-2 mt-1">
              {product.offers.map((offer, index) => (
                <div key={index} className="flex items-start gap-2 text-xs font-medium text-gray-700">
                  <Tag className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5 fill-emerald-600/10" />
                  <p>{offer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pincode Logistics Checker */}
          <div className="border border-gray-200/80 rounded-sm p-4 bg-gray-50/40 flex flex-col gap-3 mt-2">
            <h4 className="font-bold text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-gray-400" /> Delivery & Services
            </h4>
            <form onSubmit={checkDelivery} className="flex max-w-sm border-b-2 border-[#2874f0] bg-white rounded-t-sm overflow-hidden shadow-sm">
              <input
                type="text"
                placeholder="Enter Delivery Pincode"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                className="w-full px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none font-semibold tracking-wide"
              />
              <button type="submit" className="px-4 py-2 text-xs text-[#2874f0] font-bold uppercase tracking-wider hover:bg-blue-50 transition-colors">
                Check
              </button>
            </form>
            {deliveryStatus && (
              <p className={`text-xs font-bold ${deliveryStatus.available ? 'text-emerald-600' : 'text-red-500'}`}>
                {deliveryStatus.message}
              </p>
            )}
            
            {/* Extended Safeguards Row */}
            <div className="grid grid-cols-3 gap-2 text-[11px] font-semibold text-gray-500 mt-2 border-t border-gray-100 pt-3">
              <div className="flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4 text-[#2874f0]" /> <span>7 Days Replacement</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#2874f0]" /> <span>Free Top Logistics</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2874f0]" /> <span>1 Year Warranty</span>
              </div>
            </div>
          </div>

          {/* Product Bullet Highlights */}
          <div className="mt-2">
            <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2 mb-2">Highlights</h3>
            <ul className="list-disc pl-4 text-xs font-medium text-gray-600 flex flex-col gap-2 leading-relaxed">
              {product.highlights.map((item, idx) => (
                <li key={idx} className="marker:text-gray-300">{item}</li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetail;