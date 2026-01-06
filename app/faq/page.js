import Navbar from '@/components/Navbar';

export default function FAQ() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-20">
                <h1 className="text-4xl font-display font-bold text-white mb-10 text-center">Frequently Asked Questions</h1>

                <div className="space-y-6">
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-2">How long does the delivery take?</h3>
                        <p className="text-gray-400">Our system is automated. Once the payment is verified, the Robux/Vouchers are delivered instantly to your account/email. Usually within 1-5 minutes.</p>
                    </div>

                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-2">What payment methods do you accept?</h3>
                        <p className="text-gray-400">We primarily accept QRIS (GoPay, OVO, Dana, ShopeePay, BCA Mobile, etc.).</p>
                    </div>

                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-2">It's been 10 minutes, where is my order?</h3>
                        <p className="text-gray-400">If there is a delay, please contact our support via WhatsApp/Instagram with your Order ID. Sometimes there are network delays or maintenance.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
