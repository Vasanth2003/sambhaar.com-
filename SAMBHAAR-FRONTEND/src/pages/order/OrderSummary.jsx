// import React, { useState,useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// // import phonepe from "../../assets/phonepe.png";
// import oops from "../../assets/oops.png";
// // import {
// //   clearCart,
// //   removeFromCart,
// //   updateQuantity,
// // } from "../../redux/features/cart/cartSlice";
// import { getBaseUrl } from "../../util/baseURL";
// import Footer from "../../components/Footer";
// // import { useNavigate } from "react-router-dom";

// const OrderSummary = () => {
//   // const dispatch = useDispatch();
//   // const navigate = useNavigate();
//   const products = useSelector((store) => store.cart.products);
//   const { user } = useSelector((state) => state.auth);
//   const [selectedPostalCode, setSelectedPostalCode] = useState()
//   const { selectedItems, totalPrice, tax, grandTotal } = useSelector(
//     (store) => store.cart
//   );
//   const [showTermsModal, setShowTermsModal] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [address, setAddress] = useState({
//     street: "",
//     city: "",
//     state: "",
//     postalCode: "",
//     country: "",
//   });
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [errors, setErrors] = useState({});
// const pincodeAreas = {
//   "600097": [
//     "Secretariat Colony",
//     "Sakthi Srinivasa Salai",
//     "Mount Batten Street",
//     "Pillayar Kovil Street",
//     "Trinity Garden",
//     "Bharathiyar Nagar Main Road",
//     "Casagrand Aldea"
//   ],
//   "600100": [
//     "Indhira Priyadarshini Nagar", 
//     "Embassy Residency", 
//     "Casagrand First City", 
//     "Hospital Road",
//     "Sekaran Nagar",
//     "Vgp Prabhu Nagar", 
//     "Kailash Nagar"
//   ]
// };
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setAddress((prev) => ({ ...prev, [name]: value }));
//   };

//   const validateFields = () => {
//     const newErrors = {};

//     // Validate phone number
//     const trimmedPhoneNumber = phoneNumber.trim();
//     const phoneNumberRegex = /^[0-9]{10}$/;
//     if (!phoneNumberRegex.test(trimmedPhoneNumber)) {
//       newErrors.phoneNumber = "Please enter a valid 10-digit phone number.";
//     }

//     // Validate address fields
//     const trimmedAddress = {
//       street: address.street.trim(),
//       city: address.city.trim(),
//       state: "Tamil Nadu",
//       postalCode: address.postalCode.trim(),
//       country: "India",
//     };
//     if (!trimmedAddress.street) {
//       newErrors.street = "Street is required.";
//     }
//     if (!trimmedAddress.city) {
//       newErrors.city = "City is required.";
//     }
//     if (!trimmedAddress.state) {
//       newErrors.state = "State is required.";
//     }
//     if (!trimmedAddress.postalCode) {
//       newErrors.postalCode = "Postal code is required.";
//     } 
//     // else if (trimmedAddress.postalCode !== 600097 || trimmedAddress.postalCode !== 600100) {
//     //   newErrors.postalCode =
//     //     "We are available only at - 600097(Thuraipakkam, OMR) and 600100(Perumbakkam, OMR)";
//     // }
//     if (!trimmedAddress.country) {
//       newErrors.country = "Country is required.";
//     }

//     setErrors(newErrors);

//     // Return false if there are any errors
//     return Object.keys(newErrors).length === 0;
//   };

//   const makePayment = async (e) => {
//     e.preventDefault();
// // setPaymentMethod("phonepe")
//     if (!validateFields()) {
//       return;
//     }

//     setLoading(true);

//     const data = {
//       user: user,
//       name: name, 
//       products: products,
//       selectedItems: selectedItems,
//       GrandTotal: grandTotal.toFixed(2),
//       MUID: "MUIDW" + Date.now() + user._id,
//       transaction: "T" + Date.now(),
//       paymentMethod: "phonepe",
//       address,
//       phoneNumber: phoneNumber.trim(),
//     };

    
//     try {
//       // if (paymentMethod === "phonepe") {
//                 localStorage.setItem("ress", JSON.stringify(data))
//         const response = await axios.post(
//           `${getBaseUrl()}/api/orders/create-checkout-session`,
//           data
//         );
        
//         localStorage.setItem("Data",data)
        
//         const redirectUrl =
//           response.data?.data?.instrumentResponse?.redirectInfo?.url;
        
//         if (redirectUrl) {
          
