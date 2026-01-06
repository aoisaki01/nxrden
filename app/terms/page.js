import Navbar from '@/components/Navbar';

export default function Terms() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-20 space-y-8 text-gray-300">
                <h1 className="text-4xl font-display font-bold text-white mb-10 text-center">Terms of Service</h1>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">1. General</h2>
                    <p>By purchasing from Norden Store, you agree to these terms. We serve as a third-party seller for digital goods.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">2. Refunds</h2>
                    <p>Due to the nature of digital goods, all sales are final once the product has been delivered. Refunds are only processed if delivery fails on our end.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">3. Privacy</h2>
                    <p>We do not store your payment details. We only store your username/email for order fulfillment purposes.</p>
                </section>
            </div>
        </main>
    );
}
