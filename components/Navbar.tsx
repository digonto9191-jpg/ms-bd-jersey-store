'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-400">
          MS BD
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="hover:text-blue-400 transition">
            Home
          </Link>
          <Link href="/jerseys" className="hover:text-blue-400 transition">
            Jerseys
          </Link>
          <Link href="/about" className="hover:text-blue-400 transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-blue-400 transition">
            Contact
          </Link>
          <Link
            href="/cart"
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            🛒 Cart
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 px-4 py-3 space-y-2">
          <Link href="/" className="block hover:text-blue-400">
            Home
          </Link>
          <Link href="/jerseys" className="block hover:text-blue-400">
            Jerseys
          </Link>
          <Link href="/about" className="block hover:text-blue-400">
            About
          </Link>
          <Link href="/contact" className="block hover:text-blue-400">
            Contact
          </Link>
          <Link href="/cart" className="block hover:text-blue-400">
            🛒 Cart
          </Link>
        </div>
      )}
    </nav>
  );
}
