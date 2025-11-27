"use client";
import { ProductDatas } from "@/app/utils/ProductData";
import { useCart } from "@/app/context/cart-context";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const productId = parseInt(params.id);
  const product = ProductDatas.find((p) => p.id === productId);
  const { addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="mx-4 md:mx-12 max-w-screen-xl lg:mx-auto min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl mb-4 text-[rgba(var(--color-foreground),1)]">
            Product not found
          </p>
          <Link href="/shop">
            <Button variant="outline">Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const allImages = [product.image, ...product.additionalImages];
  const selectedImage = allImages[selectedImageIndex] || product.image;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        title: product.title,
        price: parseFloat(product.price),
        image: product.image,
      });
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="mx-4 md:mx-12 max-w-screen-xl lg:mx-auto py-8 lg:py-16">
      {/* Back Button */}
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 mb-8 text-[rgba(var(--color-foreground),0.7)] hover:text-[rgba(var(--color-foreground),1)] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm tracking-wide">Back to products</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={selectedImage}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Thumbnail Images */}
          {allImages.length > 1 && (
            <div className="flex gap-4 overflow-x-auto">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index
                      ? "border-[rgba(var(--color-foreground),1)]"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-medium mb-4 text-[rgba(var(--color-foreground),1)]">
              {product.title}
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-[rgba(var(--color-foreground),1)]">
              ${product.price} <span className="text-lg">AUD</span>
            </p>
          </div>

          {product.description && (
            <div>
              <p className="text-[rgba(var(--color-foreground),0.7)] leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-[rgba(var(--color-foreground),0.7)]">
              Quantity:
            </span>
            <div className="flex items-center border border-[rgba(var(--color-foreground),0.2)] rounded-lg">
              <button
                onClick={decreaseQuantity}
                className="p-2 hover:bg-[rgba(var(--color-foreground),0.05)] transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 min-w-[3rem] text-center text-[rgba(var(--color-foreground),1)]">
                {quantity}
              </span>
              <button
                onClick={increaseQuantity}
                className="p-2 hover:bg-[rgba(var(--color-foreground),0.05)] transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            className="w-full py-6 text-lg font-medium tracking-wide bg-[rgba(var(--color-foreground),1)] text-[rgba(var(--color-background),1)] hover:opacity-90 transition-opacity"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>

          {/* Additional Info */}
          <div className="pt-6 border-t border-[rgba(var(--color-foreground),0.1)] space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2 text-[rgba(var(--color-foreground),0.7)]">
                Category
              </h3>
              <p className="text-[rgba(var(--color-foreground),1)]">
                {product.category}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
