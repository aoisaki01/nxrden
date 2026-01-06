import Navbar from '@/components/Navbar';

export default function Privacy() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-20 space-y-8 text-gray-300">
                <h1 className="text-4xl font-display font-bold text-white mb-10 text-center">Privacy Policy</h1>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                    <p className="mb-2">We only collect information necessary to process your transaction. This includes:</p>
                    <ul className="list-disc ml-5">
                        <li>Roblox Username (for delivery)</li>
                        <li>Transaction details (Order ID, Amount)</li>
                        <li>Contact information if provided for support</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">2. Payment Data</h2>
                    <p>We do not store your credit card or full banking details. All payments are processed via secure QRIS standard.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">3. Data Usage</h2>
                    <p>Your data is used solely for:</p>
                    <ul className="list-disc ml-5 mt-2">
                        <li>Processing your orders</li>
                        <li>Customer support</li>
                        <li>Improving our store services</li>
                    </ul>
                </section>
            </div>
        </main>
    );
}
