import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify components
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import {
  useRegisterUserMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
} from "../redux/features/auth/authApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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

const Register = () => {
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // Changed mobileNumber to phoneNumber
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [role, setRole] = useState("user"); // New role state
  const [isResending, setIsResending] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [registerUser, { isLoading: isRegisterLoading }] =
    useRegisterUserMutation();
  const [verifyOtp, { isLoading: isOtpLoading }] = useVerifyOtpMutation();
  const [resendOtp] = useResendOtpMutation();

  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const data = { username, email, password, phoneNumber, role }; 
    try {
      
      await registerUser(data).unwrap();
      setStep(2);
      
      setMessage("OTP sent successfully. Please verify your email.");
    } catch (error) {
      console.error("Registration failed:", error?.data || error);
      
      setMessage("Failed to send OTP, Check whether the account is already registered. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      
      const response = await verifyOtp({ email, otp }).unwrap();
      console.log(response);
      
      setMessage(response.message);
      toast.success("Account verified successfully. Redirecting to login...", {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setMessage("Invalid or expired OTP. Please try again.");
      toast.error("OTP verification failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      await resendOtp({ email }).unwrap();
      setMessage("OTP resent successfully. Check your email.");
      toast.info("OTP resent successfully. Check your email.", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      setMessage("Failed to resend OTP. Please try again.");
    } finally {
      setIsResending(false);
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
          {/* Registration Form */}
          {step === 1 ? (
            <>
              <h1 className="text-gray-800 font-bold text-2xl mb-1 text-center">
                Register now!
              </h1>
              <p className="text-sm sm:text-base font-normal text-gray-600 mb-7 text-center">
                Enter your information to register
              </p>
              <input
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                name="username"
                id="username"
                placeholder="User Name"
                required
                className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-full border-2 border-gray-300 focus:border-primary focus:ring-0.5 focus:ring-orange-400 transition"
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                name="email"
                id="email"
                placeholder="Email Address"
                required
                className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-full border-2 border-gray-300 focus:border-primary focus:ring-0.5 focus:ring-orange-400 transition"
              />
              <input
                type="number"
                placeholder="Enter your phone number" // Changed mobileNumber to phoneNumber
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)} // Changed mobileNumber to phoneNumber
                required
                className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-full border-2 border-gray-300 focus:border-primary focus:ring-0.5 focus:ring-orange-400 transition"
              />
              <div className="relative">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  required
                  className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-full border-2 border-gray-300 focus:border-primary focus:ring-0.5 focus:ring-orange-400 transition"
                />
                <span
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {message && <p className="text-red-500 text-center">{message}</p>}
              <button
                onClick={handleSendOtp}
                className="w-full mt-5 text-white font-medium py-3 rounded-md bg-gradient-to-r from-orange-600 to-orange-400 hover:opacity-90 transition"
                disabled={isRegisterLoading}
              >
                {isRegisterLoading ? "Sending OTP..." : "Send OTP"}
              </button>
              <p className="my-5 italic text-sm text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-orange-600 font-semibold underline"
                >
                  Login
                </Link>
              </p>
            </>
          ) : (
            /* OTP Verification Form */
            <>
              <h1 className="text-gray-800 font-bold text-2xl mb-1 text-center">
                Verify Your Email
              </h1>
              <p className="text-gray-600 text-sm sm:text-base font-normal mb-7 text-center">
                Enter the OTP sent to your email to verify your account
              </p>
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
              <p
                onClick={handleResendOtp}
                className={`mt-3 text-right text-sm text-orange-600 font-medium cursor-pointer ${
                  isResending
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:underline"
                }`}
              >
                {isResending ? "Resending OTP..." : "Resend OTP"}
              </p>
              <button
                onClick={handleVerifyOtp}
                className="w-full mt-5 text-white font-medium py-3 rounded-md bg-gradient-to-r from-orange-600 to-orange-400 hover:opacity-90 transition"
                disabled={isOtpLoading}
              >
                {isOtpLoading ? "Verifying..." : "Verify OTP"}
              </button>
              {message && <p className="text-center text-red-500">{message}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
