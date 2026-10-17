import React, { useState } from "react";
import {
  useRequestPasswordResetMutation,
  useResetPasswordMutation,
} from "./../redux/features/auth/authApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const translations = [
  { text: "Welcome", style: { top: "90%", right: "10%", textAlign: "left" } },
  { text: "Welcome", style: { top: "10%", left: "75%", textAlign: "left" } },
  { text: "வணக்கம்", style: { top: "12%", left: "13%", textAlign: "center" } },
  { text: "வணக்கம்", style: { top: "25%", right: "8%", textAlign: "right" } },
  { text: "வணக்கம்", style: { top: "90%", left: "5%", textAlign: "left" } },
  { text: "வணக்கம்", style: { top: "45%", right: "5%", textAlign: "right" } },
  { text: "வணக்கம்", style: { top: "55%", left: "5%", textAlign: "right" } },
  {
    text: "स्वागत है",
    style: { top: "35%", left: "30%", textAlign: "center" },
  },
  {
    text: "स्वागत है",
    style: { top: "65%", right: "20%", textAlign: "center" },
  },
  { text: "ಸ್ವಾಗತ", style: { top: "23%", left: "10%", textAlign: "right" } },
  { text: "ಸ್ವಾಗತ", style: { top: "81%", right: "30%", textAlign: "right" } },
  { text: "స్వాగతం", style: { top: "20%", left: "40%", textAlign: "left" } },
  { text: "స్వాగతం", style: { top: "85%", left: "35%", textAlign: "left" } },
  { text: "സ്വാഗതം", style: { top: "5%", left: "45%", textAlign: "center" } },
  {
    text: "സ്വാഗതം",
    style: { bottom: "25%", right: "40%", textAlign: "center" },
  },
  { text: "Namaste", style: { top: "30%", left: "60%", textAlign: "right" } },
  {
    text: "Namaste",
    style: { bottom: "30%", left: "25%", textAlign: "right" },
  },
];

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [step, setStep] = useState(1);

  const [requestPasswordReset, { isLoading: isRequestLoading }] =
    useRequestPasswordResetMutation();
  const [resetPassword, { isLoading: isResetLoading }] =
    useResetPasswordMutation();

  const handleRequestReset = async (e) => {
    e.preventDefault();
    try {
      const response = await requestPasswordReset({ email }).unwrap();
      console.log(response);
      
      toast.success(response.message);
      setStep(2);
    } catch (error) {
      console.log(error);
      
      toast.error(error.data?.message || "Error requesting password reset");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPassword({
        token: resetToken,
        newPassword,
      }).unwrap();
      toast.success(response.message);
      setStep(3);
    } catch (error) {
      toast.error(error.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Left Section (Branding/Background) */}
      <div className="relative overflow-hidden md:flex w-full md:w-1/2 justify-around items-center bg-gradient-to-r from-orange-600 to-orange-400 hidden">
        <Link to="/" className="absolute top-6 left-6 z-50">
          <img src="/sambhaar.png" alt="Logo" className="h-8 md:h-12" />
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
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 border-opacity-30 border-t-8 border-t-primary-dark rounded-full animate-spin-clockwise"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 border-opacity-30 border-t-8 border-t-primary-dark rounded-full animate-spin-anticlockwise"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 border-opacity-30 border-t-8 border-t-primary-dark rounded-full animate-spin-clockwise"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 border-opacity-30 border-t-8 border-t-primary-dark rounded-full animate-spin-anticlockwise"></div>
      </div>

      {/* Right Section (Form) */}
      <div className="flex justify-center py-10 px-6 md:px-10 items-center bg-white w-full h-screen md:w-1/2">
        <div className="space-y-5 max-w-sm mx-auto pt-8 w-full">
          {step === 1 && (
            <>
              <h1 className="text-gray-800 font-bold text-2xl mb-1 text-center">
                Forgot Password...!?
              </h1>
              <p className="text-sm sm:text-base font-normal text-gray-600 mb-7 text-center">
                Enter your registered email to receive an OTP.
              </p>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-full border-2 border-gray-300 focus:border-blue-400 focus:ring-0.5 focus:ring-blue-400 transition"
              />
              <button
                onClick={handleRequestReset}
                className="w-full mt-5 text-white font-medium py-3 rounded-md bg-gradient-to-r from-orange-600 to-orange-400 hover:opacity-90 transition"
                disabled={isRequestLoading}
              >
                {isRequestLoading ? "Requesting..." : "Request Reset"}
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-gray-800 font-bold text-2xl mb-1 text-center">
                Reset Your Password
              </h1>
              <p className="text-sm sm:text-base font-normal text-gray-600 mb-7 text-center">
                Enter the token sent to your email and your new password.
              </p>
              <input
                type="text"
                placeholder="Enter OTP"
                value={resetToken}
                onChange={(e) => setResetToken(e.target.value)}
                required
                className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-full border-2 border-gray-300 focus:border-blue-400 focus:ring-0.5 focus:ring-blue-400 transition"
              />
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-full border-2 border-gray-300 focus:border-blue-400 focus:ring-0.5 focus:ring-blue-400 transition"
                />
                <span
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <button
                onClick={handleResetPassword}
                className="w-full mt-5 text-white font-medium py-3 rounded-md bg-gradient-to-r from-orange-600 to-orange-400 hover:opacity-90 transition"
                disabled={isResetLoading}
              >
                {isResetLoading ? "Resetting..." : "Reset Password"}
              </button>
            </>
          )}

          {step === 3 && (
            <div className="text-center">
              <h1 className="text-gray-800 font-bold text-2xl mb-4">
                Password Reset Successful!
              </h1>
              <p className="text-sm sm:text-base font-normal text-gray-600 mb-4">
                You can now log in with your new password.
              </p>
              <button
                onClick={() => (window.location.href = "/login")}
                className="w-full mt-5 text-white font-medium py-3 rounded-md bg-gradient-to-r from-orange-600 to-orange-400 hover:opacity-90 transition"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
