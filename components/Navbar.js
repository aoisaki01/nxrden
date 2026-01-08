"use client";
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="border-b border-white/5 backdrop-blur-md sticky top-0 z-50 bg-[#0a0a0a]/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2 group">
                            {/* Logo Animation */}
                            <div className="relative">
                                <span className="font-display text-xl md:text-2xl font-bold text-white relative z-10 transition-colors group-hover:text-primary duration-300">
                                    NXRDEN STORE
                                </span>
                                <div className="absolute inset-0 blur-lg bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-1">
                        {[
                            { name: 'Custom Order', href: '#custom' },
                            { name: 'Premium', href: '#premium' },
                            { name: 'Regular', href: '#regular' },
                            { name: 'Other', href: '#other' }
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={`/${item.href}`}
                                className="text-gray-400 hover:text-primary px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-white/5 relative group"
                            >
                                {item.name}
                                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-primary p-2 transition-colors"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-[#0a0a0a]/95 border-b border-white/5 backdrop-blur-xl">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {[
                            { name: 'Custom Order', href: '#custom' },
                            { name: 'Premium', href: '#premium' },
                            { name: 'Regular', href: '#regular' },
                            { name: 'Other', href: '#other' }
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={`/${item.href}`}
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-primary hover:bg-white/5 block px-3 py-2 rounded-lg text-base font-medium transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
