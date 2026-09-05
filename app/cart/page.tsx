'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-slate-600 mb-8">Add some jerseys to get started!</p>
          <Link
            href="/jerseys"
            className="bg-blue-600 text-white px-6 py-3 rounded inline-block hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="bg-white p-6 rounded-lg shadow flex gap-4"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-slate-600">Size: {item.size}</p>
                    <p className="text-blue-600 font-bold mt-2">৳{item.price.toLocaleString()}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-slate-100"
                      >
                        −
                      </button>
                      <span className="px-4 py-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right min-w-24">
                      <p className="font-bold">৳{(item.price * item.quantity).toLocaleString()}</p>
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-red-500 text-sm hover:text-red-700 mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-slate-100 p-6 rounded-lg h-fit">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6 pb-6 border-b">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>৳{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>৳{Math.round(total * 0.05).toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between text-2xl font-bold mb-6">
              <span>Total</span>
              <span>৳{Math.round(total * 1.05).toLocaleString()}</span>
            </div>

            <Link
              href="/checkout"
              className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition block text-center mb-3"
            >
              Proceed to Checkout
            </Link>

            <button
              onClick={() => {
                if (confirm('Clear cart?')) clearCart();
              }}
              className="w-full border border-red-500 text-red-500 py-3 rounded font-bold hover:bg-red-50 transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
