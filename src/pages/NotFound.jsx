import React from 'react';
import { Home, Search, AlertCircle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="bg-gray-100 min-h-[75vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white border border-gray-200/60 rounded-sm shadow-sm p-8 text-center flex flex-col items-center">
        
        {/* Visual Showcase Block */}
        <div className="relative mb-6 select-none">
          {/* Main 404 Large Text */}
          <h1 className="text-8xl font-black tracking-tighter text-gray-200/70 font-mono">
            404
          </h1>
          {/* Layered Floating Error Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl drop-shadow-md animate-bounce duration-1000">
              🔍
            </span>
          </div>
        </div>

        {/* Informational Error Messages */}
        <h2 className="text-lg font-bold text-gray-900 tracking-tight">
          The page you're looking for isn't here!
        </h2>
        
        <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-xs mt-2 mb-8">
          The link you followed may be broken, or the page may have been removed. Search our catalog or return home to continue shopping.
        </p>

        {/* Action Button Matrix */}
        <div className="w-full flex flex-col sm:flex-row gap-3 font-semibold text-xs uppercase tracking-wider">
          <a 
            href="#home" 
            className="flex-1 bg-[#2874f0] hover:bg-[#1e57b8] text-white py-3 px-4 rounded-sm shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Go To Homepage
          </a>
          
          <a 
            href="#all-products" 
            className="flex-1 border border-gray-200 text-gray-700 hover:bg-gray-50 py-3 px-4 rounded-sm transition-colors flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4 text-gray-400" />
            Browse Products
          </a>
        </div>

        {/* Bottom Platform Guarantee Ticket */}
        <div className="mt-8 pt-4 border-t border-dashed border-gray-100 w-full flex items-center justify-center gap-1.5 text-[11px] text-gray-400 font-medium">
          <AlertCircle className="w-3.5 h-3.5 text-gray-300" />
          <span>Need help? Contact FlipZone Support</span>
        </div>

      </div>
    </div>
  );
};

export default NotFound;