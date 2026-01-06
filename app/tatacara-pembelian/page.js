import Navbar from '@/components/Navbar';
import { ShoppingCart, User, CreditCard, CheckCircle } from 'lucide-react';

export default function TatacaraPembelian() {
    const steps = [
        {
            icon: <ShoppingCart size={32} />,
            title: "Pilih Produk",
            description: "Pilih nominal Robux atau produk digital lain yang ingin Anda beli di halaman utama."
        },
        {
            icon: <User size={32} />,
            title: "Masukkan Username",
            description: "Masukkan username Roblox Anda (tanpa password) atau data akun yang diperlukan."
        },
        {
            icon: <CreditCard size={32} />,
            title: "Lakukan Pembayaran",
            description: "Scan QRIS yang muncul menggunakan aplikasi e-wallet (GoPay, OVO, Dana, dll) atau mobile banking."
        },
        {
            icon: <CheckCircle size={32} />,
            title: "Proses Otomatis",
            description: "Sistem akan memverifikasi pembayaran dan memproses pesanan Anda secara otomatis dalam hitungan detik."
        }
    ];

    return (
        <main className="min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-display font-bold text-white mb-4">Tata Cara Pembelian</h1>
                    <p className="text-gray-400">Panduan mudah berbelanja di NXRDEN STORE</p>
                </div>

                <div className="grid gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-start gap-6 hover:bg-white/10 transition-colors">
                            <div className="p-4 bg-gradient-to-br from-pink-500 to-violet-500 rounded-xl text-white shadow-lg shadow-pink-500/20 shrink-0">
                                {step.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-sm">{index + 1}</span>
                                    {step.title}
                                </h3>
                                <p className="text-gray-300 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center">
                    <p className="text-blue-200">
                        <strong>Butuh bantuan?</strong> Hubungi kami melalui WhatsApp atau Discord yang tertera di halaman <a href="/contact" className="underline hover:text-white">Contact</a>.
                    </p>
                </div>
            </div>
        </main>
    );
}
