import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CreditCard,
} from "lucide-react";

// Lucide removed brand/logo icons (Instagram, LinkedIn, Twitter, etc.) from
// its core set, so these are small inline SVGs instead of package imports.
function InstagramIcon({ size = 18, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon({ size = 18, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V8h4v1.5A5.5 5.5 0 0 1 16 8Z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TwitterIcon({ size = 18, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 5.8c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.3 1.7-2.2-.8.5-1.7.8-2.6 1A4 4 0 0 0 12 8.5c0 .3 0 .6.1.9-3.3-.2-6.2-1.8-8.2-4.2-.3.6-.5 1.3-.5 2 0 1.4.7 2.6 1.8 3.4-.7 0-1.3-.2-1.9-.5 0 1.9 1.4 3.6 3.2 4-.6.2-1.2.2-1.9.1.5 1.6 2 2.8 3.8 2.8A8 8 0 0 1 2 19.6 11.3 11.3 0 0 0 8.3 21.5c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.2Z" />
    </svg>
  );
}

function Footer() {
  return (
    <footer className="bg-white text-gray-900 mt-16 border-t border-slate-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Newsletter strip */}
        <div className="py-8 sm:py-10 -mt-8 sm:-mt-10">
          <div className="bg-gradient-to-r from-[#2874f0] to-[#1f5fd1] rounded-3xl px-6 sm:px-10 py-8 sm:py-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-blue-100">
            <div className="text-center md:text-left">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Get offers before anyone else
              </h3>
              <p className="text-blue-100 text-sm mt-1">
                Subscribe for deals, new arrivals, and exclusive discounts.
              </p>
            </div>

            <form className="w-full md:w-auto flex items-center gap-2 bg-white rounded-full p-1.5 pl-5 max-w-md md:max-w-none shadow-sm">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder="Enter your email"
                className="bg-transparent flex-1 min-w-0 text-sm text-gray-900 placeholder:text-gray-400 outline-none"
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 bg-[#2874f0] hover:bg-[#1f5fd1] text-white text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-full transition-colors whitespace-nowrap"
              >
                Subscribe
                <ArrowRight size={15} />
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 py-10">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              ShopSphere
            </h2>

            <p className="text-gray-500 mt-4 leading-relaxed max-w-sm">
              Your trusted multi-vendor marketplace for fashion,
              electronics, home essentials, and more.
            </p>

            <div className="flex gap-3 mt-6">
              <a
                href="#"
                aria-label="Instagram"
                className="p-2 bg-slate-100 text-gray-600 rounded-xl hover:bg-[#2874f0] hover:text-white transition-colors duration-200"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="p-2 bg-slate-100 text-gray-600 rounded-xl hover:bg-[#2874f0] hover:text-white transition-colors duration-200"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="p-2 bg-slate-100 text-gray-600 rounded-xl hover:bg-[#2874f0] hover:text-white transition-colors duration-200"
              >
                <TwitterIcon size={18} />
              </a>
              <a
                href="mailto:support@shopsphere.com"
                aria-label="Email"
                className="p-2 bg-slate-100 text-gray-600 rounded-xl hover:bg-[#2874f0] hover:text-white transition-colors duration-200"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <nav aria-label="Shop categories">
            <h3 className="font-semibold text-base mb-5 text-gray-900">
              Shop
            </h3>

            <ul className="space-y-3 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-[#2874f0] transition-colors">Fashion</a></li>
              <li><a href="#" className="hover:text-[#2874f0] transition-colors">Electronics</a></li>
              <li><a href="#" className="hover:text-[#2874f0] transition-colors">Mobiles</a></li>
              <li><a href="#" className="hover:text-[#2874f0] transition-colors">Home & Furniture</a></li>
              <li><a href="#" className="hover:text-[#2874f0] transition-colors">Sports</a></li>
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <h3 className="font-semibold text-base mb-5 text-gray-900">
              Company
            </h3>

            <ul className="space-y-3 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-[#2874f0] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#2874f0] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#2874f0] transition-colors">Become a Seller</a></li>
              <li><a href="#" className="hover:text-[#2874f0] transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-[#2874f0] transition-colors">Contact Us</a></li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-base mb-5 text-gray-900">
              Contact
            </h3>

            <ul className="space-y-4 text-gray-500 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={17} className="text-[#2874f0] mt-0.5 shrink-0" />
                <span>Nashik, Maharashtra, India</span>
              </li>

              <li className="flex items-center gap-3">
                <Phone size={17} className="text-[#2874f0] shrink-0" />
                <a href="tel:+919876543210" className="hover:text-[#2874f0] transition-colors">
                  +91 98765 43210
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail size={17} className="text-[#2874f0] shrink-0" />
                <a href="mailto:support@shopsphere.com" className="hover:text-[#2874f0] transition-colors">
                  support@shopsphere.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Payments strip */}
        <div className="border-t border-slate-100 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <CreditCard size={16} className="text-[#2874f0]" />
            <span>We accept all major payment methods</span>
          </div>

          <div className="flex items-center gap-2.5 text-xs font-semibold text-gray-600">
            <span className="bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-md">VISA</span>
            <span className="bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-md">Mastercard</span>
            <span className="bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-md">UPI</span>
            <span className="bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-md">PayPal</span>
            <span className="bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-md">RuPay</span>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-100 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-500 text-sm text-center">
            © 2026 ShopSphere. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-5 text-sm text-gray-500 justify-center">
            <a href="#" className="hover:text-[#2874f0] transition-colors">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-[#2874f0] transition-colors">
              Terms & Conditions
            </a>

            <a href="#" className="hover:text-[#2874f0] transition-colors">
              Refund Policy
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;