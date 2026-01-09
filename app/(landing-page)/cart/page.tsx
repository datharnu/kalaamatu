"use client";
import { useCart } from "@/app/context/cart-context";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax (adjust as needed)
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <div className="mx-4 md:mx-12 max-w-screen-xl lg:mx-auto py-16 min-h-[60vh] flex flex-col items-center justify-center">
        <ShoppingBag className="w-24 h-24 text-[rgba(var(--color-foreground),0.3)] mb-6" />
        <h2 className="text-2xl md:text-3xl font-medium mb-4 text-[rgba(var(--color-foreground),1)]">
          Your cart is empty
        </h2>
        <p className="text-[rgba(var(--color-foreground),0.7)] mb-8 text-center">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link href="/shop">
          <Button className="bg-[rgba(var(--color-foreground),1)] text-[rgba(var(--color-background),1)] hover:opacity-90">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-4 md:mx-12 max-w-screen-xl lg:mx-auto py-8 lg:py-16">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-medium text-[rgba(var(--color-foreground),1)]">
          Shopping Cart
        </h1>
        <p className="text-[rgba(var(--color-foreground),0.7)] mt-2">
          {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 md:gap-6 p-4 border border-[rgba(var(--color-foreground),0.1)] rounded-lg"
            >
              {/* Product Image */}
              <Link
                href={`/products/${item.id}`}
                className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </Link>

              {/* Product Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <Link
                    href={`/products/${item.id}`}
                    className="text-lg font-medium hover:opacity-80 transition-opacity text-[rgba(var(--color-foreground),1)]"
                  >
                    {item.title}
                  </Link>
                  <p className="text-[rgba(var(--color-foreground),0.7)] mt-1">
                    {formatPrice(item.price)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-[rgba(var(--color-foreground),0.2)] rounded-lg">
                    <button
                      onClick={() => {
                        if (item.quantity > 1) {
                          updateQuantity(item.id, item.quantity - 1);
                        } else {
                          removeFromCart(item.id);
                        }
                      }}
                      className="p-2 hover:bg-[rgba(var(--color-foreground),0.05)] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 min-w-[3rem] text-center text-[rgba(var(--color-foreground),1)]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-[rgba(var(--color-foreground),0.05)] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="text-lg font-semibold text-[rgba(var(--color-foreground),1)]">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 hover:bg-[rgba(var(--color-foreground),0.05)] rounded transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Clear Cart Button */}
          {cart.length > 0 && (
            <div className="pt-4">
              <button
                onClick={clearCart}
                className="text-sm text-red-500 hover:underline transition-colors"
              >
                Clear all items
              </button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 border border-[rgba(var(--color-foreground),0.1)] rounded-lg p-6 space-y-6">
            <h2 className="text-xl font-medium text-[rgba(var(--color-foreground),1)]">
              Order Summary
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between text-[rgba(var(--color-foreground),0.7)]">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[rgba(var(--color-foreground),0.7)]">
                <span>Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between text-[rgba(var(--color-foreground),0.7)]">
                <span>Shipping</span>
                <span className="text-sm">Calculated at checkout</span>
              </div>
              <hr className="border-[rgba(var(--color-foreground),0.1)]" />
              <div className="flex justify-between text-lg font-semibold text-[rgba(var(--color-foreground),1)]">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <Link href="/checkout" className="block">
              <Button className="w-full py-6 text-lg font-medium tracking-wide bg-[rgba(var(--color-foreground),1)] text-[rgba(var(--color-background),1)] hover:opacity-90 transition-opacity">
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            <Link
              href="/shop"
              className="block text-center text-sm text-[rgba(var(--color-foreground),0.7)] hover:text-[rgba(var(--color-foreground),1)] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


