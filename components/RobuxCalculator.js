'use client';

import { useState, useEffect } from 'react';
import { Calculator, Zap, Gamepad2 } from 'lucide-react';
import { database } from '@/lib/firebase';
import { ref, onValue } from 'firebase/database';

export default function RobuxCalculator({ onBuy }) {
    const [mode, setMode] = useState('5days'); // '5days' or 'gamepass'
    const [amount, setAmount] = useState('');
    const [price, setPrice] = useState(0);
    const [rates, setRates] = useState({ rate5Days: 95, rateGamepass: 120 }); // Defaults

    useEffect(() => {
        const ratesRef = ref(database, 'config/rates');
        const unsubscribe = onValue(ratesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setRates({
                    rate5Days: Number(data.rate5Days) || 95,
                    rateGamepass: Number(data.rateGamepass) || 120
                });
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const val = parseInt(amount) || 0;
        const rate = mode === '5days' ? rates.rate5Days : rates.rateGamepass;
        setPrice(val * rate);
    }, [amount, mode, rates]);

    const handleBuy = () => {
        if (!amount || price <= 0) return;

        onBuy({
            id: `custom_${mode}_${amount}`,
            name: `${amount} Robux (${mode === '5days' ? '5 Days' : 'Gamepass'})`,
            price: price,
            priceDisplay: `Rp ${price.toLocaleString('id-ID')}`,
            category: 'Custom Order'
        });
    };

    return (
        <section className="mb-16">
            <h2 className="text-2xl font-display font-bold text-white mb-8 flex items-center gap-2">
                <span className="w-1 h-8 bg-primary rounded-full inline-block shadow-[0_0_10px_var(--primary)]"></span>
                Custom Order Calculator
            </h2>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 max-w-2xl backdrop-blur-sm">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Mode Selection */}
                    <div className="flex-1 space-y-4">
                        <label className="text-gray-400 text-sm font-bold uppercase tracking-wider">Select Service Type</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setMode('5days')}
                                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${mode === '5days' ? 'bg-primary/20 border-primary text-white shadow-[0_0_15px_rgba(216,180,254,0.15)]' : 'bg-black/40 border-white/10 text-gray-400 hover:bg-white/5'}`}
                            >
                                <Zap size={24} className={mode === '5days' ? 'text-primary' : ''} />
                                <span className="font-bold">5 Days</span>
                                <span className="text-xs opacity-70">Rate {rates.rate5Days} / RBX</span>
                            </button>
                            <button
                                onClick={() => setMode('gamepass')}
                                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${mode === 'gamepass' ? 'bg-accent/20 border-accent text-white shadow-[0_0_15px_rgba(168,85,247,0.15)]' : 'bg-black/40 border-white/10 text-gray-400 hover:bg-white/5'}`}
                            >
                                <Gamepad2 size={24} className={mode === 'gamepass' ? 'text-accent' : ''} />
                                <span className="font-bold">Gamepass</span>
                                <span className="text-xs opacity-70">Rate {rates.rateGamepass} / RBX</span>
                            </button>
                        </div>
                    </div>

                    {/* Calculation */}
                    <div className="flex-1 space-y-4">
                        <div>
                            <label className="text-gray-400 text-sm font-bold uppercase tracking-wider">Robux Amount</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="e.g. 500"
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white text-lg font-mono focus:outline-none focus:border-primary transition-colors mt-2"
                            />
                        </div>

                        <div className="bg-black/30 rounded-lg p-4 flex justify-between items-center border border-white/5">
                            <span className="text-gray-400 text-sm">Total Price</span>
                            <span className="text-xl font-bold text-primary font-mono text-glow">
                                Rp {price.toLocaleString('id-ID')}
                            </span>
                        </div>

                        <button
                            onClick={handleBuy}
                            disabled={!amount || price <= 0}
                            className="w-full bg-primary hover:bg-white hover:text-black text-black font-bold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(216,180,254,0.2)]"
                        >
                            <Calculator size={18} />
                            Calculate & Buy
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
