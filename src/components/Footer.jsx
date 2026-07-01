import React from 'react';
import { HelpCircle, Briefcase, Gift, Star, Copyright } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'ABOUT',
      links: ['Contact Us', 'About Us', 'Careers', 'FlipZone Stories', 'Press', 'Corporate Information'],
    },
    {
      title: 'GROUP COMPANIES',
      links: ['Myntra', 'Cleartrip', 'Shopsy'],
    },
    {
      title: 'HELP',
      links: ['Payments', 'Shipping', 'Cancellation & Returns', 'FAQ', 'Report Infringement'],
    },
    {
      title: 'CONSUMER POLICY',
      links: ['Cancellation & Returns', 'Terms Of Use', 'Security', 'Privacy', 'Sitemap', 'Grievance Redressal', 'EPR Compliance'],
    },
  ];

  return (
    <footer className="bg-[#172337] text-white text-xs font-sans mt-auto border-t border-gray-700">
      
      {/* 1. Main Navigation Grid */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-7 gap-6 border-b border-gray-700">
        
        {/* Left Side Links (4 Columns out of 7) */}
        <div className="col-span-2 md:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {footerSections.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <h4 className="text-gray-400 font-semibold tracking-wider mb-1 uppercase text-[11px]">
                {section.title}
              </h4>
              {section.links.map((link, lIdx) => (
                <a key={lIdx} href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="hover:underline text-gray-200 hover:text-white transition-colors py-0.5">
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Middle Separator Line (Hidden on Mobile) */}
        <div className="hidden md:block col-span-1 border-l border-gray-700 h-full justify-self-center" />

        {/* Right Side Info (2 Columns out of 7) */}
        <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 md:pl-2">
          <div className="flex flex-col gap-2">
            <h4 className="text-gray-400 font-semibold tracking-wider mb-1 uppercase text-[11px]">
              Mail Us:
            </h4>
            <p className="text-gray-300 leading-relaxed">
              FlipZone Internet Private Limited,<br />
              Buildings Alyssa, Begonia &<br />
              Clove Embassy Tech Village,<br />
              Outer Ring Road, Devarabeesanahalli Village,<br />
              Bengaluru, 560103,<br />
              Karnataka, India
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-gray-400 font-semibold tracking-wider mb-1 uppercase text-[11px]">
              Registered Office Address:
            </h4>
            <p className="text-gray-300 leading-relaxed">
              FlipZone Internet Private Limited,<br />
              Buildings Alyssa, Begonia &<br />
              Clove Embassy Tech Village,<br />
              Outer Ring Road, Devarabeesanahalli Village,<br />
              Bengaluru, 560103,<br />
              Karnataka, India<br />
              CIN : U51109KA2012PTC066107<br />
              Telephone: <span className="text-[#2874f0] font-semibold cursor-pointer">044-45614700</span>
            </p>
          </div>
        </div>

      </div>

      {/* 2. Bottom Platform Metrics & Trust Elements */}
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-300">
        
        {/* Core Links */}
        <div className="flex flex-wrap justify-center md:justify-start gap-6 font-medium">
          <a href="#seller" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Briefcase className="w-4 h-4 text-[#ffe500]" />
            <span>Become a Seller</span>
          </a>
          <a href="#advertise" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Star className="w-4 h-4 text-[#ffe500]" />
            <span>Advertise</span>
          </a>
          <a href="#gift" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Gift className="w-4 h-4 text-[#ffe500]" />
            <span>Gift Cards</span>
          </a>
          <a href="#help" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <HelpCircle className="w-4 h-4 text-[#ffe500]" />
            <span>Help Center</span>
          </a>
        </div>

        {/* Copyright notice */}
        <div className="flex items-center gap-1 text-sm font-normal text-gray-400">
          <Copyright className="w-3.5 h-3.5" />
          <span>2026 FlipZone.com</span>
        </div>

        {/* Payment Partner Logos Placeholder */}
        <div className="flex items-center gap-2 filter grayscale opacity-60 hover:opacity-100 transition-opacity select-none bg-white/5 px-3 py-1.5 rounded-sm">
          <span className="font-black italic tracking-tighter text-sm text-white">VISA</span>
          <span className="font-bold italic text-sm text-red-400">mastercard</span>
          <span className="font-mono font-bold text-xs tracking-tight text-blue-400">RuPay</span>
          <span className="font-serif font-bold italic text-sm text-emerald-400">NetBanking</span>
        </div>

      </div>

    </footer>
  );
};

export default Footer;