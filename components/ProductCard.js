'use client';

import { motion } from 'framer-motion';

export default function ProductCard({ product, onBuy }) {
    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative group block rounded-2xl overflow-hidden transition-all duration-500"
        >
            {/* Liquid Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-500" />

            {/* Glass Container */}
            <div className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 p-5 flex flex-col justify-between z-10 hover:border-white/20 hover:shadow-[0_8px_32px_0_rgba(216,180,254,0.15)] transition-all duration-300">

                {/* Glossy Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {product.imageUrl?.trim() && (
                    <div className="mb-4 rounded-xl overflow-hidden h-36 w-full relative shadow-lg group-hover:shadow-primary/20 transition-shadow duration-500">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-in-out"
                        />
                        {/* Image Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                )}

                <div className="flex justify-between items-start mb-4">
                    <div className="w-full">
                        <div className="flex justify-between items-start">
                            <h3 className="text-xl font-bold font-display text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary transition-all duration-300">
                                {product.name}
                            </h3>
                            <span className="text-xs font-bold px-2 py-1 rounded-full bg-white/10 text-gray-300 border border-white/5 backdrop-blur-md group-hover:border-primary/30 group-hover:text-primary transition-colors">
                                {product.category}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-auto border-t border-white/5 pt-4 group-hover:border-white/10 transition-colors">
                    <span className="text-lg font-mono text-white font-medium drop-shadow-sm group-hover:text-primary transition-colors">
                        {product.priceDisplay}
                    </span>
                    <button
                        onClick={() => onBuy(product)}
                        className="relative overflow-hidden bg-white/10 hover:bg-primary text-white hover:text-black px-6 py-2 rounded-xl text-sm font-bold transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(216,180,254,0.4)] group-hover:translate-x-1"
                    >
                        <span className="relative z-10">BUY</span>
                    </button>
                </div>
            </div>

            {/* Animated Border/Glow */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-primary/50 transition-all duration-500 z-20 pointer-events-none" />
        </motion.div>
    );
}
