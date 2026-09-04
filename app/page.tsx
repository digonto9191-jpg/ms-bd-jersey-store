'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  team: string;
  stock: number;
  featured: boolean;
}

export default function Home() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch('/api/products?featured=true&limit=6');
        const data = await res.json();
        setFeatured(data.data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Your Jersey. Your Team.</h1>
          <p className="text-xl mb-8 text-slate-200">
            Premium football jerseys for club and national team fans
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/jerseys"
              className="bg-white text-blue-600 px-8 py-3 rounded font-bold hover:bg-slate-100 transition"
            >
              Shop Jerseys
            </Link>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded font-bold hover:bg-white/10 transition">
              Explore Teams
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Jerseys</h2>
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </section>

      {/* Why MS BD */}
      <section className="bg-slate-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why MS BD?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="font-bold mb-2">Quality Jerseys</h3>
              <p className="text-slate-600">Premium quality jerseys from official sources</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="font-bold mb-2">Affordable Price</h3>
              <p className="text-slate-600">Best prices for authentic football jerseys</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="font-bold mb-2">Fast Delivery</h3>
              <p className="text-slate-600">Quick and reliable shipping across Bangladesh</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="font-bold mb-2">Easy Ordering</h3>
              <p className="text-slate-600">Simple and secure checkout process</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Teams */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Popular Teams</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {['real-madrid', 'barcelona', 'manchester-united', 'liverpool', 'brazil', 'argentina'].map((team) => (
            <Link
              key={team}
              href={`/teams/${team}`}
              className="bg-slate-100 p-4 rounded text-center hover:bg-blue-500 hover:text-white transition font-bold"
            >
              {team.replace('-', ' ').toUpperCase()}
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
