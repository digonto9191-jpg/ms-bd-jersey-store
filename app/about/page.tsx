'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">About MS BD</h1>
          <p className="text-xl">Your Jersey. Your Team.</p>
        </div>
      </section>

      {/* About Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Our Story */}
          <section>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              MS BD was founded with a simple mission: to bring authentic, premium football
              jerseys to football fans across Bangladesh. We believe that every fan deserves
              access to their favorite team's official merchandise without breaking the bank.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Since our launch, we've become Bangladesh's trusted source for club and national
              team jerseys, serving thousands of passionate football fans.
            </p>
          </section>

          {/* Our Mission */}
          <section>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-slate-700 leading-relaxed">
              To provide football fans in Bangladesh with authentic, affordable, and
              high-quality jerseys from their favorite clubs and national teams. We're
              committed to excellent customer service and fast delivery.
            </p>
          </section>

          {/* Our Values */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-bold text-lg mb-2">Quality</h3>
                <p className="text-slate-700">
                  We only stock authentic, premium jerseys from trusted sources.
                </p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-bold text-lg mb-2">Affordability</h3>
                <p className="text-slate-700">
                  Best prices without compromising on quality.
                </p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-bold text-lg mb-2">Customer Service</h3>
                <p className="text-slate-700">
                  Dedicated support to ensure your satisfaction.
                </p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-bold text-lg mb-2">Speed</h3>
                <p className="text-slate-700">
                  Fast processing and delivery across Bangladesh.
                </p>
              </div>
            </div>
          </section>

          {/* Team Stats */}
          <section className="bg-slate-100 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-8 text-center">By The Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-4xl font-bold text-blue-600">40+</p>
                <p className="text-slate-600 mt-2">Jersey Types</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-600">24</p>
                <p className="text-slate-600 mt-2">Teams</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-600">5000+</p>
                <p className="text-slate-600 mt-2">Happy Customers</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-600">24/7</p>
                <p className="text-slate-600 mt-2">Support</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
