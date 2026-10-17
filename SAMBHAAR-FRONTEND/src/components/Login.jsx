  import React, { useState, useEffect } from "react";
  import { useDispatch } from "react-redux";
  import { Link, useNavigate } from "react-router-dom";
  import {
    useSendSmsOtpMutation,
    useVerifySmsOtpMutation,
  } from "../redux/features/auth/authApi";
  import { setUser } from "../redux/features/auth/authSlice";
  import { toast, ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";

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

  const Login = () => {
    const [number, setNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [openEnterOtp, setOpenEnterOtp] = useState(false);
    const [timer, setTimer] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [sendOtp, { isLoading: sending }] =
      useSendSmsOtpMutation();
    const [verifyOtp, { isLoading: verifying }] =
      useVerifySmsOtpMutation();

    // ⏳ TIMER (resend cooldown)
    useEffect(() => {
      let interval;
      if (timer > 0) {
        interval = setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
      }
      return () => clearInterval(interval);
    }, [timer]);

    // 📩 SEND OTP
    const handleSendOtp = async (e) => {
      e.preventDefault();
        // setTimeout(() => navigate("/"), 1500);
      
      
      if (number.length !== 10) {
        return toast.error("Enter valid mobile number");
      }

      try {
        
        await sendOtp({ number }).unwrap();
        // console.log(number);
        toast.success("OTP sent successfully");

        setOpenEnterOtp(true);
        setTimer(30); // start resend timer
        setOtp("");
      } catch (error) {
        toast.error("Failed to send OTP");
      }
    };

    // 🔁 RESEND OTP
    const handleResendOtp = async () => {
  if (timer > 0) {
    return toast.error("Please wait before requesting again");
  }
      try {
        await sendOtp({ number }).unwrap();
        toast.success("OTP resent");
        setTimer(30);
      } catch {
        toast.error("Failed to resend OTP");
      }
    };

    // ✅ VERIFY OTP
    const handleVerifyOtp = async (e) => {
      e.preventDefault();

      if (otp.length < 4) {
        return toast.error("Enter valid OTP");
      }

      try {
        console.log(number,otp);
        
        const res = await verifyOtp({ number, otp }).unwrap();
        console.log(`Login: ${res.user}`);
        
        dispatch(setUser({ user: res.user }));

        toast.success("Login successful!");

        setTimeout(() => navigate("/"), 1500);
      } catch (error) {
        console.log(error);
        
        toast.error("Invalid or expired OTP");
      }
    };

    return (
      <div className="h-screen flex flex-col md:flex-row">
        {/* LEFT SIDE */}
        {/* <div className="relative overflow-hidden w-full md:w-1/2 justify-around items-center bg-gradient-to-r from-orange-600 to-orange-400 md:block hidden">
          <Link to="/" className="absolute top-6 left-6 z-50">
            <img src="/sambhaar.png" alt="Logo" className="h-8 md:h-12" />
          </Link>

          <div className="flex flex-col justify-center items-center">
            <h1 className="text-white font-bold text-4xl md:text-5xl mb-4">
              Sambhaar.com
            </h1>
            <p className="text-white text-lg text-center">
              Fresh Finds for Your Pantry and Home
            </p>
          </div>

          {translations.map((t, i) => (
            <span
              key={i}
              className="absolute text-white font-bold"
              style={t.style}
            >
              {t.text}
            </span>
          ))}
        </div> */}

        <div className="relative overflow-hidden md:flex w-full md:w-1/2 justify-around items-center bg-gradient-to-r from-orange-600 to-orange-400 md:block hidden">
  <Link to="/" className="absolute top-6 left-6 z-50">
    <img src="/sambhaar.png" alt="Logo" className="h-8 md:h-12" />
  </Link>

  <div className="flex flex-col justify-center items-center">
    <h1 className="text-white font-bold text-4xl md:text-5xl mb-4">
      Sambhaar.com
    </h1>
    <p className="text-white font-normal text-lg text-center md:text-left">
      Fresh Finds for Your Pantry and Home
    </p>
  </div>

  {/* Floating Translations */}
  {translations.map((t, i) => (
    <span
      key={i}
      className="absolute text-white font-bold text-md"
      style={t.style}
    >
      {t.text}
    </span>
  ))}

  {/* Animated Circles */}
  <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 border-opacity-30 border-t-8 border-t-primary-dark rounded-full animate-spin-clockwise"></div>
  <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 border-opacity-30 border-t-8 border-t-primary-dark rounded-full animate-spin-anticlockwise"></div>
  <div className="absolute -top-40 -right-0 w-80 h-80 border-4 border-opacity-30 border-t-8 border-t-primary-dark rounded-full animate-spin-clockwise"></div>
  <div className="absolute -top-20 -right-20 w-80 h-80 border-4 border-opacity-30 border-t-8 border-t-primary-dark rounded-full animate-spin-anticlockwise"></div>
</div>


        {/* RIGHT SIDE */}
        <div className="flex w-full h-screen mx-auto md:w-1/2 justify-center py-10 items-center bg-white">
          <form
            onSubmit={
              openEnterOtp ? handleVerifyOtp : handleSendOtp
            }
            className="space-y-5 max-w-sm mx-auto pt-8 w-full px-4 text-center"
          >
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              Welcome Back to{" "}
              <span style={{ color: "#d64b00" }}>
                Sambhaar.com
              </span>
            </h1>

            {/* MOBILE INPUT */}
            <input
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              type="text"
              placeholder="Mobile Number"
              disabled={openEnterOtp}
              className="w-full bg-gray-100 px-5 py-3 rounded-full border-2"
            />

            {/* OTP INPUT */}
            {openEnterOtp && (
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                type="text"
                placeholder="Enter OTP"
                className="w-full bg-gray-100 px-5 py-3 rounded-full border-2"
              />
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full mt-5 text-white font-medium py-3 rounded-md bg-gradient-to-r from-orange-600 to-orange-400 hover:opacity-90 transition"
            >
              {openEnterOtp
                ? verifying
                  ? "Verifying..."
                  : "Verify OTP"
                : sending
                ? "Sending OTP..."
                : "Get OTP"}
            </button>
          
          {openEnterOtp &&  <button
    type="button"
    onClick={() => {
      setOpenEnterOtp(false);
      setOtp("");
      setTimer(0);
    }}
    className="text-sm text-gray-500 underline"
  >
    Change Number
  </button>}

            {/* RESEND TIMER */}
            {openEnterOtp && (
              <p className="text-sm text-gray-500">
                {timer > 0 ? (
                  `Resend OTP in ${timer}s`
                ) : (
                  <span
                    onClick={handleResendOtp}
                    className="text-orange-600 cursor-pointer font-semibold"
                  >
                    Resend OTP
                  </span>
                )}
              </p>
            )}

            <p className="text-sm text-gray-500">
              Enter your mobile number to continue. New users
              will be automatically registered.
            </p>
          </form>
        </div>

        <ToastContainer />
      </div>
    );
  };

  export default Login;

//-------


//Email Login


//   import React, { useEffect, useState } from "react";
//   import { useDispatch } from "react-redux";
//   import { Link, useNavigate } from "react-router-dom";
//   import { useLoginUserMutation } from "../redux/features/auth/authApi";
//   import { setUser } from "../redux/features/auth/authSlice";
//   import { toast, ToastContainer } from "react-toastify";
//   import "react-toastify/dist/ReactToastify.css";
//   import { FaEye, FaEyeSlash } from "react-icons/fa";
//   import GoogleLoginButton from "./shop/GoogleLoginBtn";

//   const translations = [
//     { text: "Welcome", style: { top: "90%", right: "10%", textAlign: "left" } },
//     { text: "Welcome", style: { top: "10%", left: "75%", textAlign: "left" } },
//     { text: "வணக்கம்", style: { top: "12%", left: "13%", textAlign: "center" } },
//     { text: "வணக்கம்", style: { top: "25%", right: "8%", textAlign: "right" } },
//     { text: "வணக்கம்", style: { top: "90%", left: "5%", textAlign: "left" } },
//     { text: "வணக்கம்", style: { top: "45%", right: "5%", textAlign: "right" } },
//     { text: "வணக்கம்", style: { top: "55%", left: "5%", textAlign: "right" } },
//     {
//       text: "स्वागत है",
//       style: { top: "35%", left: "30%", textAlign: "center" },
//     },
//     {
//       text: "स्वागत है",
//       style: { top: "65%", right: "20%", textAlign: "center" },
//     },
//     { text: "ಸ್ವಾಗತ", style: { top: "23%", left: "10%", textAlign: "right" } },
//     { text: "ಸ್ವಾಗತ", style: { top: "81%", right: "30%", textAlign: "right" } },
//     { text: "స్వాగతం", style: { top: "20%", left: "40%", textAlign: "left" } },
//     { text: "స్వాగతం", style: { top: "85%", left: "35%", textAlign: "left" } },
//     { text: "സ്വാഗതം", style: { top: "5%", left: "45%", textAlign: "center" } },
//     {
//       text: "സ്വാഗതം",
//       style: { bottom: "25%", right: "40%", textAlign: "center" },
//     },
//     { text: "Namaste", style: { top: "30%", left: "60%", textAlign: "right" } },
//     {
//       text: "Namaste",
//       style: { bottom: "30%", left: "25%", textAlign: "right" },
//     },
//   ];

//   const Login = () => {
    
//     const [message, setMessage] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [passwordVisible, setPasswordVisible] = useState(false);
 
//     const dispatch = useDispatch();
//     const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//       e.preventDefault();
//       const data = { email, password };

//       try {
//         const response = await loginUser(data).unwrap();
//         const { user } = response;
//         dispatch(setUser({ user }));

//         toast.success("Login successful!...", {
//           position: "top-center",
//           autoClose: 2000,
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: false,
//           draggable: true,
//           theme: "colored",
//         });

//         setTimeout(() => navigate("/"), 2000); // Delay redirection
//       } catch (error) {
//         setMessage("Please provide a valid email and password");
//         toast.error("Invalid login credentials", {
//           position: "top-center",
//           autoClose: 2000,
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: false,
//           draggable: true,
//           theme: "colored",
//         });
//       }
//     };


//     // const handleSuccess = (credentialResponse) => {
//     //   const decoded = jwtDecode(credentialResponse.credential);
//     //   console.log(decoded);

//     //   // Send to backend
//     //   fetch("http://localhost:5000/api/auth/google", {
//     //     method: "POST",
//     //     headers: { "Content-Type": "application/json" },
//     //     body: JSON.stringify({ token: credentialResponse.credential }),
//     //   })
//     //     .then(res => res.json())
//     //     .then(data => {
//     //       // store JWT or user data
//     //       console.log(data);
//     //     });
//     // };

//     return (
//       <div className="h-screen flex flex-col md:flex-row">
//         {/* Left Side */}
//         <div className="relative overflow-hidden md:flex w-full md:w-1/2 justify-around items-center bg-gradient-to-r from-orange-600 to-orange-400 md:block hidden">
//           <Link to="/" className="absolute top-6 left-6 z-50">
//             <img src="/sambhaar.png" alt="Logo" className="h-8 md:h-12" />
//           </Link>
//           <div className="flex flex-col justify-center items-center">
//             <h1 className="text-white font-bold text-4xl md:text-5xl mb-4">
//               Sambhaar.com
//             </h1>
//             <p className="text-white font-normal text-lg text-center md:text-left">
//               Fresh Finds for Your Pantry and Home
//             </p>
//           </div>
//           {/* Render Translations Dynamically */}
//           {translations.map((translation, index) => (
//             <span
//               key={index}
//               className="absolute text-white font-bold text-md"
//               style={translation.style} // Apply specific position and alignment
//             >
//               {translation.text}
//             </span>
//           ))}
//           <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 border-opacity-30 border-t-8 border-t-primary-dark rounded-full animate-spin-clockwise"></div>
//           <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 border-opacity-30 border-t-8 border-t-primary-dark rounded-full animate-spin-anticlockwise"></div>
//           <div className="absolute -top-40 -right-0 w-80 h-80 border-4 border-opacity-30 border-t-8 border-t-primary-dark rounded-full animate-spin-clockwise"></div>
//           <div className="absolute -top-20 -right-20 w-80 h-80 border-4 border-opacity-30 border-t-8 border-t-primary-dark rounded-full animate-spin-anticlockwise"></div>
//         </div>

//         {/* Right Side (Login Form) */}
//         <div className="flex w-full h-screen mx-auto md:w-1/2 justify-center py-10 items-center bg-white">
//           <form
//             onSubmit={handleLogin}
//             className="space-y-5 max-w-sm mx-auto pt-8 w-full px-4 text-center"
//           >
//             <h1 className="text-gray-800 font-bold text-2xl mb-1">
//               Welcome Back to{" "}
//               <span style={{ color: "#d64b00" }}>sambhaar.com</span>
//             </h1>
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               type="email"
//               name="email"
//               id="email"
//               placeholder="Email Address"
//               required
//               className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-full border-2 border-gray-300 focus:border-primary focus:ring-0.5 focus:ring-orange-400 transition"
//             />
//             <div className="relative">
//               <input
//                 onChange={(e) => setPassword(e.target.value)}
//                 type={passwordVisible ? "text" : "password"} // Toggle password visibility
//                 name="password"
//                 id="password"
//                 placeholder="Password"
//                 required
//                 className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-full border-2 border-gray-300 focus:border-primary focus:ring-0.5 focus:ring-orange-400 transition pr-12" // Add padding-right for the icon
//               />
//               {/* Toggle Password Visibility Icon */}
//               <span
//                 onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility when clicked
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
//               >
//                 {passwordVisible ? <FaEyeSlash /> : <FaEye />}{" "}
//                 {/* Change icon based on state */}
//               </span>
//             </div>
//             <p className="mt-1 text-sm text-gray-500 text-right">
//               <Link to="/forgot" className="text-orange-600 font-semibold">
//                 Forgot Password?
//               </Link>
//             </p>
//     <button
//   type="submit"
//   className="w-full mt-5 text-white font-medium py-3 rounded-md bg-gradient-to-r from-orange-600 to-orange-400 hover:opacity-90 transition"
// >
//   {loginLoading ? "Logging in..." : "Login"}
// </button>

// <GoogleLoginButton />

// {/* <p className="my-5 italic text-sm text-center">
//   Don't have an account?{" "}
//   <Link to="/register" className="text-orange-600 font-semibold underline">
//     Register
//   </Link>
// </p> */}

//             {message && <p className="text-red-500 text-center">{message}</p>}
//             {/* <button
//               type="submit"
//               className="w-full mt-5 text-white font-medium py-3 rounded-md bg-gradient-to-r from-orange-600 to-orange-400 hover:opacity-90 transition"
//             >
//               {loginLoading ? "Logging in..." : "Login"}
//             </button> */}
//             <p className="my-5 italic text-sm text-center">
//               Don't have an account?{" "}
//               <Link
//                 to="/register"
//                 className="text-orange-600 font-semibold underline"
//               >
//                 Register
//               </Link>
//             </p>
//           </form>
//         </div>

//         {/* Toastify Container */}
//         <ToastContainer />
//       </div>
//     );
//   };

//   export default Login;


