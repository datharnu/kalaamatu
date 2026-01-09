"use client";
import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from '@/lib/utils';
import { Spinner } from "@/components/ui/spinner";
import ProductCard from "@/components/ui/product-card";

const NewArrivals = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        // Just take the first 4 for new arrivals
        setProducts(response.data.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="mx-4 md:mx-12 max-w-screen-lg flex  justify-center lg:mx-auto">
      <div className="w-full">
        <p className="text-xl md:text-2xl my-8 lg:mt-12 text-[rgba(var(--color-foreground),1)]">
          New Arrivals
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3 md:gap-x-8 md:gap-y-12">
          {loading ? (
            <div className="col-span-full py-20">
              <Spinner />
            </div>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};



export default NewArrivals;
