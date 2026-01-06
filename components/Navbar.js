"use client";
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="border-b border-white/10 backdrop-blur-md sticky top-0 z-50 bg-black/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="font-display text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-glow">
                                NXRDEN STORE
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/#custom" className="text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium transition-colors">
                            Custom Robux
                        </Link>
                        <Link href="/#regular" className="text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium transition-colors">
                            Robux Regular
                        </Link>
                        <Link href="/#other" className="text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium transition-colors">
                            Other Products
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white p-2"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-black/95 border-b border-white/10 backdrop-blur-xl">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            href="/#custom"
                            onClick={() => setIsOpen(false)}
                            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Custom Robux
                        </Link>
                        <Link
                            href="/#regular"
                            onClick={() => setIsOpen(false)}
                            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Robux Regular
                        </Link>
                        <Link
                            href="/#other"
                            onClick={() => setIsOpen(false)}
                            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Other Products
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
