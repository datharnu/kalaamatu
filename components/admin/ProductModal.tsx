'use client';

import { useState, useEffect } from 'react';
import { Loader2, Plus, Trash, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import api from '@/lib/api';

interface Product {
    id?: number;
    title: string;
    price: string;
    description: string;
    category: string;
    image: string | File;
    additionalImages: (string | File)[];
}

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product?: Product | null;
    onSuccess: () => void;
}

const CATEGORIES = [
    'Knee length',
    'Brand new',
    'Thrift',
    'Ankle boots',
    'Winter jackets',
    'Winter boots',
    'Thigh high',
    'Thermal socks',
    'Head warmer',
    'Leather items',
];

export default function ProductModal({ isOpen, onClose, product, onSuccess }: ProductModalProps) {
    const [formData, setFormData] = useState<Product>({
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
        additionalImages: [],
    });
    const [imagePreview, setImagePreview] = useState<string>('');
    const [additionalPreviews, setAdditionalPreviews] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (product) {
            setFormData({
                title: product.title,
                price: product.price,
                description: product.description,
                category: product.category,
                image: product.image,
                additionalImages: product.additionalImages || [],
            });
            setImagePreview(typeof product.image === 'string' ? product.image : '');
            setAdditionalPreviews(
                (product.additionalImages || []).filter((img): img is string => typeof img === 'string')
            );
        } else {
            setFormData({
                title: '',
                price: '',
                description: '',
                category: '',
                image: '',
                additionalImages: [],
            });
            setImagePreview('');
            setAdditionalPreviews([]);
        }
        setError('');
    }, [product, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Basic validation
            if (!formData.title || !formData.price || !formData.category) {
                setError('Please fill in all required fields.');
                setLoading(false);
                return;
            }
            if (!product?.id && !formData.image) {
                setError('Main image is required.');
                setLoading(false);
                return;
            }

            const data = new FormData();
            data.append('title', formData.title);
            data.append('price', formData.price);
            data.append('description', formData.description);
            data.append('category', formData.category);

            if (formData.image instanceof File) {
                data.append('image', formData.image);
            } else if (typeof formData.image === 'string' && formData.image) {
                // If checking for existing image consistency could be needed
                // But generally we only want files
            }

            formData.additionalImages.forEach((img) => {
                if (img instanceof File) {
                    data.append('additionalImages', img);
                } else if (typeof img === 'string') {
                    // Send existing URL as additionalImages (backend needs to handle string array)
                    // If we used the logic I updated in backend:
                    // if Array that's not files, it uses it as URLs.
                    data.append('additionalImages', img);
                }
            });

            if (product?.id) {
                await api.put(`/products/${product.id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await api.post('/products', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            onSuccess();
            onClose();
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.error || 'Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData({ ...formData, image: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleAdditionalFileAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            const newPreviews = newFiles.map(file => URL.createObjectURL(file));

            setFormData({
                ...formData,
                additionalImages: [...formData.additionalImages, ...newFiles]
            });
            setAdditionalPreviews([...additionalPreviews, ...newPreviews]);
        }
    };

    const handleImageRemove = (index: number) => {
        const newImages = formData.additionalImages.filter((_, i) => i !== index);
        const newPreviews = additionalPreviews.filter((_, i) => i !== index);
        setFormData({ ...formData, additionalImages: newImages });
        setAdditionalPreviews(newPreviews);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[900px] bg-white">
                <DialogHeader>
                    <DialogTitle>{product?.id ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                    <DialogDescription>
                        {product?.id ? 'Update product details below.' : 'Fill in the details to create a new product.'}
                    </DialogDescription>
                </DialogHeader>

                {error && (
                    <div className="p-3 bg-red-50 text-red-500 text-sm rounded-md border border-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                        {/* Left Column: Images */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="image">Main Image URL</Label>
                                <div className="relative aspect-square w-full rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center overflow-hidden">
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://placehold.co/400?text=Invalid+Image';
                                            }}
                                        />
                                    ) : (
                                        <div className="text-center p-4 text-gray-400">
                                            <Upload className="mx-auto h-8 w-8 mb-2" />
                                            <span className="text-sm">Image Preview</span>
                                        </div>
                                    )}
                                </div>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    required={!product} // Required only for new products
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Additional Images</Label>
                                <div className="flex flex-wrap gap-2">
                                    {additionalPreviews.map((img, index) => (
                                        <div key={index} className="relative group w-20 h-20 rounded-md border overflow-hidden bg-gray-50">
                                            <img src={img} alt={`Extra ${index}`} className="w-full h-full object-cover" />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute top-0 right-0 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => handleImageRemove(index)}
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    ))}
                                    <Label htmlFor="additional-images" className="cursor-pointer">
                                        <div className="w-20 h-20 rounded-md border border-dashed flex items-center justify-center hover:bg-gray-50 transition-colors">
                                            <Plus className="h-6 w-6 text-gray-400" />
                                        </div>
                                        <Input
                                            id="additional-images"
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="hidden"
                                            onChange={handleAdditionalFileAdd}
                                        />
                                    </Label>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Details */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Product Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g. Winter Jacket"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price (₦)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        placeholder="0.00"
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select
                                        value={formData.category}
                                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {CATEGORIES.map((cat) => (
                                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Enter product description..."
                                    className="min-h-[150px]"
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                'Save Product'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
