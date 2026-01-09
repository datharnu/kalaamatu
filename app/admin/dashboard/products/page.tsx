'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/lib/utils';
import api from '@/lib/api';
import ProductModal from '@/components/admin/ProductModal';

interface Product {
    id: number;
    title: string;
    price: string;
    description: string;
    category: string;
    image: string;
    additionalImages: string[];
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await api.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/products/${id}`);
                fetchProducts(); // Refresh list
            } catch (error) {
                console.error('Failed to delete product:', error);
                alert('Failed to delete product');
            }
        }
    };

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setSelectedProduct(null);
        setIsModalOpen(true);
    };

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                    <p className="text-gray-500 mt-1">Manage your store inventory</p>
                </div>
                <Button onClick={handleCreate} className="bg-black text-white hover:bg-gray-800">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                </Button>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder="Search products..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                {/* Could add category filter here */}
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm h-80 animate-pulse">
                            <div className="bg-gray-200 h-48 rounded-md mb-4"></div>
                            <div className="bg-gray-200 h-4 w-3/4 mb-2 rounded"></div>
                            <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {filteredProducts.map((product) => (
                        <motion.div
                            key={product.id}
                            variants={item}
                            className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                        >
                            <div className="relative aspect-square overflow-hidden bg-gray-100">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium uppercase tracking-wide">
                                    {product.category}
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-gray-900 line-clamp-1" title={product.title}>{product.title}</h3>
                                    <span className="font-bold text-gray-900">{formatPrice(product.price)}</span>
                                </div>
                                <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10">
                                    {product.description}
                                </p>

                                <div className="flex gap-2 pt-2 border-t border-gray-100">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 hover:bg-gray-50 text-gray-700"
                                        onClick={() => handleEdit(product)}
                                    >
                                        <Pencil className="w-3 h-3 mr-2" />
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 hover:bg-red-50 text-red-600 hover:text-red-700 hover:border-red-200"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        <Trash2 className="w-3 h-3 mr-2" />
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {filteredProducts.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-full flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/50"
                        >
                            <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">No products found</h3>
                            <p className="text-gray-500 mt-1 max-w-sm">
                                {searchQuery ? `No products match "${searchQuery}"` : "Get started by adding your first product to the inventory."}
                            </p>
                            {!searchQuery && (
                                <Button onClick={handleCreate} className="mt-4 bg-black text-white hover:bg-gray-800">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Product
                                </Button>
                            )}
                        </motion.div>
                    )}
                </motion.div>
            )}

            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={selectedProduct}
                onSuccess={fetchProducts}
            />
        </div>
    );
}
