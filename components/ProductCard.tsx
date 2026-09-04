'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';

interface ProductCardProps {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  team: string;
  stock: number;
}

export default function ProductCard({
  id,
  name,
  slug,
  price,
  image,
  team,
  stock,
}: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      size: 'M',
      quantity: 1,
    });
    alert('Added to cart!');
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
      {/* Image */}
      <div className="relative h-64 bg-slate-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        {stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold">OUT OF STOCK</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-sm text-slate-500 mb-1">{team}</p>
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{name}</h3>
        <p className="text-2xl font-bold text-blue-600 mb-4">৳{price.toLocaleString()}</p>
        <p className="text-sm text-slate-600 mb-4">
          {stock > 0 ? `${stock} in stock` : 'Out of stock'}
        </p>

        {/* Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/jerseys/${slug}`}
            className="flex-1 bg-slate-200 text-slate-900 py-2 rounded text-center hover:bg-slate-300 transition font-medium"
          >
            View
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={stock === 0}
            className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition font-medium disabled:bg-gray-400"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
