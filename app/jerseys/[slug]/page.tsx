'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import { useCart } from '@/app/context/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  team: string;
  category: string;
  season: string;
  description: string;
  stock: number;
  sizes: string[];
  colors: string[];
}

export default function ProductDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Home');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/slug/${params.slug}`);
        const data = await res.json();
        if (data.success) {
          setProduct(data.data);
          // Fetch related products
          const relRes = await fetch(`/api/products?team=${data.data.teamSlug}&limit=4`);
          const relData = await relRes.json();
          setRelated(relData.data.filter((p: any) => p.id !== data.data.id));
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug]);

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!product) return <div className="text-center py-12">Product not found</div>;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity,
    });
    alert('Added to cart!');
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          {/* Product Info */}
          <div>
            <p className="text-slate-600 mb-2">{product.team}</p>
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-slate-600 mb-4">{product.season}</p>
            <p className="text-4xl font-bold text-blue-600 mb-4">৳{product.price.toLocaleString()}</p>

            <p className="text-slate-700 mb-6">{product.description}</p>

            <p className={`mb-6 font-bold ${
              product.stock > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </p>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="block font-bold mb-2">Size</label>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded transition ${
                      selectedSize === size
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'hover:border-blue-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <label className="block font-bold mb-2">Color</label>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded transition ${
                      selectedColor === color
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'hover:border-blue-500'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block font-bold mb-2">Quantity</label>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="border px-4 py-2 w-24 rounded"
              />
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition disabled:bg-gray-400 mb-4"
            >
              Add to Cart
            </button>

            <button className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded font-bold hover:bg-blue-50 transition">
              ❤️ Save for Later
            </button>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Related Jerseys</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <div key={p.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="font-bold mb-2 line-clamp-2">{p.name}</h3>
                    <p className="text-blue-600 font-bold">৳{p.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
