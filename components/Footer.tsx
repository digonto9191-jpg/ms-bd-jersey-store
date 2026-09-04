'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-blue-400 mb-4">MS BD</h3>
            <p className="text-slate-400">Premium football jerseys for club and national team fans.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-blue-400">Quick Links</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/" className="hover:text-blue-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/jerseys" className="hover:text-blue-400 transition">
                  Jerseys
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400 transition">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4 text-blue-400">Contact</h4>
            <p className="text-slate-400 mb-2">📧 hello@msbd.example</p>
            <p className="text-slate-400 mb-2">📞 +8801000000000</p>
            <p className="text-slate-400">📍 Dhaka, Bangladesh</p>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4 text-blue-400">Follow Us</h4>
            <div className="flex space-x-4 text-slate-400">
              <a href="#" className="hover:text-blue-400 transition text-xl">f</a>
              <a href="#" className="hover:text-blue-400 transition text-xl">📷</a>
              <a href="#" className="hover:text-blue-400 transition text-xl">𝕏</a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-8">
          <p className="text-center text-slate-500">
            © 2024 MS BD. All rights reserved. • Made with ❤️ for football fans
          </p>
        </div>
      </div>
    </footer>
  );
}