//           window.location.href = redirectUrl;
//           //navigate(redirectUrl);
//         } else {
//           console.error("Redirect URL not found in response", response.data);
//         }
      
      
//       // else if (paymentMethod === "cod") {
//       //   const response = await axios.post(
//       //     `${getBaseUrl()}/api/orders/create-cod-order`,
//       //     data
//       //   );
//       //   const redirectUrl = response.data.redirectUrl;
//       //   if (redirectUrl) {
//       //     window.location.href = redirectUrl;
//       //     //navigate(redirectUrl);
//       //   } else {
//       //     console.log("Redirect URL not found in response");
//       //   }
//       // }
//     } catch (error) {
//       console.error("Error initiating payment:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//   if (user?.phoneNumber) {
//     setPhoneNumber(user.phoneNumber);
//   }
//     console.log(user.isFirstTime);
  
//   if(user?.isFirstTime){
//     setIsFirstTime(true);
    
//   }
// }, [user]);

//   const [message, setMessage] = useState("");
//   const [showPopup, setShowPopup] = useState(false);
// const [name, setName] = useState("");
// const [isFirstTime, setIsFirstTime] = useState(false);
//   const validPincode = "600097" ;

//   const handlePincodeChange = (e) => {
//     const enteredPincode = e.target.value;
//     setAddress((prev) => ({
//       ...prev,
//       postalCode: enteredPincode,
//     }));
//     if ((enteredPincode === validPincode) || (enteredPincode === "600100")) {
//       setShowPopup(false); // Hide popup for valid pincode
//     } else if (enteredPincode.length === 6) {
//       setMessage(
//         "Sorry, we’re not available in your area right now. 🙏 Hope to be there soon!"
//       );
//       setShowPopup(true);
//     } else {
//       setShowPopup(false); // Hide popup for incomplete pincode
//     }
//   };

//   return (
//     <div className="min-h-screen mt-10 bg-gray-100">
//       <div className="mx-auto p-6 mt-10">
//         {products.length === 0 ? (
//           <div className="text-center text-lg font-bold">
//             Your cart is empty.
//           </div>
//         ) : (
//           <div className="mt-10 flex justify-center flex-col md:flex-row gap-6">
//             <div className="w-full md:w-[60%]">
//               <div className="w-full">
//                 <h2 className=" text-xl lg:mt-10 sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
//                   Shipping Information
//                 </h2>
//                 <form onSubmit={makePayment}>
//                  <div className="space-y-4 bg-white p-4 md:p-6 rounded shadow-md">
//                     <h2 className="text-lg font-semibold mb-4">
//                       <span>
//                         <i className="ri-number-1 rounded-full bg-primary text-white p-2 mr-4"></i>
//                       </span>
//                       Name
//                     </h2>
//                     <div className="flex items-center border border-gray-300 rounded-md px-2 sm:px-4 pt-2 shadow-sm">
//                      <input
//                         type="text"
//                         name="name"
//                         placeholder="Full Name"
//                         className="w-full px-2 sm:px-4 py-2 bg-transparent outline-none"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                       />
//                     </div>
//                     {errors.name && (
//                       <p className="text-red-500 text-sm">{errors.name}</p>
//                     )}
//                   </div>
//                   {/* Contact */}
//                   <div className="space-y-4 bg-white p-4 md:p-6 rounded shadow-md">
//                     <h2 className="text-lg font-semibold mb-4">
//                       <span>
//                         <i className="ri-number-2 rounded-full bg-primary text-white p-2 mr-4"></i>
//                       </span>
//                       Contact Number
//                     </h2>
//                     <div className="flex items-center border border-gray-300 rounded-md px-2 sm:px-4 pt-2 shadow-sm">
//                       <input
//                         type="text"
//                         name="phoneNumber"
//                         placeholder="Phone Number"
//                         className="w-full px-2 sm:px-4 py-2 bg-transparent outline-none"
//                         // defaultValue={user.phoneNumber}
//                      value={phoneNumber}
// onChange={(e) => setPhoneNumber(e.target.value)}
//                         required
//                       />
//                     </div>
//                     {errors.phoneNumber && (
//                       <p className="text-red-500 text-sm">
//                         {errors.phoneNumber}
//                       </p>
//                     )}
//                   </div>
//                   {/* Address */}
//                   <div className="space-y-4 my-4 md:my-10 bg-white p-4 md:p-6 rounded shadow-md">
//                     <h2 className="text-lg font-semibold mb-4">
//                       <span>
//                         <i className="ri-number-3 rounded-full bg-primary text-white p-2 mr-4"></i>
//                       </span>
//                       Address
//                     </h2>
                    

