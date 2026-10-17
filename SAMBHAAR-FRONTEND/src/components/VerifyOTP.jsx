import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // HTTP client to interact with your backend

// Configuration for translations with specific alignments and positions
const translations = [
  { text: "Welcome", style: { top: "90%", right: "10%", textAlign: "left" } },
  { text: "Welcome", style: { top: "10%", left: "75%", textAlign: "left" } },
  { text: "வணக்கம்", style: { top: "12%", left: "13%", textAlign: "center" } },
  { text: "வணக்கம்", style: { top: "25%", right: "8%", textAlign: "right" } },
  { text: "வணக்கம்", style: { top: "90%", left: "5%", textAlign: "left" } },
  { text: "வணக்கம்", style: { top: "45%", right: "5%", textAlign: "right" } },
  { text: "வணக்கம்", style: { top: "55%", left: "5%", textAlign: "right" } },
  { text: "स्वागत है", style: { top: "35%", left: "30%", textAlign: "center" } },
  { text: "स्वागत है", style: { top: "65%", right: "20%", textAlign: "center" } },
  { text: "ಸ್ವಾಗತ", style: { top: "23%", left: "10%", textAlign: "right" } },
  { text: "ಸ್ವಾಗತ", style: { top: "81%", right: "30%", textAlign: "right" } },
  { text: "స్వాగతం", style: { top: "20%", left: "40%", textAlign: "left" } },
  { text: "స్వాగతం", style: { top: "85%", left: "35%", textAlign: "left" } },
  { text: "സ്വാഗതം", style: { top: "5%", left: "45%", textAlign: "center" } },
  { text: "സ്വാഗതം", style: { bottom: "25%", right: "40%", textAlign: "center" } },
  { text: "Namaste", style: { top: "30%", left: "60%", textAlign: "right" } },
  { text: "Namaste", style: { bottom: "30%", left: "25%", textAlign: "right" } },
];

const VerifyOTP = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  // Verify OTP
  const verifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:4000/verify-otp", {
        email,
        otp,
      });
      setMessage(response.data.message);
      setUser(response.data.user);
    } catch (error) {
      setMessage("Invalid or expired OTP.");
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Left Section (Branding/Background) */}
      <div className="relative overflow-hidden md:flex w-full md:w-1/2 justify-around items-center bg-gradient-to-r from-orange-600 to-orange-400 hidden">
        <Link to="/" className="absolute top-6 left-6 z-50">
          <img
            src="/sambhaar.png"
            alt="Sambhaar Logo"
            className="h-8 md:h-12"
          />
        </Link>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-white font-bold text-4xl md:text-5xl mb-4">
            Sambhaar.com
          </h1>
          <p className="text-white text-lg text-center md:text-left">
            Your Trusted Source for Everyday Groceries
          </p>
        </div>
        {/* Render Translations Dynamically */}
        {translations.map((translation, index) => (
          <span
            key={index}
            className="absolute text-white font-bold text-md"
            style={translation.style} // Apply specific position and alignment
          >
            {translation.text}
          </span>
        ))}
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>

      {/* Right Section (Form) */}
      <div className="flex justify-center py-10 px-6 md:px-10 items-center bg-white w-full h-screen md:w-1/2">
        <div className="space-y-5 max-w-sm mx-auto pt-8 w-full">
          <h1 className="text-gray-800 font-bold text-2xl mb-1 text-center">
            Verify Your Email
          </h1>
          <p className="text-gray-600 text-sm sm:text-base font-normal mb-7 text-center">
            Enter your email and OTP to verify your account
          </p>

          {/* Email Input */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full bg-gray-100 px-5 py-3 rounded-full border-2 border-gray-300 focus:outline-none focus:border-orange-400 focus:ring-0.5 focus:ring-orange-400 transition"
          />

          {/* OTP Input */}
          <input
            type="text"
            name="otp"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
            className="w-full bg-gray-100 px-5 py-3 rounded-full border-2 border-gray-300 focus:outline-none focus:border-orange-400 focus:ring-0.5 focus:ring-orange-400 transition"
          />

          {/* Verify OTP Button */}
          <button
            onClick={verifyOtp}
            className="w-full mt-5 text-white font-medium py-3 rounded-md bg-gradient-to-r from-orange-600 to-orange-400 hover:opacity-90 transition"
          >
            Verify OTP
          </button>

          {/* Message display */}
          {message && <p className="text-center text-red-500">{message}</p>}

          <p className="my-5 italic text-sm text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-600 font-semibold underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
