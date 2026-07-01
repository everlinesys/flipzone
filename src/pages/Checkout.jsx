import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, CreditCard, Landmark, Truck, Wallet, Check } from 'lucide-react';

const Checkout = () => {
  // Master control state handling active step progression
  // 1: Login, 2: Address, 3: Summary, 4: Payment
  const [activeStep, setActiveStep] = useState(2); 
  
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('upi');

  const addresses = [
    { id: 1, name: 'John Doe', type: 'HOME', phone: '9876543210', text: 'Flat 401, Blue Horizon Apartment, Link Road, Andheri West, Mumbai, Maharashtra', pincode: '400053' },
    { id: 2, name: 'John Doe (Office)', type: 'WORK', phone: '9876543211', text: 'Tech Park Delta, Block C, 2nd Floor, Phase 3, Hinjewadi, Pune, Maharashtra', pincode: '411057' }
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-4">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* ================= LEFT SIDE: ACCORDION PROCESS PANEL ================= */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          
          {/* STEP 1: USER IDENTITY (PRE-COMPLETED MOCK) */}
          <div className="bg-white rounded-sm shadow-sm border border-gray-200/60 overflow-hidden">
            {activeStep > 1 ? (
              <div className="p-4 flex items-center justify-between bg-white text-xs font-medium">
                <div className="flex items-center gap-4">
                  <span className="bg-gray-100 text-[#2874f0] font-bold w-5 h-5 rounded-sm flex items-center justify-center text-[11px]">1</span>
                  <div>
                    <span className="text-gray-500 font-bold uppercase tracking-wider text-[10px] block">LOGIN</span>
                    <span className="text-gray-900 font-semibold text-sm">John Doe <span className="text-gray-400 font-normal ml-2">+91 9876543210</span></span>
                  </div>
                </div>
                <button onClick={() => setActiveStep(1)} className="text-[#2874f0] font-bold uppercase tracking-wider border border-gray-100 px-4 py-2 rounded-sm hover:bg-gray-50 transition-colors">Change</button>
              </div>
            ) : (
              <div className="p-4 bg-[#2874f0] text-white flex items-center gap-4">
                <span className="bg-white text-[#2874f0] font-bold w-5 h-5 rounded-sm flex items-center justify-center text-[11px]">1</span>
                <h3 className="font-bold uppercase tracking-wider text-xs">LOGIN & VERIFICATION</h3>
              </div>
            )}
          </div>

          {/* STEP 2: DELIVERY ADDRESS */}
          <div className="bg-white rounded-sm shadow-sm border border-gray-200/60 overflow-hidden">
            {activeStep === 2 ? (
              <>
                <div className="p-4 bg-[#2874f0] text-white flex items-center gap-4">
                  <span className="bg-white text-[#2874f0] font-bold w-5 h-5 rounded-sm flex items-center justify-center text-[11px]">2</span>
                  <h3 className="font-bold uppercase tracking-wider text-xs">DELIVERY ADDRESS</h3>
                </div>
                
                <div className="p-4 flex flex-col gap-4 bg-gray-50/30">
                  {addresses.map((addr) => (
                    <label key={addr.id} className={`p-4 border rounded-sm flex items-start gap-3 cursor-pointer bg-white transition-all ${selectedAddress === addr.id ? 'border-blue-100 bg-blue-50/10 shadow-sm' : 'border-gray-200'}`}>
                      <input 
                        type="radio" 
                        name="address" 
                        checked={selectedAddress === addr.id}
                        onChange={() => setSelectedAddress(addr.id)}
                        className="mt-1 w-3.5 h-3.5 accent-[#2874f0]"
                      />
                      <div className="text-xs sm:text-sm text-gray-700 flex-1">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="font-bold text-gray-900">{addr.name}</span>
                          <span className="bg-gray-100 text-gray-500 font-bold text-[9px] px-1.5 py-0.5 rounded-sm">{addr.type}</span>
                          <span className="font-bold text-gray-900 ml-auto">{addr.phone}</span>
                        </div>
                        <p className="text-gray-600 leading-relaxed font-medium">{addr.text} - <strong className="font-semibold text-gray-900">{addr.pincode}</strong></p>
                        
                        {selectedAddress === addr.id && (
                          <button 
                            onClick={(e) => { e.preventDefault(); setActiveStep(3); }}
                            className="mt-4 bg-[#fb641b] hover:bg-[#e15615] text-white font-bold uppercase tracking-wide text-xs px-6 py-3 rounded-sm shadow transition-colors"
                          >
                            Deliver Here
                          </button>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </>
            ) : (
              <div className="p-4 flex items-center justify-between bg-white text-xs font-medium border-t border-gray-50">
                <div className="flex items-center gap-4">
                  <span className="bg-gray-100 text-[#2874f0] font-bold w-5 h-5 rounded-sm flex items-center justify-center text-[11px]">2</span>
                  <div>
                    <span className="text-gray-500 font-bold uppercase tracking-wider text-[10px] block">DELIVERY ADDRESS</span>
                    <span className="text-gray-900 font-semibold text-sm line-clamp-1 max-w-md">
                      {addresses.find(a => a.id === selectedAddress)?.name} • {addresses.find(a => a.id === selectedAddress)?.text}
                    </span>
                  </div>
                </div>
                {activeStep > 2 && (
                  <button onClick={() => setActiveStep(2)} className="text-[#2874f0] font-bold uppercase tracking-wider border border-gray-100 px-4 py-2 rounded-sm hover:bg-gray-50 transition-colors">Change</button>
                )}
              </div>
            )}
          </div>

          {/* STEP 3: ORDER SUMMARY */}
          <div className="bg-white rounded-sm shadow-sm border border-gray-200/60 overflow-hidden">
            {activeStep === 3 ? (
              <>
                <div className="p-4 bg-[#2874f0] text-white flex items-center gap-4">
                  <span className="bg-white text-[#2874f0] font-bold w-5 h-5 rounded-sm flex items-center justify-center text-[11px]">3</span>
                  <h3 className="font-bold uppercase tracking-wider text-xs">ORDER SUMMARY</h3>
                </div>
                
                <div className="p-4 border-b border-gray-100 flex gap-4 items-center bg-white">
                  <div className="w-14 h-14 bg-gray-50 rounded flex items-center justify-center text-3xl border border-gray-100 select-none">🎧</div>
                  <div className="flex-1 text-xs sm:text-sm">
                    <h4 className="font-medium text-gray-900 line-clamp-1">Wireless Bluetooth Headset with ANC Dual-Mode</h4>
                    <p className="text-[11px] text-gray-400 font-medium mt-0.5">Seller: OmniTechRetail</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-bold text-gray-900">₹1,499</span>
                      <span className="text-xs text-gray-400 line-through">₹3,999</span>
                      <span className="text-xs font-bold text-emerald-600">62% Off</span>
                    </div>
                  </div>
                  <div className="text-right text-xs text-gray-600 font-medium hidden sm:block">
                    <span className="block text-gray-900 font-semibold">Delivery tomorrow, Thu</span>
                    <span className="text-emerald-600 font-bold">Free Shipping</span>
                  </div>
                </div>

                <div className="p-4 bg-white flex justify-between items-center border-t border-gray-100 shadow-inner">
                  <p className="text-xs font-medium text-gray-500">Order confirmation email will be sent to john.doe@email.com</p>
                  <button 
                    onClick={() => setActiveStep(4)}
                    className="bg-[#fb641b] hover:bg-[#e15615] text-white font-bold uppercase tracking-wide text-xs px-8 py-3 rounded-sm shadow transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </>
            ) : (
              <div className="p-4 flex items-center bg-white text-xs font-medium border-t border-gray-50">
                <span className="bg-gray-100 text-gray-400 font-bold w-5 h-5 rounded-sm flex items-center justify-center text-[11px] mr-4">3</span>
                <div>
                  <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px] block">ORDER SUMMARY</span>
                  {activeStep > 3 && <span className="text-gray-900 font-semibold text-sm">1 Item ordered</span>}
                </div>
              </div>
            )}
          </div>

          {/* STEP 4: PAYMENT OPTIONS */}
          <div className="bg-white rounded-sm shadow-sm border border-gray-200/60 overflow-hidden">
            {activeStep === 4 ? (
              <>
                <div className="p-4 bg-[#2874f0] text-white flex items-center gap-4">
                  <span className="bg-white text-[#2874f0] font-bold w-5 h-5 rounded-sm flex items-center justify-center text-[11px]">4</span>
                  <h3 className="font-bold uppercase tracking-wider text-xs">PAYMENT OPTIONS</h3>
                </div>
                
                <div className="p-4 flex flex-col gap-0 bg-gray-50/20">
                  {/* Payment Node - UPI */}
                  <label className={`p-4 border-b border-gray-100 flex items-start gap-4 cursor-pointer bg-white ${selectedPayment === 'upi' ? 'bg-blue-50/5' : ''}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={selectedPayment === 'upi'}
                      onChange={() => setSelectedPayment('upi')}
                      className="mt-1 w-3.5 h-3.5 accent-[#2874f0]"
                    />
                    <div className="text-xs sm:text-sm flex-1 flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <div>
                        <span className="font-bold text-gray-900 block">UPI (PhonePe / Google Pay / BHIM)</span>
                        <span className="text-xs text-gray-400 font-medium">Pay instantly using your preferred banking app</span>
                      </div>
                    </div>
                  </label>

                  {/* Payment Node - Cards */}
                  <label className={`p-4 border-b border-gray-100 flex items-start gap-4 cursor-pointer bg-white ${selectedPayment === 'card' ? 'bg-blue-50/5' : ''}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={selectedPayment === 'card'}
                      onChange={() => setSelectedPayment('card')}
                      className="mt-1 w-3.5 h-3.5 accent-[#2874f0]"
                    />
                    <div className="text-xs sm:text-sm flex-1 flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-purple-600" />
                      <div>
                        <span className="font-bold text-gray-900 block">Credit / Debit / ATM Card</span>
                        <span className="text-xs text-gray-400 font-medium">Visa, Mastercard, RuPay, Maestro supported</span>
                      </div>
                    </div>
                  </label>

                  {/* Payment Node - NetBanking */}
                  <label className={`p-4 border-b border-gray-100 flex items-start gap-4 cursor-pointer bg-white ${selectedPayment === 'netbanking' ? 'bg-blue-50/5' : ''}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={selectedPayment === 'netbanking'}
                      onChange={() => setSelectedPayment('netbanking')}
                      className="mt-1 w-3.5 h-3.5 accent-[#2874f0]"
                    />
                    <div className="text-xs sm:text-sm flex-1 flex items-center gap-3">
                      <Landmark className="w-5 h-5 text-blue-600" />
                      <div>
                        <span className="font-bold text-gray-900 block">Net Banking</span>
                        <span className="text-xs text-gray-400 font-medium">All major Indian corporate and retail banks</span>
                      </div>
                    </div>
                  </label>

                  {/* Payment Node - COD */}
                  <label className={`p-4 flex items-start gap-4 cursor-pointer bg-white ${selectedPayment === 'cod' ? 'bg-blue-50/5' : ''}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={selectedPayment === 'cod'}
                      onChange={() => setSelectedPayment('cod')}
                      className="mt-1 w-3.5 h-3.5 accent-[#2874f0]"
                    />
                    <div className="text-xs sm:text-sm flex-1 flex items-center gap-3">
                      <Wallet className="w-5 h-5 text-amber-600" />
                      <div>
                        <span className="font-bold text-gray-900 block">Cash on Delivery</span>
                        <span className="text-xs text-gray-400 font-medium">Pay via cash or digital links when package arrives</span>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Confirm Final Purchase Button */}
                <div className="p-4 bg-white border-t border-gray-100 flex justify-end shadow-inner">
                  <button className="bg-[#fb641b] hover:bg-[#e15615] text-white font-bold uppercase tracking-wide text-sm px-12 py-3.5 rounded-sm shadow-md transition-colors w-full sm:w-auto text-center">
                    Confirm & Pay ₹1,499
                  </button>
                </div>
              </>
            ) : (
              <div className="p-4 flex items-center bg-white text-xs font-medium border-t border-gray-50">
                <span className="bg-gray-100 text-gray-400 font-bold w-5 h-5 rounded-sm flex items-center justify-center text-[11px] mr-4">4</span>
                <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">PAYMENT OPTIONS</span>
              </div>
            )}
          </div>

        </div>

        {/* ================= RIGHT SIDE: STICKY BILLING METRICS ================= */}
        <div className="lg:col-span-4 bg-white rounded-sm shadow-sm border border-gray-200/60 sticky top-20 overflow-hidden">
          <div className="border-b border-gray-100 px-4 py-3">
            <h3 className="text-gray-400 font-bold tracking-wider text-[11px] uppercase">Price Details</h3>
          </div>
          
          <div className="p-4 flex flex-col gap-4 text-sm font-medium text-gray-700">
            <div className="flex justify-between items-center">
              <span>Price (1 item)</span>
              <span>₹3,999</span>
            </div>
            
            <div className="flex justify-between items-center text-emerald-600">
              <span>Discount</span>
              <span>- ₹2,500</span>
            </div>

            <div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-4">
              <span>Delivery Charges</span>
              <span className="text-emerald-600 font-bold">FREE</span>
            </div>

            <div className="flex justify-between items-center text-base font-bold text-gray-900 border-b border-dashed border-gray-200 pb-4">
              <span>Total Payable</span>
              <span>₹1,499</span>
            </div>

            <p className="text-xs text-emerald-600 font-bold tracking-wide mt-0.5 flex items-center gap-1.5">
              <Check className="w-4 h-4 bg-emerald-100 rounded-full p-0.5" />
              Your total savings on this order is ₹2,500
            </p>
          </div>

          {/* Secure Platform Policy Banner */}
          <div className="bg-gray-50/80 px-4 py-3.5 border-t border-gray-100 flex items-center gap-3 text-[11px] font-semibold text-gray-400">
            <ShieldCheck className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <p className="leading-normal">Safe and Secure Payments. 100% Authentic products protection.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;