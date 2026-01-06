'use client';

import { motion } from 'framer-motion';

export default function ProductCard({ product, onBuy }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="relative group block p-px rounded-xl overflow-hidden bg-gradient-to-b from-white/10 to-white/5 hover:from-pink-500/50 hover:to-violet-500/50 transition-all duration-300"
        >
            <div className="bg-[#0a0a0a] rounded-xl p-4 h-full flex flex-col justify-between relative z-10">
                {product.imageUrl?.trim() && (
                    <div className="mb-4 rounded-lg overflow-hidden h-32 w-full relative">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>
                )}

                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold font-display text-white group-hover:text-pink-400 transition-colors">
                            {product.name}
                        </h3>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">{product.category}</p>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-auto border-t border-white/5 pt-4">
                    <span className="text-lg font-mono text-white font-medium">
                        {product.priceDisplay}
                    </span>
                    <button
                        onClick={() => onBuy(product)}
                        className="bg-white/10 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                    >
                        BUY
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