//                     {/* <div className="flex items-center border border-gray-300 rounded-md px-2 sm:px-4 pt-2 shadow-sm">
//                       <input
//                         type="text"
//                         name="city"
//                         placeholder="City"
//                         className="w-full px-2 sm:px-4 py-2 bg-transparent outline-none"
//                         value={address.city}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div> */}
//                     {/* {errors.city && (
//                       <p className="text-red-500 text-sm">{errors.city}</p>
//                     )} */}

//                     {/* <div className="flex items-center border border-gray-300 rounded-md px-2 sm:px-4 pt-2 shadow-sm">
//                       <input
//                         type="text"
//                         name="state"
//                         placeholder="State"
//                         className="w-full px-2 sm:px-4 py-2 bg-transparent outline-none"
//                         value={address.state}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                     {errors.state && (
//                       <p className="text-red-500 text-sm">{errors.state}</p>
//                     )} */}

//                     <div className="flex items-center border border-gray-300 rounded-md px-2 sm:px-4 pt-2 shadow-sm">
//                       {/* <input
//                         type="text"
//                         name="postalCode"
//                         placeholder="Postal Code"
//                         className="w-full px-2 sm:px-4 py-2 bg-transparent outline-none"
//                         value={address.postalCode} 
//                         onChange={handlePincodeChange} 
//                         maxLength={6} 
//                         required
//                       /> */}
//                       <select
//                           name="postalCode"
//                           className="w-full px-2 sm:px-4 py-2 bg-transparent outline-none"
//                           value={address.postalCode}
//                           onChange={(e) => {
//                             handlePincodeChange(e);
//                             setSelectedPostalCode(e.target.value);
//                           }}
//                           required
//                         >
//                           <option value="" disabled>
//                             Select Postal Code
//                           </option>
//                           <option value="600097">600097</option>
//                           <option value="600100">600100</option>
//                         </select>
//                     </div>
//                     {
                       
//                       (selectedPostalCode ==="600097" || selectedPostalCode ==="600100") &&
//                       (   
                                           
//                         <div className="flex items-center border border-gray-300 rounded-md px-2 sm:px-4 pt-2 shadow-sm">
//                         <select
//                           name="city"
//                           className="w-full px-2 sm:px-4 py-2 bg-transparent outline-none"
//                          value={address.city}
//                         onChange={handleInputChange}
//                         >
//                           <option value="" disabled>
//                             Select Area
//                           </option>
                          
//                           {
                            
//                             pincodeAreas[selectedPostalCode].map((city,index)=>{
//                               return (
                                
//                                   <option value={city} key={index}>{city}</option>
                                
//                               )
//                             })
//                           }
                          
//                         </select>
//                     </div>
//                       )
                     
//                     }
//                     {errors.postalCode && (
//                       <p className="text-red-500 text-sm">
//                         {errors.postalCode}
//                       </p>
//                     )}
//                     <div className="flex items-center border border-gray-300 rounded-md px-2 sm:px-4 pt-2 shadow-sm">
//                       <input
//                         type="text"
//                         name="street"
//                         placeholder="Flat/House no, Street"
//                         className="w-full px-2 sm:px-4 py-2 bg-transparent outline-none"
//                         value={address.street}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                     {errors.street && (
//                       <p className="text-red-500 text-sm">{errors.street}</p>
//                     )}
//                      {errors.city && (
//                       <p className="text-red-500 text-sm">{errors.city}</p>
//                     )}
//                     {/* Modal Popup */}
//                     {showPopup && (
//                       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//                         <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg sm:max-w-md md:max-w-sm lg:max-w-lg mx-4 sm:mx-6">
//                           <h3 className="text-3xl font-bold mb-4">
//                             Oops.....!
//                           </h3>
//                           <div className="flex justify-center mt-4">
//                             <img
//                               src={oops}
//                               alt="oops"
//                               className="w-48 h-48 animate-bounce" // Add animation class here
//                             />
//                           </div>
//                           <p>{message}</p>
//                           <div className="flex justify-end mt-6">
//                             <button
//                               onClick={() => setShowPopup(false)}
//                               className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                             >
//                               Close
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     )}

//                     {/* <div className="flex items-center border border-gray-300 rounded-md px-2 sm:px-4 pt-2 shadow-sm">
//                       <input
//                         type="text"
//                         name="country"
//                         placeholder="Country"
//                         className="w-full px-2 sm:px-4 py-2 bg-transparent outline-none"
//                         value={address.country}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                     {errors.country && (
//                       <p className="text-red-500 text-sm">{errors.country}</p>
//                     )} */}
//                   </div>
                  
//                 </form>
//               </div>
//             </div>

