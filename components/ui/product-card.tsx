import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
    product: {
        id: number;
        title: string;
        price: string | number;
        image: string;
        additionalImages: string[];
        category: string;
    };
}

const ProductCard = ({ product }: ProductCardProps) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <Link href={`/products/${product.id}`} className="mb-3 block group">
            <div
                className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-100"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                {/* Base Image */}
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-opacity duration-300 ease-in-out"
                    style={{ opacity: isHovering ? 0 : 1 }}
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />

                {/* Hover Image */}
                <div
                    className="absolute inset-0 transition-opacity duration-300 ease-in-out"
                    style={{ opacity: isHovering ? 1 : 0 }}
                >
                    <Image
                        src={product.additionalImages?.[0] || product.image}
                        alt={`${product.title} hover`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                </div>
            </div>

            <div className="mt-3 space-y-1 text-[rgba(var(--color-foreground),1)]">
                {product.category && (
                    <p className="text-[0.7rem] uppercase tracking-widest text-[rgba(var(--color-foreground),0.6)]">
                        {product.category}
                    </p>
                )}
                <h3 className="text-sm font-medium tracking-wide text-gray-400 line-clamp-1 group-hover:underline decoration-black decoration-1 underline-offset-4">
                    {product.title}
                </h3>
                <div className="text-sm font-medium text-gray-100">
                    {formatPrice(product.price)}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
