import React, { useState } from 'react';
import { Trash2, ShieldCheck, Plus, Minus, MapPin, Truck } from 'lucide-react';

const Cart = () => {
  // Mock cart line items with base metrics
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'Wireless Bluetooth Headset with ANC (Active Noise Cancellation)',
      seller: 'OmniTechRetail',
      image: '🎧',
      price: 1499,
      originalPrice: 3999,
      quantity: 1,
      deliveryDate: 'Delivery by tomorrow, Thu',
      deliveryCharge: 0,
    },
    {
      id: 2,
      title: 'Smart Fitness Watch AMOLED Display & Heart Rate Monitor',
      seller: 'FlashSaleHub',
      image: '⌚',
      price: 2199,
      originalPrice: 5999,
      quantity: 1,
      deliveryDate: 'Delivery by Sat, Jul 4',
      deliveryCharge: 40,
    }
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nextQty = item.quantity + delta;
          return nextQty > 0 ? { ...item, quantity: nextQty } : item;
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Price Calculation Engine
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalOriginalPrice = cartItems.reduce((acc, item) => acc + (item.originalPrice * item.quantity), 0);
  const totalCurrentPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalDiscount = totalOriginalPrice - totalCurrentPrice;
  const totalDelivery = cartItems.reduce((acc, item) => acc + item.deliveryCharge, 0);
  const finalBillAmount = totalCurrentPrice + totalDelivery;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center bg-white border border-gray-100 rounded-sm shadow-sm mt-4">
        <div className="text-6xl mb-4">🛒</div>
        <h3 className="text-lg font-bold text-gray-800">Your cart is empty!</h3>
        <p className="text-xs text-gray-400 mt-1 mb-6">Explore our top categories to add items.</p>
        <button className="bg-[#2874f0] text-white font-semibold text-sm px-12 py-2.5 rounded-sm shadow-sm uppercase tracking-wide hover:bg-[#1e57b8] transition-colors">
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-4">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        
        {/* LEFT COLUMN: Items and Delivery Pin Anchor */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          
          {/* Address Ribbon */}
          <div className="bg-white px-4 py-3 rounded-sm shadow-sm border border-gray-200/60 flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-gray-800">
              <MapPin className="w-4 h-4 text-[#2874f0]" />
              <span>Deliver to: <strong className="font-semibold">Mumbai - 400001</strong></span>
            </div>
            <button className="text-[#2874f0] font-semibold border border-gray-200 px-3 py-1 rounded-sm hover:bg-gray-50 text-xs transition-colors">
              Change
            </button>
          </div>

          {/* Cart Items Core List */}
          <div className="bg-white rounded-sm shadow-sm border border-gray-200/60 overflow-hidden">
            <div className="border-b border-gray-100 px-4 py-3 flex justify-between items-center">
              <h2 className="font-semibold text-gray-900 text-base">FlipZone Cart ({totalItems})</h2>
            </div>

            {cartItems.map((item) => {
              const itemDiscount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
              
              return (
                <div key={item.id} className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 items-start transition-colors hover:bg-gray-50/30">
                  
                  {/* Left Side: Product Emoji/Thumbnail Presentation */}
                  <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
                    <div className="w-24 h-24 bg-gray-50 border border-gray-100 rounded flex items-center justify-center text-4xl select-none">
                      {item.image}
                    </div>
                    
                    {/* Quantity Control Buttons */}
                    <div className="flex items-center gap-2 mt-1">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:border-gray-400 bg-white shadow-sm disabled:opacity-50"
                        disabled={item.quantity === 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <input 
                        type="text" 
                        value={item.quantity} 
                        readOnly 
                        className="w-9 h-7 border border-gray-300 rounded text-center text-xs font-bold text-gray-800 focus:outline-none"
                      />
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:border-gray-400 bg-white shadow-sm"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Right Side: Primary Meta Data & Descriptions */}
                  <div className="flex-1 flex flex-col gap-1 w-full">
                    <h3 className="text-sm font-medium text-gray-900 pr-4 line-clamp-2 hover:text-[#2874f0] cursor-pointer">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-gray-400 font-medium">Seller: {item.seller}</p>
                    
                    {/* Price Block */}
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-base font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</span>
                      <span className="text-xs text-gray-400 line-through">₹{(item.originalPrice * item.quantity).toLocaleString()}</span>
                      <span className="text-xs font-bold text-emerald-600">{itemDiscount}% Off</span>
                    </div>

                    {/* Delivery Notification Strip */}
                    <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-700">
                      <Truck className="w-3.5 h-3.5 text-gray-400" />
                      <span>{item.deliveryDate}</span>
                      <span className="text-gray-300">|</span>
                      {item.deliveryCharge === 0 ? (
                        <span className="text-emerald-600 font-semibold">Free Delivery</span>
                      ) : (
                        <span className="text-gray-500">₹{item.deliveryCharge} Delivery</span>
                      )}
                    </div>

                    {/* Action Rows */}
                    <div className="flex items-center gap-6 mt-4 pt-2 border-t border-dashed border-gray-100">
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Remove
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}

            {/* Place Order Sticky Row */}
            <div className="p-4 bg-white flex justify-end shadow-inner sticky bottom-0 z-10 border-t border-gray-100">
              <button className="bg-[#fb641b] hover:bg-[#e15615] text-white font-semibold text-sm uppercase tracking-wide px-10 py-3 rounded-sm shadow-md transition-colors w-full sm:w-auto text-center">
                Place Order
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Price Details Breakdown Summary */}
        <div className="bg-white rounded-sm shadow-sm border border-gray-200/60 sticky top-18 overflow-hidden">
          <div className="border-b border-gray-100 px-4 py-3">
            <h3 className="text-gray-400 font-bold tracking-wider text-[11px] uppercase">Price Details</h3>
          </div>
          
          <div className="p-4 flex flex-col gap-4 text-sm font-medium text-gray-700">
            <div className="flex justify-between items-center">
              <span>Price ({totalItems} item{totalItems > 1 ? 's' : ''})</span>
              <span>₹{totalOriginalPrice.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center text-emerald-600">
              <span>Discount</span>
              <span>- ₹{totalDiscount.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-4">
              <span>Delivery Charges</span>
              {totalDelivery === 0 ? (
                <span className="text-emerald-600">FREE</span>
              ) : (
                <span>₹{totalDelivery}</span>
              )}
            </div>

            <div className="flex justify-between items-center text-base font-bold text-gray-900 border-b border-dashed border-gray-200 pb-4">
              <span>Total Amount</span>
              <span>₹{finalBillAmount.toLocaleString()}</span>
            </div>

            <p className="text-xs text-emerald-600 font-bold tracking-wide mt-1">
              You will save ₹{totalDiscount.toLocaleString()} on this order
            </p>
          </div>

          {/* Secure Platform Policy Ribbon */}
          <div className="bg-gray-50/80 px-4 py-3 border-t border-gray-100 flex items-center gap-2.5 text-[11px] font-semibold text-gray-400">
            <ShieldCheck className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <p className="leading-normal">Safe and Secure Payments. Easy returns. 100% Authentic products.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;