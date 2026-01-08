'use client';

import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
    return (
        <div className="relative max-w-xl mx-auto mb-12 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl leading-5 text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-300 hover:bg-white/10 shadow-lg shadow-black/20"
                placeholder="Search for Robux, Gamepasses..."
            />
            <div className="absolute inset-0 rounded-2xl pointer-events-none ring-1 ring-white/5 group-hover:ring-white/10 transition-all" />

            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl opacity-0 group-focus-within:opacity-20 blur-md transition-opacity duration-500 -z-10" />
        </div>
    );
}