//             <div className="w-full md:w-1/4 mt-2 sm:mt-4 lg:mt-12">
//               {products.map((item, index) => (
//                 <div key={index} className="flex justify-between p-2 pb-4">
//                   <div className="flex flex-col">
//                     <p className="text-gray-600 text-sm">
//                       <span className="text-gray-900 font-semibold">
//                         {item.quantity}
//                       </span>{" "}
//                       x {item.name} | {item.weight}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm">
//                       ₹{(item.price * item.quantity).toFixed(2)}
//                     </p>
//                   </div>
//                 </div>
//               ))}

//               <div className="border-y py-2 text-sm">
//                 <div className="flex justify-between p-2">
//                   <div className="flex flex-col text-gray-600">Sub Total</div>
//                   <div className="flex text-gray-600">
//                     ₹ {totalPrice.toFixed(2) - tax.toFixed(2)}
//                   </div>
//                 </div>
//                 <div className="flex justify-between px-2">
//                   <div className="flex flex-col text-gray-600">Tax</div>
//                   <div className="flex items-end text-gray-600">
//                     ₹ {tax.toFixed(2)}
//                   </div>
//                 </div>
//                 {totalPrice < 1 && (
//                   <div className="flex justify-between px-2 pt-2">
//                     <div className="flex flex-col text-gray-600">
//                       Shipping Charges
//                     </div>
//                     <div className="flex items-end text-gray-600">₹ 25</div>
//                   </div>
//                 )}
//                 {totalPrice > 495 && (
//                   <div className="flex justify-between px-2 pt-2">
//                     <div className="flex flex-col text-gray-600">
//                       Shipping Charges
//                     </div>
//                     <div className="flex items-end text-gray-600">
//                       {" "}
//                       <span className="text-green-500">Free </span>
//                     </div>
//                   </div>
//                 )}
//               </div>
//               <div className="border-y mt-1 py-2">
//                 <div className="flex justify-between p-2">
//                   <div className="flex flex-col text-gray-900 font-semibold">
//                     Total
//                   </div>
//                   <div className="flex items-end text-gray-900 font-semibold">
//                     ₹ {grandTotal.toFixed(2)}
//                   </div>
//                 </div>
//               </div>

//               {/* Checkbox for Terms and Conditions */}
//               <div className="mt-4 flex items-center gap-2 ">
//                 <input
//                   type="checkbox"
//                   id="termsCheckbox"
//                   //  onChange={()=>setPaymentMethod("phonepe")}
//                   // onClick={makePayment}
//                   // disabled={loading}
//                 />
//                 <label
//                   htmlFor="termsCheckbox"
//                   className="text-md text-gray-600"
                 

//                 >
//                   I accept the{" "}
                  
//                 </label>
//                 <button className="text-blue-500 cursor-pointer"  onClick={() => setShowTermsModal(true)}>
//                     Terms and Conditions 
//                   </button>
                  
//               </div>

//               {/* <div className="flex justify-center flex-col pt-4 items-center gap-8"> */}
//               <div className=" flex text-md ">

               
//                 {products.length > 0 && (
//                   <button
//                       // onChange={()=>setPaymentMethod("phonepe")}

//                     onClick={makePayment}
//                     disabled={loading}
//                     //className=" text-primary "

//                     className="bg-primary w-full px-3 py-3 text-white mt-2 rounded-md flex justify-center"
//                   >
//                 { !loading ?   <span className="loading-text absolute  ">
//                      Proceed to Pay 
//                   </span> :
//                    <span className="loading-text absolute  ">
//                       Processing
//                      <span className="dot-1">.</span>
//                      <span className="dot-2">.</span>
//                      <span className="dot-3">.</span>
//                   </span>
//                 }
                
                
//                   <br/>
//                   {/* <span className=" "> 
//                   {!loading && "Processing..." }
//                   </span> */}
                  

//                   </button>
//                 )}
                
//               </div>
//               <div className=" mt-5 "> {
//                   isFirstTime &&(
//                     <span className="text-sm text-green-500 mt-1">
//                       (You have a special discount! Use code: FIRSTORDER at checkout)
//                     </span>
//                   )
//                 }
//                 </div>
//             </div>
//           </div>
//         )}
//       </div>
//       {/* Modal Popup for Terms and Conditions */}
//    {showTermsModal && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-2">
//     <div className="bg-white p-4 rounded shadow-md w-full max-w-md max-h-[90vh] overflow-y-auto">
      
//       {/* Header with aligned title and close icon */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-bold">Terms and Conditions</h2>
//         <button
//           onClick={() => setShowTermsModal(false)}
//           className="text-gray-500 hover:text-gray-800 text-3xl font-bold leading-none"
//         >
//           &times;
//         </button>
//       </div>

