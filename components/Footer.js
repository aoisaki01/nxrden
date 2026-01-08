import Link from 'next/link';
import { Instagram, MessageCircle, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-[#0a0a0a] backdrop-blur-md mt-auto relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="font-display text-2xl font-bold text-white mb-4 group inline-flex items-center gap-2">
                            <span className="group-hover:text-primary transition-colors duration-300">NXRDEN STORE</span>
                            <span className="text-white/20">|</span>
                            <span className="text-white/60">PASIFIXC</span>
                        </h3>
                        <p className="text-gray-400 text-sm max-w-sm mb-6 leading-relaxed">
                            Premium digital goods marketplace. Secure, fast, and automated.
                            Providing the best rates for your gaming needs since 2026.
                        </p>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-primary/30 transition-colors duration-300">
                            <p className="text-white font-bold tracking-tight">NXRDEN STORE | PASIFIXC</p>
                            <p className="text-primary/70 text-xs tracking-tight mt-1">powered by pasifixc infrastructure</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Support</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            {['FAQ', 'Terms of Service', 'Privacy Policy', 'Contact Us'].map((item) => (
                                <li key={item}>
                                    <Link href={`/${item.toLowerCase().replace(/ /g, '-')}`} className="hover:text-primary transition-colors flex items-center gap-2 group">
                                        <span className="w-1 h-1 bg-primary/50 full-rounded opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Socials</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-primary hover:scale-110 transition-all duration-300"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary hover:scale-110 transition-all duration-300"><Twitter size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-green-500 hover:scale-110 transition-all duration-300"><MessageCircle size={20} /></a>
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
