import React from "react";
import qrImage from "./../../assets/QR_Scanner.png";

import phonepe from "../../assets/phonepe.png";
import upi from "../../assets/upi.png";
import bhim from "../../assets/bhim.png";

const PaymentModal = ({ isOpen, onClose, total }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-md w-[90%] max-w-lg">
        <img src={phonepe} alt="phonepe" className="w-full h-28 object-contain" />
        <h2 className="text-base font-semibold mb-2 text-center">
          Scan & pay with any UPI - <span className="text-2xl"> ₹ {total.toFixed(2)}</span>
        </h2>
        <div className="flex justify-center">
          <img
            src={qrImage}
            alt="QR Code"
            className="w-58 h-72 object-contain"
          />
        </div>
        <h2 className="text-xs font-medium mb-2 text-center">
          UPI ID - Q965702469@ybl
        </h2>
        <div className="flex justify-center mx-auto w-40 ">
          <img src={bhim} alt="bhim" className="w-full h-8 object-contain" />
          <img src={upi} alt="upi" className="w-full h-8 object-contain" />
        </div>
        <p className="text-center mt-2">
          Please share the payment screenshot to this WhatsApp number: <span>8825545956</span>. Thank you!
        </p>
        <button
          className="mt-6 w-full bg-primary text-white px-4 py-2 rounded"
          onClick={onClose} // Trigger onClose to notify parent component
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
