'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import PaymentModal from '@/components/PaymentModal';
import RobuxCalculator from '@/components/RobuxCalculator';
import Hero from '@/components/Hero';
import { database } from '@/lib/firebase';
import { ref, onValue } from 'firebase/database';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productsRef = ref(database, 'products');
    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productList = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        }));
        setProducts(productList);
      } else {
        setProducts([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleBuy = (product) => {
    setSelectedProduct(product);
  };

  const premiumProducts = products.filter(p => p.category === 'Premium');
  const regularProducts = products.filter(p => p.category === 'Regular');
  const otherProducts = products.filter(p => p.category === 'Other');

  return (
    <main className="min-h-screen">
      <Navbar />

      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div id="custom" className="scroll-mt-24">
          <RobuxCalculator onBuy={handleBuy} />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Premium Section */}
            {premiumProducts.length > 0 && (
              <section className="mb-16">
                <h2 className="text-2xl font-display font-bold text-white mb-8 flex items-center gap-2">
                  <span className="w-1 h-8 bg-pink-500 rounded-full inline-block"></span>
                  Premium Robux
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {premiumProducts.map(p => (
                    <ProductCard key={p.id} product={p} onBuy={handleBuy} />
                  ))}
                </div>
              </section>
            )}

            {/* Regular Section */}
            {regularProducts.length > 0 && (
              <section id="regular" className="mb-16 scroll-mt-24">
                <h2 className="text-2xl font-display font-bold text-white mb-8 flex items-center gap-2">
                  <span className="w-1 h-8 bg-violet-500 rounded-full inline-block"></span>
                  Robux Regular
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {regularProducts.map(p => (
                    <ProductCard key={p.id} product={p} onBuy={handleBuy} />
                  ))}
                </div>
              </section>
            )}

            {/* Other Products Section */}
            {otherProducts.length > 0 && (
              <section id="other" className="scroll-mt-24">
                <h2 className="text-2xl font-display font-bold text-white mb-8 flex items-center gap-2">
                  <span className="w-1 h-8 bg-green-500 rounded-full inline-block"></span>
                  Other Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {otherProducts.map(p => (
                    <ProductCard key={p.id} product={p} onBuy={handleBuy} />
                  ))}
                </div>
              </section>
            )}

            {products.length === 0 && (
              <div className="text-center text-gray-500 py-12">
                No products available. Please check back later.
              </div>
            )}
          </>
        )}
      </div>

      <PaymentModal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
      />
    </main>
  );
}