//       {/* List content */}
//       <ul className="list-disc list-inside text-xs text-gray-600 space-y-3">
//         <li>Same-Day Delivery: Orders placed between 12:01 AM and 5:00 PM will be delivered on the same day.</li>
//         <li>Next-Day Delivery: Orders placed between 5:01 PM and 11:59 PM will be delivered the next day before 12:00 noon.</li>
//         <li>Address Changes: Deliveries will be made to the address provided at the time of order. Any request to change the delivery address may incur an additional charge of ₹25 per kilometer.</li>
//         <li>Delivery Delays: We are not responsible for delivery delays due to incorrect addresses, natural calamities, or other unavoidable circumstances.</li>
//         <li>Specific Delivery Times: If you require delivery at a specific time, kindly mention your preferred timing in the message box on the checkout page when placing your order.</li>
//         <li>Unattended Deliveries: Our delivery agents will call your registered phone number when delivering one-time orders. If you request us to leave a delivery unattended or with security personnel at your address, you release us from any liability arising from the products being left unattended. This includes risks such as theft, tampering, contamination, damages, and temperature changes affecting chilled or frozen items.</li>
//         <li>Handling Fee: A nominal handling fee of ₹25 per delivery applies only when your order total is less than ₹495. This fee is charged regardless of the number of products in your order.</li>
//         <li>Transparent Pricing: All charges, fees, and costs (including delivery fees) associated with your purchase will be clearly displayed on the checkout page during the transaction. We do not manipulate the prices of any products or services offered on our platform.</li>
//         <li>No Additional Charges: Customers are not required to pay any additional charges or tips to the delivery agent. If you wish to provide a gratuity, it is entirely at your discretion.</li>
//         <li>Customer Support: For any clarifications or support, you can reach us at +8181812912 (WhatsApp) between 7:00 AM and 9:00 PM.</li>
//         <li>Return Policy: In case of goods return, the process will be conducted in accordance with our Return Policy.</li>
//       </ul>
//     </div>
//   </div>
// )}

//       <Footer />
//     </div>
//   );
// };

// export default OrderSummary;





