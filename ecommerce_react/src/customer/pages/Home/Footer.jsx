import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CreditCard,
} from "lucide-react";

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
    <footer className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 mt-12 rounded-[32px] border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Newsletter Banner */}
        <div className="pt-8 sm:pt-10">
          <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-800 rounded-3xl px-6 sm:px-10 py-8 sm:py-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-white">
            <div className="text-center md:text-left">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-teal-200">
                VIP Newsletter Club
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                Get Exclusive Deals & Flash Drop Alerts
              </h3>
              <p className="text-teal-100 text-xs sm:text-sm mt-1">
                Join over 50,000 smart shoppers for coupon codes and early access.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing to ShopSphere VIP Deals!");
              }}
              className="w-full md:w-auto flex items-center gap-2 bg-white dark:bg-slate-900 rounded-full p-1.5 pl-4 max-w-md md:max-w-none shadow-sm"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder="Enter your email address..."
                className="bg-transparent flex-1 min-w-0 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none"
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2.5 rounded-full transition-colors whitespace-nowrap cursor-pointer"
              >
                Subscribe
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-10 py-10">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <span className="logo text-2xl sm:text-3xl font-bold tracking-tight text-teal-600 dark:text-teal-400">
              ShopSphere
            </span>

            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              India's premier multi-vendor e-commerce destination connecting verified merchants with millions of shoppers nationwide.
            </p>

            <div className="flex gap-2.5 pt-2">
              <a
                href="#"
                aria-label="Instagram"
                className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-teal-600 hover:text-white dark:hover:bg-teal-600 transition-colors duration-200"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-teal-600 hover:text-white dark:hover:bg-teal-600 transition-colors duration-200"
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-teal-600 hover:text-white dark:hover:bg-teal-600 transition-colors duration-200"
              >
                <TwitterIcon size={16} />
              </a>
              <a
                href="mailto:support@shopsphere.com"
                aria-label="Email"
                className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-teal-600 hover:text-white dark:hover:bg-teal-600 transition-colors duration-200"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <nav aria-label="Shop categories">
            <h4 className="font-bold text-sm mb-4 text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px]">
              Categories
            </h4>
            <ul className="space-y-2.5 text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
              <li><a href="/products/men" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Men's Apparel</a></li>
              <li><a href="/products/women" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Women's Fashion</a></li>
              <li><a href="/products/electronics" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Electronics & Gadgets</a></li>
              <li><a href="/products/home_furniture" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Home & Living</a></li>
              <li><a href="/products/beauty" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Beauty & Personal Care</a></li>
            </ul>
          </nav>

          {/* Company Column */}
          <nav aria-label="Company">
            <h4 className="font-bold text-sm mb-4 text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px]">
              Platform
            </h4>
            <ul className="space-y-2.5 text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
              <li><a href="/become-seller" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-semibold text-teal-600 dark:text-teal-400">Become a Seller</a></li>
              <li><a href="/seller/login" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Seller Portal Login</a></li>
              <li><a href="/account/orders" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Track Orders</a></li>
              <li><a href="/wishlist" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Saved Wishlist</a></li>
            </ul>
          </nav>

          {/* Contact Column */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px]">
              Merchant Helpdesk
            </h4>
            <ul className="space-y-3 text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-teal-600 dark:text-teal-400 mt-0.5 shrink-0" />
                <span>Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-teal-600 dark:text-teal-400 shrink-0" />
                <span>+91 96657 74924</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-teal-600 dark:text-teal-400 shrink-0" />
                <span>support@shopsphere.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payments Strip */}
        <div className="border-t border-slate-100 dark:border-slate-800 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs">
            <CreditCard size={15} className="text-teal-600 dark:text-teal-400" />
            <span>256-Bit Razorpay & UPI Encrypted Settlement</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-300">
            <span className="bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 px-2.5 py-1 rounded-md">UPI</span>
            <span className="bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 px-2.5 py-1 rounded-md">VISA</span>
            <span className="bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 px-2.5 py-1 rounded-md">Mastercard</span>
            <span className="bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 px-2.5 py-1 rounded-md">RuPay</span>
            <span className="bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 px-2.5 py-1 rounded-md">NetBanking</span>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-slate-100 dark:border-slate-800 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
          <p>© 2026 ShopSphere Multi-Vendor Marketplace. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Refund & Cancellation</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;