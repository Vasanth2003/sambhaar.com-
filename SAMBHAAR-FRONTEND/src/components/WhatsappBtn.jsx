import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsappButton = () => {
  return (
    <a
      href="https://wa.me/918181812912"
      target="_blank"
      rel="noopener noreferrer"
      className="hidden sm:block fixed bottom-6 right-6 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition z-10 animate-jump"
    >
      <FaWhatsapp size={24} />
    </a>
  );
};

export default WhatsappButton;