import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import oops from "../../assets/oops.png";
import { getBaseUrl } from "../../util/baseURL";
import Footer from "../../components/Footer";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.cart.products);
  const { user } = useSelector((state) => state.auth);
  const [selectedPostalCode, setSelectedPostalCode] = useState();
  const { selectedItems, totalPrice, tax, grandTotal } = useSelector(
    (store) => store.cart
  );
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(false);
  
  // Coupon code states
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const pincodeAreas = {
    "600097": [
      "Secretariat Colony",
      "Sakthi Srinivasa Salai",
      "Mount Batten Street",
      "Pillayar Kovil Street",
      "Trinity Garden",
      "Bharathiyar Nagar Main Road",
      "Casagrand Aldea",
    ],
    "600100": [
      "Indhira Priyadarshini Nagar",
      "Embassy Residency",
      "Casagrand First City",
      "Hospital Road",
      "Sekaran Nagar",
      "Vgp Prabhu Nagar",
      "Kailash Nagar",
    ],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const validateFields = () => {
    const newErrors = {};

    const trimmedPhoneNumber = phoneNumber.trim();
    const phoneNumberRegex = /^[0-9]{10}$/;
    if (!phoneNumberRegex.test(trimmedPhoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number.";
    }

    const trimmedAddress = {
      street: address.street.trim(),
      city: address.city.trim(),
      state: "Tamil Nadu",
      postalCode: address.postalCode.trim(),
      country: "India",
    };
    if (!trimmedAddress.street) {
      newErrors.street = "Street is required.";
    }
    if (!trimmedAddress.city) {
      newErrors.city = "City is required.";
    }
    if (!trimmedAddress.state) {
      newErrors.state = "State is required.";
    }
    if (!trimmedAddress.postalCode) {
      newErrors.postalCode = "Postal code is required.";
    }
    if (!trimmedAddress.country) {
      newErrors.country = "Country is required.";
    }

    // If first time user, coupon must be applied
    if (isFirstTime && !couponApplied) {
      newErrors.coupon = "Please apply the coupon code to proceed.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle coupon code validation
  const handleApplyCoupon = () => {
    setCouponError("");
    setCouponSuccess("");

    const trimmedCode = couponCode.trim().toUpperCase();

    if (!trimmedCode) {
      setCouponError("Please enter a coupon code.");
      return;
    }

    if (trimmedCode === "FIRST5") {
      const discount = (grandTotal * 0.05).toFixed(2);
      setDiscountAmount(discount);
      setCouponApplied(true);
      setCouponSuccess(`✓ Coupon applied! You saved ₹${discount}`);
    } else {
      setCouponError("Invalid coupon code. Please try again.");
      setCouponApplied(false);
      setDiscountAmount(0);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setCouponApplied(false);
    setDiscountAmount(0);
    setCouponError("");
    setCouponSuccess("");
  };

  const finalGrandTotal = (
    parseFloat(grandTotal) - parseFloat(discountAmount)
  ).toFixed(2);

  const makePayment = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    setLoading(true);

    const data = {
      user: user,
      name: name,
      products: products,
      selectedItems: selectedItems,
      GrandTotal: finalGrandTotal,
      originalGrandTotal: grandTotal.toFixed(2),
      discountAmount: discountAmount,
      couponCode: couponApplied ? "FIRST5" : null,
      MUID: "MUIDW" + Date.now() + user._id,
      transaction: "T" + Date.now(),
      paymentMethod: "phonepe",
      address,
      phoneNumber: phoneNumber.trim(),
    };

    try {
      localStorage.setItem("ress", JSON.stringify(data));
      const response = await axios.post(
        `${getBaseUrl()}/api/orders/create-checkout-session`,
        data
      );

      localStorage.setItem("Data", data);

      // Update user's isFirstTime to false in the backend
      if (isFirstTime) {
        try {
          await axios.patch(`${getBaseUrl()}/api/auth//updateFirstTime/${user._id}`, {
            userId: user._id,
          });
        } catch (error) {
          console.error("Error updating user first time status:", error);
        }
      }

      const redirectUrl =
        response.data?.data?.instrumentResponse?.redirectInfo?.url;

      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        console.error("Redirect URL not found in response", response.data);
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.phoneNumber) {
      setPhoneNumber(user.phoneNumber);
    }
    if (user?.isFirstTime) {
      setIsFirstTime(true);
    }
  }, [user]);

  const handlePincodeChange = (e) => {
    const enteredPincode = e.target.value;
    setAddress((prev) => ({
      ...prev,
      postalCode: enteredPincode,
    }));
    if (
      enteredPincode === "600097" ||
      enteredPincode === "600100"
    ) {
      setShowPopup(false);
    } else if (enteredPincode.length === 6) {
      setMessage(
        "Sorry, we're not available in your area right now. 🙏 Hope to be there soon!"
      );
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  };

  return (
    <div className="min-h-screen mt-10 bg-gray-100">
      <div className="mx-auto p-6 mt-10">
        {products.length === 0 ? (
          <div className="text-center text-lg font-bold">
            Your cart is empty.
          </div>
        ) : (
          <div className="mt-10 flex justify-center flex-col md:flex-row gap-6">
            <div className="w-full md:w-[60%]">
              <div className="w-full">
                <h2 className=" text-xl lg:mt-10 sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
                  Shipping Information
                </h2>
                <form onSubmit={makePayment}>
                  <div className="space-y-4 bg-white p-4 md:p-6 rounded shadow-md">
                    <h2 className="text-lg font-semibold mb-4">
                      <span>
                        <i className="ri-number-1 rounded-full bg-primary text-white p-2 mr-4"></i>
                      </span>
                      Name
                    </h2>
                    <div className="flex items-center border border-gray-300 rounded-md px-2 sm:px-4 pt-2 shadow-sm">
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className="w-full px-2 sm:px-4 py-2 bg-transparent outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>

                  {/* Contact */}
                  <div className="space-y-4 bg-white p-4 md:p-6 rounded shadow-md">
                    <h2 className="text-lg font-semibold mb-4">
                      <span>
                        <i className="ri-number-2 rounded-full bg-primary text-white p-2 mr-4"></i>
                      </span>
                      Contact Number
                    </h2>
                    <div className="flex items-center border border-gray-300 rounded-md px-2 sm:px-4 pt-2 shadow-sm">
                      <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        className="w-full px-2 sm:px-4 py-2 bg-transparent outline-none"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="space-y-4 my-4 md:my-10 bg-white p-4 md:p-6 rounded shadow-md">
                    <h2 className="text-lg font-semibold mb-4">
                      <span>
                        <i className="ri-number-3 rounded-full bg-primary text-white p-2 mr-4"></i>
                      </span>
                      Address
                    </h2>

                    <div className="flex items-center border border-gray-300 rounded-md px-2 sm:px-4 pt-2 shadow-sm">
                      <select
                        name="postalCode"
                        className="w-full px-2 sm:px-4 py-2 bg-transparent outline-none"
                        value={address.postalCode}
                        onChange={(e) => {
                          handlePincodeChange(e);
                          setSelectedPostalCode(e.target.value);
                        }}
                        required
                      >
                        <option value="" disabled>
                          Select Postal Code
                        </option>
                        <option value="600097">600097</option>
                        <option value="600100">600100</option>
                      </select>
                    </div>

                    {(selectedPostalCode === "600097" ||
                      selectedPostalCode === "600100") && (
                      <div className="flex items-center border border-gray-300 rounded-md px-2 sm:px-4 pt-2 shadow-sm">
                        <select
                          name="city"
                          className="w-full px-2 sm:px-4 py-2 bg-transparent outline-none"
                          value={address.city}
                          onChange={handleInputChange}
                        >
                          <option value="" disabled>
                            Select Area
                          </option>

                          {pincodeAreas[selectedPostalCode].map(
                            (city, index) => {
                              return (
                                <option value={city} key={index}>
                                  {city}
                                </option>
                              );
                            }
                          )}
                        </select>
                      </div>
                    )}

                    {errors.postalCode && (
                      <p className="text-red-500 text-sm">
                        {errors.postalCode}
                      </p>
                    )}

                    <div className="flex items-center border border-gray-300 rounded-md px-2 sm:px-4 pt-2 shadow-sm">
                      <input
                        type="text"
                        name="street"
                        placeholder="Flat/House no, Street"
                        className="w-full px-2 sm:px-4 py-2 bg-transparent outline-none"
                        value={address.street}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    {errors.street && (
                      <p className="text-red-500 text-sm">{errors.street}</p>
                    )}
                    {errors.city && (
                      <p className="text-red-500 text-sm">{errors.city}</p>
                    )}

                    {/* Modal Popup */}
                    {showPopup && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg sm:max-w-md md:max-w-sm lg:max-w-lg mx-4 sm:mx-6">
                          <h3 className="text-3xl font-bold mb-4">
                            Oops.....!
                          </h3>
                          <div className="flex justify-center mt-4">
                            <img
                              src={oops}
                              alt="oops"
                              className="w-48 h-48 animate-bounce"
                            />
                          </div>
                          <p>{message}</p>
                          <div className="flex justify-end mt-6">
                            <button
                              onClick={() => setShowPopup(false)}
                              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Right Side - Order Summary and Coupon */}
            <div className="w-full md:w-1/4 mt-2 sm:mt-4 lg:mt-12">
              {/* Product Items */}
              {products.map((item, index) => (
                <div key={index} className="flex justify-between p-2 pb-4">
                  <div className="flex flex-col">
                    <p className="text-gray-600 text-sm">
                      <span className="text-gray-900 font-semibold">
                        {item.quantity}
                      </span>{" "}
                      x {item.name} | {item.weight}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}

              {/* Price Breakdown */}
              <div className="border-y py-2 text-sm">
                <div className="flex justify-between p-2">
                  <div className="flex flex-col text-gray-600">Sub Total</div>
                  <div className="flex text-gray-600">
                    ₹ {(totalPrice.toFixed(2) - tax.toFixed(2))}
                  </div>
                </div>
                <div className="flex justify-between px-2">
                  <div className="flex flex-col text-gray-600">Tax</div>
                  <div className="flex items-end text-gray-600">
                    ₹ {tax.toFixed(2)}
                  </div>
                </div>
                {totalPrice < 1 && (
                  <div className="flex justify-between px-2 pt-2">
                    <div className="flex flex-col text-gray-600">
                      Shipping Charges
                    </div>
                    <div className="flex items-end text-gray-600">₹ 25</div>
                  </div>
                )}
                {totalPrice > 495 && (
                  <div className="flex justify-between px-2 pt-2">
                    <div className="flex flex-col text-gray-600">
                      Shipping Charges
                    </div>
                    <div className="flex items-end text-gray-600">
                      <span className="text-green-500">Free </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Coupon Code Section (Only for First Time Users) */}
              {isFirstTime && (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-md my-4">
                  <div className="flex items-center mb-3">
                    <i className="ri-gift-2-line text-blue-600 text-xl mr-2"></i>
                    <h3 className="text-sm font-semibold text-blue-900">
                      First-Time Offer
                    </h3>
                  </div>
                  
                  {!couponApplied ? (
                    <div className="space-y-2">
                      <p className="text-xs text-gray-700 mb-3">
                        Use code <span className="font-bold text-blue-600">FIRST5</span> to get <span className="font-bold">5% discount</span>
                      </p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter coupon code"
                          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:border-blue-500"
                          value={couponCode}
                          onChange={(e) => {
                            setCouponCode(e.target.value);
                            setCouponError("");
                            setCouponSuccess("");
                          }}
                        />
                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-xs text-red-600 mt-2">
                          {couponError}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between bg-green-50 p-2 rounded border border-green-200">
                        <div>
                          <p className="text-xs font-medium text-green-800">
                            ✓ FIRST5 Applied
                          </p>
                          <p className="text-xs text-green-700">
                            Saved ₹{discountAmount}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveCoupon}
                          className="text-xs text-green-600 hover:text-green-800 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                      {couponSuccess && (
                        <p className="text-xs text-green-600">
                          {couponSuccess}
                        </p>
                      )}
                    </div>
                  )}
                  {errors.coupon && (
                    <p className="text-xs text-red-600 mt-2">{errors.coupon}</p>
                  )}
                </div>
              )}

              {/* Discount Line (if applied) */}
              {couponApplied && discountAmount > 0 && (
                <div className="flex justify-between px-2 pt-2 text-sm border-y">
                  <div className="flex flex-col text-green-600 font-semibold">
                    Discount (5%)
                  </div>
                  <div className="flex items-end text-green-600 font-semibold">
                    -₹{discountAmount}
                  </div>
                </div>
              )}

              {/* Total */}
              <div className="border-y mt-1 py-2">
                <div className="flex justify-between p-2">
                  <div className="flex flex-col text-gray-900 font-semibold">
                    Total
                  </div>
                  <div className="flex items-end text-gray-900 font-semibold">
                    ₹ {finalGrandTotal}
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="mt-4 flex items-center gap-2 ">
                <input type="checkbox" id="termsCheckbox" />
                <label htmlFor="termsCheckbox" className="text-md text-gray-600">
                  I accept the{" "}
                </label>
                <button
                  type="button"
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setShowTermsModal(true)}
                >
                  Terms and Conditions
                </button>
              </div>

              {/* Payment Button */}
              <div className=" flex text-md ">
                {products.length > 0 && (
                  <button
                    type="submit"
                    onClick={makePayment}
                    disabled={loading}
                    className="bg-primary w-full px-3 py-6  text-white mt-2 rounded-md flex justify-center items-center"
                  >
                    {!loading ? (
                      <span className="loading-text absolute  ">
                        Proceed to Pay
                      </span>
                    ) : (
                      <span className="loading-text absolute  ">
                        Processing
                        <span className="dot-1">.</span>
                        <span className="dot-2">.</span>
                        <span className="dot-3">.</span>
                      </span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal Popup for Terms and Conditions */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-2">
          <div className="bg-white p-4 rounded shadow-md w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Terms and Conditions</h2>
              <button
                onClick={() => setShowTermsModal(false)}
                className="text-gray-500 hover:text-gray-800 text-3xl font-bold leading-none"
              >
                &times;
              </button>
            </div>

            <ul className="list-disc list-inside text-xs text-gray-600 space-y-3">
              <li>
                Same-Day Delivery: Orders placed between 12:01 AM and 5:00 PM
                will be delivered on the same day.
              </li>
              <li>
                Next-Day Delivery: Orders placed between 5:01 PM and 11:59 PM
                will be delivered the next day before 12:00 noon.
              </li>
              <li>
                Address Changes: Deliveries will be made to the address provided
                at the time of order. Any request to change the delivery address
                may incur an additional charge of ₹25 per kilometer.
              </li>
              <li>
                Delivery Delays: We are not responsible for delivery delays due
                to incorrect addresses, natural calamities, or other unavoidable
                circumstances.
              </li>
              <li>
                Specific Delivery Times: If you require delivery at a specific
                time, kindly mention your preferred timing in the message box on
                the checkout page when placing your order.
              </li>
              <li>
                Unattended Deliveries: Our delivery agents will call your
                registered phone number when delivering one-time orders. If you
                request us to leave a delivery unattended or with security
                personnel at your address, you release us from any liability
                arising from the products being left unattended. This includes
                risks such as theft, tampering, contamination, damages, and
                temperature changes affecting chilled or frozen items.
              </li>
              <li>
                Handling Fee: A nominal handling fee of ₹25 per delivery applies
                only when your order total is less than ₹495. This fee is
                charged regardless of the number of products in your order.
              </li>
              <li>
                Transparent Pricing: All charges, fees, and costs (including
                delivery fees) associated with your purchase will be clearly
                displayed on the checkout page during the transaction. We do not
                manipulate the prices of any products or services offered on our
                platform.
              </li>
              <li>
                No Additional Charges: Customers are not required to pay any
                additional charges or tips to the delivery agent. If you wish to
                provide a gratuity, it is entirely at your discretion.
              </li>
              <li>
                Customer Support: For any clarifications or support, you can
                reach us at +8181812912 (WhatsApp) between 7:00 AM and 9:00 PM.
              </li>
              <li>
                Return Policy: In case of goods return, the process will be
                conducted in accordance with our Return Policy.
              </li>
            </ul>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default OrderSummary;