import React, { useState } from 'react';
import { Trash2, ShieldCheck, Plus, Minus, MapPin, Truck, Sparkles, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();

  // Mock cart line items state management
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

  // Operational dopamine indicators
  const [isRoutingCheckout, setIsRoutingCheckout] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nextQty = item.quantity + delta;
          if (nextQty > 0) {
            triggerToast(delta > 0 ? "🔥 Upgrading order quantity! More dopamine on the way!" : "📉 Dropped quantum sizing.");
            return { ...item, quantity: nextQty };
          }
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    const targetItem = cartItems.find(i => i.id === id);
    setCartItems(prev => prev.filter(item => item.id !== id));
    triggerToast(`🗑️ Removed ${targetItem?.title.slice(0, 20)}... from your hold list.`);
  };

  // Price Calculation Engine
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalOriginalPrice = cartItems.reduce((acc, item) => acc + (item.originalPrice * item.quantity), 0);
  const totalCurrentPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalDiscount = totalOriginalPrice - totalCurrentPrice;
  const totalDelivery = cartItems.reduce((acc, item) => acc + item.deliveryCharge, 0);
  const finalBillAmount = totalCurrentPrice + totalDelivery;

  // Handles moving to payment checkout path with artificial reward delay
  const handlePlaceOrder = () => {
    setIsRoutingCheckout(true);
    
    setTimeout(() => {
      setIsRoutingCheckout(false);
      // Route out while safely feeding calculated bill parameters downstream 
      navigate('/checkout', {
        state: {
          itemsCount: totalItems,
          totalSaved: totalDiscount,
          payableAmount: finalBillAmount
        }
      });
    }, 1200);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center bg-white border border-gray-100 rounded-sm shadow-sm mt-4 animate-scale-up">
        <div className="text-6xl mb-4">🛒</div>
        <h3 className="text-lg font-black text-gray-900 tracking-tight">Your cart is empty!</h3>
        <p className="text-xs text-gray-400 mt-1 mb-6">Explore our top premium categories to claim your free reward points.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-[#2874f0] text-white font-bold text-sm px-12 py-3 rounded-sm shadow-md uppercase tracking-wider hover:bg-[#1e57b8] active:scale-98 transition-all"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-4 relative font-sans select-none">
      
      {/* MICRO TOAST FEEDBACK NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-gray-950 text-white text-xs font-bold px-6 py-3.5 rounded-sm shadow-2xl flex items-center gap-2 border border-gray-800 animate-slide-up">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-2 sm:px-4 grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        
        {/* LEFT COLUMN: Items and Delivery Pin Anchor */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          
          {/* Address Ribbon */}
          <div className="bg-white px-4 py-3 rounded-sm shadow-sm border border-gray-200/60 flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-gray-800 font-medium">
              <MapPin className="w-4 h-4 text-[#2874f0]" />
              <span>Deliver to: <strong className="font-bold text-gray-950">Mumbai - 400001 (Priority Route)</strong></span>
            </div>
            <button 
              onClick={() => triggerToast("📍 Automated address router lock confirmed.")}
              className="text-[#2874f0] font-bold border border-gray-200 px-3 py-1 rounded-sm hover:bg-gray-50 text-xs transition-colors"
            >
              Change
            </button>
          </div>

          {/* Cart Items Core List */}
          <div className="bg-white rounded-sm shadow-sm border border-gray-200/60 overflow-hidden">
            <div className="border-b border-gray-100 px-4 py-3">
              <h2 className="font-black text-gray-900 text-base tracking-tight">Dopcart Hub ({totalItems} Items Selected)</h2>
            </div>

            {cartItems.map((item) => {
              const itemDiscount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
              
              return (
                <div key={item.id} className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 items-start transition-colors hover:bg-gray-50/40">
                  
                  {/* Left Side: Product Thumbnail */}
                  <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
                    <div className="w-24 h-24 bg-gray-50 border border-gray-100 rounded flex items-center justify-center text-4xl shadow-inner">
                      {item.image}
                    </div>
                    
                    {/* Quantity Control Panel */}
                    <div className="flex items-center gap-2 mt-1">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:border-gray-400 bg-white shadow-sm active:scale-90 disabled:opacity-30 disabled:pointer-events-none transition-transform"
                        disabled={item.quantity === 1}
                      >
                        <Minus className="w-3 h-3 stroke-[2.5]" />
                      </button>
                      <input 
                        type="text" 
                        value={item.quantity} 
                        readOnly 
                        className="w-9 h-7 border border-gray-300 rounded text-center text-xs font-black text-gray-900 focus:outline-none bg-gray-50"
                      />
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:border-gray-400 bg-white shadow-sm active:scale-90 transition-transform"
                      >
                        <Plus className="w-3 h-3 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>

                  {/* Right Side: Descriptions Meta */}
                  <div className="flex-1 flex flex-col gap-1 w-full">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 pr-4 line-clamp-2 hover:text-[#2874f0] cursor-pointer transition-colors leading-relaxed">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-gray-400 font-bold tracking-wider uppercase">Fulfillment: {item.seller}</p>
                    
                    {/* Price Block */}
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-base font-black text-gray-950">₹{(item.price * item.quantity).toLocaleString()}</span>
                      <span className="text-xs text-gray-400 line-through font-medium">₹{(item.originalPrice * item.quantity).toLocaleString()}</span>
                      <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-1 rounded-sm">{itemDiscount}% Off</span>
                    </div>

                    {/* Logistics Strip */}
                    <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-700 font-medium">
                      <Truck className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                      <span>{item.deliveryDate}</span>
                      <span className="text-gray-300">|</span>
                      {item.deliveryCharge === 0 ? (
                        <span className="text-emerald-600 font-bold bg-emerald-50 px-1 rounded-sm">Free Immediate Shipping</span>
                      ) : (
                        <span className="text-gray-500 font-semibold">₹{item.deliveryCharge} Delivery</span>
                      )}
                    </div>

                    {/* Actions Row */}
                    <div className="flex items-center gap-6 mt-4 pt-2 border-t border-dashed border-gray-100">
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove Item</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}

            {/* Place Order Row */}
            <div className="p-4 bg-white flex justify-end shadow-inner border-t border-gray-100 sticky bottom-0 z-20">
              <button 
                onClick={handlePlaceOrder}
                disabled={isRoutingCheckout}
                className="bg-[#fb641b] hover:bg-[#e15615] disabled:opacity-85 active:scale-[0.99] text-white font-bold text-sm uppercase tracking-widest px-12 py-3.5 rounded-sm shadow-md transition-all w-full sm:w-auto text-center flex items-center justify-center gap-2"
              >
                {isRoutingCheckout ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Allocating Credits...</span>
                  </>
                ) : (
                  <span>Place Order</span>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Summary Bill Breakdown */}
        <div className="bg-white rounded-sm shadow-sm border border-gray-200/60 lg:sticky lg:top-20 overflow-hidden">
          <div className="border-b border-gray-100 px-4 py-3">
            <h3 className="text-gray-400 font-bold tracking-wider text-[10px] uppercase">Dopamine Summary Ledger</h3>
          </div>
          
          <div className="p-4 flex flex-col gap-4 text-xs sm:text-sm font-semibold text-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Gross Retail Price ({totalItems} item{totalItems > 1 ? 's' : ''})</span>
              <span className="font-mono font-medium text-gray-900">₹{totalOriginalPrice.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center text-emerald-600 bg-emerald-50/50 p-2 rounded-sm border border-dashed border-emerald-100">
              <span>Platform Markdown Subsidy</span>
              <span className="font-mono font-bold">- ₹{totalDiscount.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-4">
              <span className="text-gray-500">Logistics Deployment</span>
              {totalDelivery === 0 ? (
                <span className="text-emerald-600 font-bold uppercase tracking-wider">FREE</span>
              ) : (
                <span className="font-mono">₹{totalDelivery}</span>
              )}
            </div>

            <div className="flex justify-between items-center text-base font-black text-gray-950 border-b border-dashed border-gray-200 pb-4">
              <span>Total Billable Due</span>
              <span className="font-mono text-xl text-blue-600">₹{finalBillAmount.toLocaleString()}</span>
            </div>

            <div className="bg-emerald-600 text-white p-3 rounded-sm flex items-center gap-2 shadow-sm animate-pulse">
              <span className="text-lg">💰</span>
              <p className="text-[11px] font-bold leading-tight">
                Score! You saved an astronomical ₹{totalDiscount.toLocaleString()} credit points on this batch transaction!
              </p>
            </div>
          </div>

          {/* Secure Platform Policy Ribbon */}
          <div className="bg-gray-50/80 px-4 py-3.5 border-t border-gray-100 flex items-center gap-2.5 text-[10px] font-bold text-gray-400">
            <ShieldCheck className="w-5 h-5 text-[#2874f0] flex-shrink-0" />
            <p className="leading-normal">Sandbox Environment. Zero actual charge liability. Instant validation metrics active.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;