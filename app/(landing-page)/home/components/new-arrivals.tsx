"use client";
import { ProductDatas } from "@/app/utils/ProductData";
import React, { useState } from "react";
import Image from "next/image";

const NewArrivals = () => {
  return (
    <div className="mx-4 md:mx-12 max-w-screen-lg flex justify-center lg:mx-auto">
      <div>
        <p className="text-xl md:text-2xl my-8 lg:mt-12 text-[rgba(var(--color-foreground),1)]">
          New Arrivals
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 md:gap-2">
          {ProductDatas.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product }: any) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="mb-3">
      <div
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Base Image */}
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={400}
          className="transition-opacity duration-300 ease-in-out"
          style={{ opacity: isHovering ? 0 : 1 }}
        />

        {/* Hover Image */}
        {isHovering && (
          <Image
            src={product.additionalImages[0] || product.image}
            alt={`${product.title} hover`}
            width={400}
            height={400}
            className="absolute top-0 left-0 transition-opacity duration-300 ease-in-out"
          />
        )}
      </div>
      <div className="mt-3 space-y-2 text-[rgba(var(--color-foreground),1)]">
        <p className="text-[0.8rem] tracking-wider">{product.title}</p>
        <p>
          ₦{product.price} <span>NGN</span>
        </p>
      </div>
    </div>
  );
};

export default NewArrivals;
