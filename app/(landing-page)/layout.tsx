"use client";
import Navbar from "@/components/shared/navbar";
import React, { useState } from "react";
import { CartProvider } from "../context/cart-context";
import MiniChatbox from "./home/components/minichatbox";

export default function LandingPagelayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showChatbox, setShowChatbox] = useState(false);

  const handleSendMessage = (message: string) => {
    const phoneNumber = "+2349065434849"; // Replace with your actual WhatsApp number
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.location.href = url;
  };

  return (
    <CartProvider>
      <Navbar />
      <main className="bg-slate-100 pb-10">{children}</main>
      <div className="fixed bottom-10 right-10">
        <a
          href="#"
          id="whatsapp-button"
          className="floating-button my-3 lg:my-10 lg:mx-6 "
          onClick={(e) => {
            e.preventDefault();
            setShowChatbox(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="green"
          >
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z" />
          </svg>
        </a>
        {showChatbox && (
          <MiniChatbox
            onSendMessage={handleSendMessage}
            onClose={() => setShowChatbox(false)}
          />
        )}
      </div>
    </CartProvider>
  );
}
