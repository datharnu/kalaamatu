// components/MiniChatbox.tsx
import React, { useState } from "react";
import Image from "next/image";
import logo from "../../../../public/parallel.jpg";
import { CheckCheck } from "lucide-react";
interface MiniChatboxProps {
  onSendMessage: (message: string) => void;
  onClose: () => void;
}

const MiniChatbox: React.FC<MiniChatboxProps> = ({
  onSendMessage,
  onClose,
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage(message);
    setMessage(""); // Clear message after sending
  };

  return (
    <div className="fixed bottom-28  lg:right-24 w-[400px] max-w-[90vw] right-5 bg-WhatsappImg bg-cover bg-[#eae6df]  rounded-3xl shadow-lg z-50">
      <div className="flex items-center justify-between  px-2 py-2 bg-[#075e54] text-white rounded-t-2xl w-full">
        <div className="flex gap-5 items-center">
          <span className="bg-white rounded-full px-5 py-4 relative inline-block">
            <Image src={logo} alt="Whatsapp Logo" width={20} height={20} />
            <div className="w-3 h-3 bg-green-500 rounded-full absolute border-white border bottom-0 right-0"></div>
          </span>

          <div className="flex flex-col">
            <h4 className="text-[15px] font-bold">Kalaamatu</h4>
            <span className="text-[12px]">Typically replies within 1 hour</span>
          </div>
        </div>
        <button onClick={onClose} className="text-2xl mr-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="p-3 h-48  overflow-y-auto">
        {/* Chat content can be dynamically added here */}
        <div className="bg-white h-24 py-2 px-3 w-[60%] mt-2 mx-2 rounded-r-xl rounded-bl-3xl">
          <p className="text-[13px] text-secondary">Kalaamatu</p>
          <span className="text-xs">Hello there! 🤝</span>
          <p className="text-xs">How can we help?</p>
          <div className=" flex justify-end items-center gap-2 pl-1">
            <span className="text-[11px] text-gray-400">18:25</span>
            <CheckCheck className="text-gray-400 w-4" />
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex p-2 rounded-b-3xl  bg-[#f0f0f0]"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-3 text-xs py-2 border border-gray-300 rounded-full"
          required
        />
        <button
          type="submit"
          className=" text-white px-4 py-2 rounded-r-lg  transition"
        >
          <svg focusable="false" viewBox="0 0 24 24" width="35" height="35">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default MiniChatbox;
