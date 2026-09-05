'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/app/context/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'cash',
  });

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Cart is Empty</h1>
          <p className="text-slate-600 mb-8">Add jerseys before checkout</p>
          <Link
            href="/jerseys"
            className="bg-blue-600 text-white px-6 py-3 rounded inline-block hover:bg-blue-700 transition"
          >
            Shop Jerseys
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        ...formData,
        items: cart,
        totalAmount: total,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (data.success) {
        clearCart();
        router.push(`/orders/${data.data.id}`);
      } else {
        alert('Order failed: ' + data.error);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order');
    } finally {
      setLoading(false);
    }
  };

  const finalTotal = Math.round(total * 1.05);

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Info */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">Delivery Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="customerName"
                    placeholder="Full Name"
                    value={formData.customerName}
                    onChange={handleChange}
                    required
                    className="border px-4 py-2 rounded w-full"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border px-4 py-2 rounded w-full"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="border px-4 py-2 rounded w-full"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="border px-4 py-2 rounded w-full"
                  />
                </div>

                <textarea
                  name="address"
                  placeholder="Delivery Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="border px-4 py-2 rounded w-full mt-4"
                />

                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code (Optional)"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="border px-4 py-2 rounded w-full mt-4"
                />
              </div>

              {/* Payment Method */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">Payment Method</h2>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-slate-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleChange}
                    />
                    <span className="font-bold">Cash on Delivery</span>
                  </label>

                  <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-slate-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bkash"
                      checked={formData.paymentMethod === 'bkash'}
                      onChange={handleChange}
                    />
                    <span className="font-bold">bKash</span>
                  </label>

                  <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-slate-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="nagad"
                      checked={formData.paymentMethod === 'nagad'}
                      onChange={handleChange}
                    />
                    <span className="font-bold">Nagad</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-slate-100 p-6 rounded-lg h-fit">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-3 mb-4 pb-4 border-b max-h-64 overflow-y-auto">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}`} className="text-sm">
                  <div className="flex justify-between">
                    <span className="truncate">{item.name}</span>
                    <span>×{item.quantity}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Size: {item.size}</span>
                    <span>৳{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-6 pb-6 border-b">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>৳{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (5%)</span>
                <span>৳{Math.round(total * 0.05).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
            </div>

            <div className="flex justify-between text-2xl font-bold text-blue-600">
              <span>Total</span>
              <span>৳{finalTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
