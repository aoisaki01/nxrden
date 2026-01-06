import Link from 'next/link';
import { Instagram, MessageCircle, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black/50 backdrop-blur-md mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="font-display text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 mb-4">
                            NXRDEN STORE | PASIFIXC
                        </h3>
                        <p className="text-gray-400 text-sm max-w-sm mb-4">
                            Premium digital goods marketplace. Secure, fast, and automated.
                            Providing the best rates for your gaming needs since 2026.
                        </p>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                            <p className="text-white font-bold tracking-tight">NXRDEN STORE | PASIFIXC</p>
                            <p className="text-white text-xs tracking-tight">powered by pasifixc</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/faq" className="hover:text-pink-500 transition-colors">FAQ</Link></li>
                            <li><Link href="/terms" className="hover:text-pink-500 transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="hover:text-pink-500 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/contact" className="hover:text-pink-500 transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Socials</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-green-500 transition-colors"><MessageCircle size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 mt-12 pt-8 text-center text-xs text-gray-500">
                    © {new Date().getFullYear()} NXRDEN STORE | PASIFIXC. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
