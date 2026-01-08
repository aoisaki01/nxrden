'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Smartphone } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useState, useEffect } from 'react';
import { generateDynamicQRIS } from '@/lib/qris';
import { database } from '@/lib/firebase';
import { ref, push, serverTimestamp } from 'firebase/database';

export default function PaymentModal({ isOpen, onClose, product }) {
    const [step, setStep] = useState('input'); // input, payment, success
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Reset status when reopening
    useEffect(() => {
        if (isOpen) {
            setStep('input');
            setUsername('');
        }
    }, [isOpen]);

    if (!isOpen || !product) return null;

    const BASE_QRIS = process.env.NEXT_PUBLIC_QRIS_STATIC || "00020101021126570011ID.DANA.WWW011893600915302259148102090225914810303UMI51440014ID.CO.QRIS.WWW0215ID10200176114730303UMI5204581253033605802ID5922Warung Sayur Bu Sugeng6010Kab. Demak610559567630458C7";
    const qrData = generateDynamicQRIS(BASE_QRIS, product.price);

    const handleContinue = () => {
        if (!username.trim()) return;
        setStep('payment');
    };

    const handleCheckStatus = async () => {
        setIsLoading(true);

        try {
            // Save order to Firebase
            await push(ref(database, 'orders'), {
                productId: product.id,
                productName: product.name,
                price: product.price,
                username: username,
                status: 'pending', // pending, completed
                category: product.category || 'Regular',
                createdAt: serverTimestamp()
            });

            // Simulate checking delay
            setTimeout(() => {
                setIsLoading(false);
                setStep('success');
            }, 1000);
        } catch (error) {
            console.error("Order failed", error);
            alert("Failed to create order. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl shadow-pink-500/10"
                >
                    {/* Header */}
                    <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5 backdrop-blur-md">
                        <h3 className="font-display text-lg text-white">
                            {step === 'input' ? 'Customer Details' : step === 'payment' ? 'Complete Payment' : 'Success'}
                        </h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-white transition">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                        {step === 'input' && (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <h4 className="text-xl font-bold text-white mb-1">{product.name}</h4>
                                    <p className="text-primary font-mono text-lg text-glow">{product.priceDisplay}</p>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">
                                        {product.customLabel || 'Roblox Username'}
                                    </label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                        placeholder={`Enter ${product.customLabel || 'username'}...`}
                                    />
                                </div>

                                <button
                                    onClick={handleContinue}
                                    disabled={!username.trim()}
                                    className="w-full bg-primary hover:bg-white hover:text-black text-black font-bold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(216,180,254,0.2)]"
                                >
                                    Continue to Payment
                                </button>
                            </div>
                        )}

                        {step === 'payment' && (
                            <div className="flex flex-col items-center gap-6">
                                <div className="p-4 bg-white rounded-xl">
                                    <QRCodeSVG value={qrData} size={200} level="H" />
                                </div>

                                <div className="text-center space-y-2">
                                    <p className="text-white font-bold text-xl">{product.priceDisplay}</p>
                                    <p className="text-gray-400 text-sm">Scan with your banking app</p>
                                    <p className="text-xs text-gray-500">{product.customLabel || 'User'}: <span className="text-white">{username}</span></p>
                                </div>

                                <button
                                    onClick={handleCheckStatus}
                                    disabled={isLoading}
                                    className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    ) : (
                                        <>I have paid <CheckCircle size={18} /></>
                                    )}
                                </button>
                            </div>
                        )}

                        {step === 'success' && (
                            <div className="flex flex-col items-center gap-6 py-6">
                                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center">
                                    <CheckCircle size={40} />
                                </div>
                                <div className="text-center">
                                    <h4 className="text-2xl font-bold text-white mb-2">Payment Successful!</h4>
                                    <p className="text-gray-400">Your order is being processed automatically.</p>
                                    <p className="text-sm text-gray-500 mt-4">Order ID: {product.id}-{Date.now().toString().slice(-4)}</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-lg transition-all"
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
