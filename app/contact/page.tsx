'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl">We'd love to hear from you!</p>
        </div>
      </section>

      {/* Contact Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info */}
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <div className="text-5xl mb-4">📧</div>
            <h3 className="text-xl font-bold mb-2">Email</h3>
            <p className="text-slate-600">hello@msbd.example</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow text-center">
            <div className="text-5xl mb-4">📞</div>
            <h3 className="text-xl font-bold mb-2">Phone</h3>
            <p className="text-slate-600">+8801000000000</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow text-center">
            <div className="text-5xl mb-4">📍</div>
            <h3 className="text-xl font-bold mb-2">Address</h3>
            <p className="text-slate-600">Dhaka, Bangladesh</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-slate-100 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>

          {success && (
            <div className="bg-green-100 text-green-800 p-4 rounded mb-6 font-bold">
              ✓ Message sent successfully! We'll reply soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-2 border rounded"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
