"use client";
import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpDown } from 'lucide-react'
import { formatPrice } from '@/lib/utils';
import CloseIcon from "@/components/icons/closenav";
import { Spinner } from "@/components/ui/spinner";
import ProductCard from "@/components/ui/product-card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const ShopPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-4 md:mx-12 max-w-screen-2xl flex justify-center lg:mx-auto pb-20">
      <div className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-center my-8 mb-8 lg:mt-12">
          <p className="text-3xl md:text-2xl text-[rgba(var(--color-foreground),1)]">
            Products
          </p>
          <div className="relative w-full md:w-72 mt-4 md:mt-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search products..."
              className="pl-10 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12">
          {loading ? (
            <div className="col-span-full py-20">
              <Spinner />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-500">No products match "{searchQuery}"</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};



export default ShopPage;
