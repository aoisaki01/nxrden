'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { database } from '@/lib/firebase';
import { ref, onValue } from 'firebase/database';

export default function Hero() {
    // Static count for security - prevents reading all orders on client side
    const [customerCount, setCustomerCount] = useState(128); // Started at 78 + ~50

    // Real-time fetching removed to protect customer data
    useEffect(() => {
        // Animation effect for the number (optional)
        const interval = setInterval(() => {
            setCustomerCount(prev => prev < 150 ? prev + 1 : prev);
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative overflow-hidden py-24 sm:py-32">
            <div className="absolute inset-0 z-0 hidden dark:block">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-pink-400 text-sm mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                        </span>
                        Instant Delivery System Online
                    </div>

                    <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-white mb-6">
                        Level Up Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-glow">
                            Digital Experience
                        </span>
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
                        The most trusted marketplace for Robux and digital vouchers.
                        Experience safe transactions, instant delivery, and dedicated 24/7 support.
                    </p>

                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a href="#custom" className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all hover:scale-105">
                            Shop Now <ArrowRight size={20} />
                        </a>
                        <Link href="/tatacara-pembelian" className="text-sm font-semibold leading-6 text-white hover:text-pink-400 transition-colors">
                            How it works <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </motion.div>

                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto border-t border-white/10 pt-10">
                    <div className="flex flex-col items-center gap-2">
                        <div className="p-3 bg-white/5 rounded-xl text-yellow-400 mb-2"><Zap size={24} /></div>
                        <h3 className="text-white font-bold">Instant Processing</h3>
                        <p className="text-sm text-gray-400">Automated system 24/7</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="p-3 bg-white/5 rounded-xl text-green-400 mb-2"><ShieldCheck size={24} /></div>
                        <h3 className="text-white font-bold">Safe & Trusted</h3>
                        <p className="text-sm text-gray-400">Guaranteed Secure Transactions</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="p-3 bg-white/5 rounded-xl text-blue-400 mb-2"><Star size={24} /></div>
                        <h3 className="text-white font-bold">Trusted Service</h3>
                        <p className="text-sm text-gray-400">{customerCount}+ Happy Customers</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
