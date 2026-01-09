"use client";
import React, { useState } from "react";
import Link from "next/link";
import NavbarIcon from "../icons/navbaricon";
import CartIcon from "../icons/carticon";
import AccountIcon from "../icons/accounticon";
import { navlinks } from "@/app/utils/Navlinks";
import { useCart } from "@/app/context/cart-context";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const { cart } = useCart();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleNavbarClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (name: React.SetStateAction<string>) => {
    setActiveLink(name);
    if (isMenuOpen) {
      handleNavbarClick();
    }
  };

  return (
    <>
      {/* Overlay when mobile menu is open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 transition-opacity duration-300"
          onClick={handleNavbarClick}
        />
      )}

      <div className="w-full relative">
        <div className="max-w-screen-xl lg:mx-72 mx-8 flex items-center justify-between mt-5 mb-9">
          <div>
            <NavbarIcon
              className="size-5 lg:hidden cursor-pointer"
              onClick={handleNavbarClick}
            />
            {/* Desktop Navlinks */}
            <div className="hidden lg:flex items-center space-x-8 text-[0.9rem]">
              {navlinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => handleLinkClick(item.name)}
                  className={`
                    relative
                    transition-colors
                    text-[rgba(var(--color-foreground),0.75)]
                    hover:text-[rgba(var(--color-foreground),1)]
                    group
                    py-2
                    ${activeLink === item.name
                      ? "text-[rgba(var(--color-foreground),1)]"
                      : ""
                    }
                  `}
                >
                  {item.name}
                  <span
                    className={`
                      absolute
                      bottom-0
                      left-0
                      w-full
                      h-0.5
                      bg-[rgba(var(--color-foreground),1)]
                      transform
                      origin-left
                      transition-transform
                      duration-300
                      ${activeLink === item.name ? "scale-x-100" : "scale-x-0"}
                      group-hover:scale-x-100
                    `}
                  ></span>
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <AccountIcon className="size-5 hidden md:block" />
            <Link href="/cart" className="relative">
              <CartIcon className="size-10" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount > 9 ? "9+" : cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
        {/* <hr className="border-gray-200" /> */}

        {/* Mobile Menu - Sliding from left */}
        <div
          className={`
            fixed 
            top-40 
            left-0 
            h-full 
            w-full 
            bg-[rgba(var(--color-background),1)]
            z-50 
            transform 
            transition-transform 
            duration-300 
            ease-in-out
            ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* Mobile Menu Header */}
          <div className="p-4  flex justify-between items-center"></div>

          {/* Mobile Menu Links */}
          <div className="py-4">
            {navlinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => handleLinkClick(item.name)}
                className={`
                  block
                  px-4
                  py-2
                  text-[1.1rem]
                  transition-colors
                  text-[rgba(var(--color-foreground),1)]
                  hover:text-[rgba(var(--color-foreground),0.75)]
                  
                  ${activeLink === item.name
                    ? "text-[rgba(var(--color-foreground),1)] bg-[#e1d9d9] bg-opacity-15"
                    : ""
                  }
                `}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
      <hr className="my-2 border-gray-200" />
    </>
  );
}
