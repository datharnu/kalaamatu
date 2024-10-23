"use client";
import { ProductDatas } from "@/app/utils/ProductData";
import React, { useState } from "react";
import Image from "next/image";
import { MoveRight, SlidersHorizontal, X } from "lucide-react";
import CloseIcon from "@/components/icons/closenav";

const ShopPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  return (
    <div className="mx-4 md:mx-12 max-w-screen-lg flex justify-center lg:mx-auto ">
      <div>
        <p className="text-3xl md:text-2xl my-8 mb-16 lg:mt-12 text-[rgba(var(--color-foreground),1)]">
          Products
        </p>

        <button
          className="my-4 flex items-center gap-3 hover:opacity-80 transition-opacity"
          onClick={handleFilterClick}
        >
          <SlidersHorizontal className="w-4  text-black/80" />

          <p className="text-black/80 tracking-wide text-[0.9rem]">
            Filter and sort
          </p>
        </button>

        {/* Overlay */}
        {isFilterOpen && (
          <div
            className="fixed inset-0 bg-[#76513e]/40 z-40"
            onClick={handleFilterClick}
          />
        )}

        {/* Filter Sidebar */}
        {isFilterOpen && (
          <div
            className={`fixed 
            top-0
            right-0 
            h-full 
            w-[85vw] 
          bg-[#FFFBF9] 
            z-50 
            transform 
            transition-transform 
            duration-300 
            ease-in-out
            ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            {/* Filter options go here */}
            <div className="">
              <div className="flex justify-center py-2">
                <div className="text-center">
                  <p className="text-[rgba(var(--color-foreground),1)] tracking-wide text-[0.9rem]">
                    Filter and sort
                  </p>
                  <p className="text-[rgba(var(--color-foreground),0.7)] text-[0.8rem] tracking-wide ">
                    5 products
                  </p>
                </div>
                <button
                  className="absolute right-4 mt-1"
                  onClick={handleFilterClick}
                >
                  <CloseIcon className="" />
                </button>
              </div>
              <hr className="text-[rgba(var(--color-foreground),1)]  mb-5" />

              {/* Add filter options */}
              <div className="mx-5  space-y-8 mt-10 ">
                {/* Add availability filter */}
                <button className="flex items-center justify-between w-full">
                  <p className="text-[rgba(var(--color-foreground),0.7)] text-[15px] tracking-wider ">
                    Availability
                  </p>
                  <MoveRight className="w-4 text-[rgba(var(--color-foreground),0.6)] " />
                </button>
                {/* Add price filter */}
                <button className="flex items-center justify-between w-full">
                  <p className="text-[rgba(var(--color-foreground),0.7)] text-[15px] tracking-wider ">
                    Price
                  </p>
                  <MoveRight className="w-4 text-[rgba(var(--color-foreground),0.6)] " />
                </button>
                {/* Add price range filter */}
              </div>
            </div>
          </div>
        )}

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
  return (
    <div className="mb-3">
      <div className="relative">
        {/* Base Image */}
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={400}
          className="transition-opacity duration-300 ease-in-out"
        />

        <Image
          src={product.additionalImages[0] || product.image}
          alt={`${product.title} hover`}
          width={400}
          height={400}
          className="absolute top-0 left-0 transition-opacity duration-300 ease-in-out"
        />
      </div>
      <div className="mt-3 space-y-2 text-[rgba(var(--color-foreground),1)]">
        <p className="text-[0.8rem] tracking-wider">{product.title}</p>
        <p>
          ${product.price} <span>AUD</span>
        </p>
      </div>
    </div>
  );
};

export default ShopPage;
