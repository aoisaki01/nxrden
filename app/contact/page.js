import Navbar from '@/components/Navbar';
import { Instagram, Phone, Gamepad2, Mail } from 'lucide-react';

export default function Contact() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-20">
                <h1 className="text-4xl font-display font-bold text-white mb-10 text-center">Contact Us</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white">Get in Touch</h3>
                        <p className="text-gray-400">
                            Have questions about your order or need assistance? Our team is ready to help you 24/7.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
                                <div className="p-3 bg-gradient-to-br from-pink-500 to-violet-500 rounded-lg text-white shadow-lg shadow-pink-500/20">
                                    <Mail size={24} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-400">Email</p>
                                    <a href="mailto:zaidaan1337@gmail.com" className="font-medium text-lg hover:text-pink-400 transition-colors">
                                        zaidaan1337@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
                                <div className="p-3 bg-gradient-to-br from-pink-500 to-violet-500 rounded-lg text-white shadow-lg shadow-pink-500/20">
                                    <Instagram size={24} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-400">Instagram</p>
                                    <a href="https://www.instagram.com/zaid44nn" target="_blank" rel="noopener noreferrer" className="font-medium text-lg hover:text-pink-400 transition-colors">
                                        @zaid44nn
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
                                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg text-white shadow-lg shadow-green-500/20">
                                    <Phone size={24} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-400">WhatsApp</p>
                                    <a href="https://wa.me/6285793719676" target="_blank" rel="noopener noreferrer" className="font-medium text-lg hover:text-green-400 transition-colors">
                                        +62 857-9371-9676
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
                                <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg text-white shadow-lg shadow-indigo-500/20">
                                    <Gamepad2 size={24} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-400">Discord</p>
                                    <a href="https://discord.com/users/529168872696446988" target="_blank" rel="noopener noreferrer" className="font-medium text-lg hover:text-indigo-400 transition-colors">
                                        Chat on Discord
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl h-fit">
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Name</label>
                                <input className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-pink-500 focus:outline-none transition-colors" placeholder="Your name" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Email</label>
                                <input className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-pink-500 focus:outline-none transition-colors" placeholder="your@email.com" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Message</label>
                                <textarea className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white h-32 focus:border-pink-500 focus:outline-none transition-colors resize-none" placeholder="How can we help?"></textarea>
                            </div>
                            <button className="w-full bg-gradient-to-r from-pink-600 to-violet-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition shadow-lg shadow-pink-500/25">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
