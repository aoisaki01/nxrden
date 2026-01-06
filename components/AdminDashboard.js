'use client';

import { useState, useEffect } from 'react';
import { database, auth } from '@/lib/firebase';
import { ref, push, onValue, set, remove, update } from 'firebase/database';
import { signOut } from 'firebase/auth';
import { Upload, Plus, LogOut, Package, Database, Trash2, Edit2, X, Settings, DollarSign } from 'lucide-react';

const SEED_DATA = [
    { name: '1,000 RBX', price: 155000, priceDisplay: 'Rp 155.000', category: 'Premium' },
    { name: '1,550 RBX', price: 216000, priceDisplay: 'Rp 216.000', category: 'Premium' },
    { name: '2,650 RBX', price: 360000, priceDisplay: 'Rp 360.000', category: 'Premium' },
    { name: '80 RBX', price: 15800, priceDisplay: 'Rp 15.800', category: 'Regular' },
    { name: '160 RBX', price: 32000, priceDisplay: 'Rp 32.000', category: 'Regular' },
];

export default function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [rates, setRates] = useState({ rate5Days: 95, rateGamepass: 120 });

    const [view, setView] = useState('products'); // 'products', 'orders', 'settings'

    // Product Form
    const [newItem, setNewItem] = useState({ name: '', price: '', category: 'Regular', image: null });
    const [editingId, setEditingId] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        // 1. Fetch Products
        const productsRef = ref(database, 'products');
        const unsubProducts = onValue(productsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const productList = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value
                }));
                setProducts(productList);
            } else {
                setProducts([]);
            }
        });

        // 2. Fetch Orders
        const ordersRef = ref(database, 'orders');
        const unsubOrders = onValue(ordersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const orderList = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value
                })).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)); // Newest first
                setOrders(orderList);
            } else {
                setOrders([]);
            }
        });

        // 3. Fetch Rates
        const ratesRef = ref(database, 'config/rates');
        const unsubRates = onValue(ratesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setRates(data);
            }
        });

        return () => {
            unsubProducts();
            unsubOrders();
            unsubRates();
        }
    }, []);

    // --- Order Actions ---
    const handleProcessOrder = async (order) => {
        // Security Check
        const password = prompt("ENTER ADMIN PASSWORD TO PROCESS ORDER:");
        if (password !== "pasifixc123") {
            alert("ACCESS DENIED: Incorrect Password.");
            return;
        }

        if (!confirm(`Mark order for ${order.username} as Completed?`)) return;
        try {
            await update(ref(database, `orders/${order.id}`), {
                status: 'completed',
                processedAt: new Date().toISOString()
            });
        } catch (e) {
            alert('Error: ' + e.message);
        }
    };

    // --- Rate Actions ---
    const handleUpdateRates = async (e) => {
        e.preventDefault();
        try {
            await set(ref(database, 'config/rates'), {
                rate5Days: Number(rates.rate5Days),
                rateGamepass: Number(rates.rateGamepass)
            });
            alert('Rates Updated Successfully!');
        } catch (err) {
            alert('Failed to update rates: ' + err.message);
        }
    };

    // --- Product Actions ---
    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setNewItem({ ...newItem, image: e.target.files[0] });
        }
    };

    const handleSeed = async () => {
        if (!confirm('This will add default products. Continue?')) return;
        try {
            for (const item of SEED_DATA) {
                await push(ref(database, 'products'), {
                    ...item,
                    createdAt: new Date().toISOString()
                });
            }
            alert('Database Seeded!');
        } catch (e) {
            alert('Error: ' + e.message);
        }
    };

    const handleEdit = (product) => {
        setEditingId(product.id);
        setNewItem({
            name: product.name,
            price: product.price,
            category: product.category,
            customLabel: product.customLabel || '',
            image: null // Reset image input
        });
        setView('products'); // Ensure we are on the form view
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setNewItem({ name: '', price: '', category: 'Regular', customLabel: '', image: null });
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            await remove(ref(database, `products/${id}`));
        } catch (e) {
            alert('Delete failed: ' + e.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            let imageUrl = editingId ? (products.find(p => p.id === editingId)?.imageUrl || '') : '';

            // Upload new image if provided
            if (newItem.image) {
                const formData = new FormData();
                formData.append('file', newItem.image);

                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.error || 'Upload failed');
                }
                const data = await res.json();
                imageUrl = data.url;
            } // End of if (newItem.image)


            const productData = {
                name: newItem.name,
                price: Number(newItem.price),
                priceDisplay: `Rp ${Number(newItem.price).toLocaleString('id-ID')}`,
                category: newItem.category,
                customLabel: newItem.category === 'Other' ? (newItem.customLabel || 'Notes') : 'Roblox Username',
                imageUrl: imageUrl,
                updatedAt: new Date().toISOString(),
            };

            if (editingId) {
                await update(ref(database, `products/${editingId}`), productData);
                alert('Product Updated!');
            } else {
                productData.createdAt = new Date().toISOString();
                await push(ref(database, 'products'), productData);
                alert('Product Added!');
            }

            cancelEdit(); // Reset form
        } catch (error) {
            console.error(error);
            if (error.message && error.message.includes('Cloud Name is missing')) {
                alert("⚠️ SETUP REQUIRED: You haven't set your Cloudinary Cloud Name yet.\n\nPlease open .env.local and add your Cloud Name to NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME.");
            } else {
                alert('Error: ' + error.message);
            }
        } finally {
            setUploading(false);
        }
    };

    const formatTime = (ts) => {
        if (!ts) return '-';
        return new Date(ts).toLocaleString();
    };

    const pendingCount = orders.filter(o => o.status === 'pending').length;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center bg-white/5 p-6 rounded-2xl border border-white/10 flex-wrap gap-4">
                <div>
                    <h2 className="text-2xl font-display font-bold text-white">Dashboard</h2>
                    <p className="text-gray-400">Store Management System</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="bg-white/10 rounded-lg p-1 flex">
                        <button
                            onClick={() => setView('products')}
                            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${view === 'products' ? 'bg-pink-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            Products
                        </button>
                        <button
                            onClick={() => setView('orders')}
                            className={`px-4 py-2 rounded-md text-sm font-bold transition-all relative ${view === 'orders' ? 'bg-pink-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            Orders
                            {pendingCount > 0 && (
                                <span className="ml-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full shadow-sm">
                                    {pendingCount}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setView('settings')}
                            className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-1 ${view === 'settings' ? 'bg-pink-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            <Settings size={14} /> Only Rates
                        </button>
                    </div>

                    <div className="h-6 w-px bg-white/10 mx-2"></div>

                    <button onClick={handleSeed} className="flex items-center gap-2 text-xs text-gray-400 hover:text-white border border-white/10 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 transition">
                        <Database size={12} />
                        Seed
                    </button>
                    <button
                        onClick={() => signOut(auth)}
                        className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors px-4 py-2"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </div>

            {/* --- SETTINGS VIEW --- */}
            {view === 'settings' && (
                <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 p-8 rounded-2xl">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <DollarSign size={24} className="text-green-400" />
                        Calculator Rates Configuration
                    </h3>
                    <form onSubmit={handleUpdateRates} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-4 bg-black/30 rounded-xl border border-white/5">
                                <label className="block text-sm text-pink-400 font-bold mb-2">5 Days Rate (per Robux)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-gray-500">Rp</span>
                                    <input
                                        type="number"
                                        value={rates.rate5Days}
                                        onChange={(e) => setRates({ ...rates, rate5Days: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-pink-500"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Default: 95</p>
                            </div>
                            <div className="p-4 bg-black/30 rounded-xl border border-white/5">
                                <label className="block text-sm text-violet-400 font-bold mb-2">Gamepass Rate (per Robux)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-gray-500">Rp</span>
                                    <input
                                        type="number"
                                        value={rates.rateGamepass}
                                        onChange={(e) => setRates({ ...rates, rateGamepass: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-violet-500"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Default: 120</p>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-green-900/20"
                        >
                            Save Configuration
                        </button>
                    </form>
                </div>
            )}

            {/* --- ORDERS VIEW --- */}
            {view === 'orders' && (
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Package size={20} className="text-blue-500" />
                        Order Queue
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-400">
                            <thead className="bg-white/5 text-xs uppercase text-gray-300">
                                <tr>
                                    <th className="px-4 py-3">Time</th>
                                    <th className="px-4 py-3">Roblox User</th>
                                    <th className="px-4 py-3">Item</th>
                                    <th className="px-4 py-3">Price</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-4 py-6 text-center text-gray-500">No recent orders found.</td>
                                    </tr>
                                ) : (
                                    orders.map((order) => (
                                        <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="px-4 py-3 font-mono text-xs text-gray-500 whitespace-nowrap">{formatTime(order.createdAt)}</td>
                                            <td className="px-4 py-3 font-bold text-white">{order.username}</td>
                                            <td className="px-4 py-3 text-white">
                                                <div>{order.productName}</div>
                                                <div className="text-xs text-gray-500">{order.category}</div>
                                            </td>
                                            <td className="px-4 py-3 text-pink-400 font-mono whitespace-nowrap">Rp {order.price?.toLocaleString('id-ID')}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.status === 'completed' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300 animate-pulse'}`}>
                                                    {order.status?.toUpperCase() || 'PENDING'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                {order.status !== 'completed' && (
                                                    <button
                                                        onClick={() => handleProcessOrder(order)}
                                                        className="bg-green-600 hover:bg-green-500 text-white text-xs px-3 py-1.5 rounded-lg transition-colors font-bold shadow-lg shadow-green-500/20"
                                                    >
                                                        Process
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* --- PRODUCTS VIEW --- */}
            {view === 'products' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form */}
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl h-fit">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            {editingId ? <Edit2 size={20} className="text-yellow-500" /> : <Plus size={20} className="text-pink-500" />}
                            {editingId ? 'Edit Product' : 'Add New Product'}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Product Name (Amount)</label>
                                <input
                                    type="text"
                                    value={newItem.name}
                                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Price (IDR)</label>
                                <input
                                    type="number"
                                    value={newItem.price}
                                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Category</label>
                                <select
                                    value={newItem.category}
                                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500"
                                >
                                    <option value="Regular">Regular</option>
                                    <option value="Premium">Premium</option>
                                    <option value="Other">Other Products</option>
                                </select>
                            </div>

                            {newItem.category === 'Other' && (
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Required Input Label (e.g. Email, ID)</label>
                                    <input
                                        type="text"
                                        value={newItem.customLabel || ''}
                                        onChange={(e) => setNewItem({ ...newItem, customLabel: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
                                        placeholder="e.g. WhatsApp Number"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Image (Optional)</label>
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-white/10 border-dashed rounded-lg cursor-pointer hover:bg-white/5 transition-colors">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-8 h-8 mb-2 text-gray-400" />
                                            <p className="text-xs text-gray-500">
                                                {newItem.image ? newItem.image.name : 'Click to upload'}
                                            </p>
                                        </div>
                                        <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                                    </label>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={cancelEdit}
                                        className="w-1/3 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 rounded-lg transition-colors flex items-center justify-center"
                                    >
                                        <X size={20} />
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className={`flex-1 ${editingId ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-pink-600 hover:bg-pink-500'} text-white font-bold py-2 rounded-lg transition-colors`}
                                >
                                    {uploading ? 'Processing...' : (editingId ? 'Update Product' : 'Add Product')}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Product List */}
                    <div className="lg:col-span-2 bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Package size={20} className="text-violet-500" />
                            Inventory ({products.length})
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-400">
                                <thead className="bg-white/5 text-xs uppercase text-gray-300">
                                    <tr>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Price</th>
                                        <th className="px-4 py-3">Category</th>
                                        <th className="px-4 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-4 py-6 text-center text-gray-500">No products found.</td>
                                        </tr>
                                    ) : (
                                        products.map((p) => (
                                            <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="px-4 py-3 font-medium text-white">{p.name}</td>
                                                <td className="px-4 py-3">{p.priceDisplay}</td>
                                                <td className="px-4 py-3">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${p.category === 'Premium' ? 'bg-pink-500/20 text-pink-300' :
                                                        p.category === 'Other' ? 'bg-green-500/20 text-green-300' :
                                                            'bg-blue-500/20 text-blue-300'
                                                        }`}>
                                                        {p.category}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => handleEdit(p)}
                                                            className="p-2 hover:bg-yellow-500/20 text-yellow-500 rounded-lg transition-colors"
                                                        >
                                                            <Edit2 size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(p.id)}
                                                            className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
