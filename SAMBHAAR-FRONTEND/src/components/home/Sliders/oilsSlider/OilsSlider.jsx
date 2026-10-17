
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addToCart,
//   updateQuantity,
//   removeFromCart,
// } from "../../../../redux/features/cart/cartSlice.js";

// const OilsSlider = () => {
//   const [oils, setOils] = useState([]);

//   const dispatch = useDispatch();
//   const cartProducts = useSelector((state) => state.cart.products);

//   useEffect(() => {
//     async function fetchOils() {
//       try {
//         const res = await axios.get(
//           "http://localhost:4000/api/products?category=Oils%20%26%20Condiments&subcategory=Ready%20to%20Eat"
//         );

//         setOils(res.data.products);
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     fetchOils();
//   }, []);

//   // Find product in cart
//   const findProductInCart = (id) => {
//     return cartProducts.find((p) => p._id === id) || null;
//   };

//   // Add to cart
//   const handleAddToCart = (product) => {
//     dispatch(addToCart(product));
//   };

//   // Increase / Decrease quantity
//   const handleQuantity = (type, id) => {
//     const item = findProductInCart(id);

//     if (type === "increment") {
//       dispatch(updateQuantity({ type, id }));
//     } else {
//       if (item && item.quantity === 1) {
//         dispatch(removeFromCart({ id }));
//       } else {
//         dispatch(updateQuantity({ type, id }));
//       }
//     }
//   };

//   return (
//     <div className="px-28 pt-10">
//       <h2 className="text-xl font-bold mb-4">Ready to Eat</h2>

//       {/* Slider */}
//       <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-3">

//         {oils.map((product) => {
//           const cartItem = findProductInCart(product._id);

//           return (
//             <div
//               key={product._id}
//               className="min-w-[210px] bg-white border rounded-xl p-3 shadow-sm flex flex-col"
//             >

//               {/* Image Section */}
//               <div className="relative flex justify-center items-center h-44">

//                 {/* Discount */}
//                 {product.oldPrice && (
//                   <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded-br-lg">
//                     {Math.round(
//                       ((product.oldPrice - product.price) /
//                         product.oldPrice) *
//                         100
//                     )}
//                     % OFF
//                   </div>
//                 )}

//                 {/* ADD BUTTON */}
//                 {!product.soldout && !cartItem && (
//                   <button
//                     onClick={() => handleAddToCart(product)}
//                     className="absolute bottom-2 right-2 bg-white border-2 border-primary text-primary-dark font-bold px-4 py-1 rounded-xl shadow"
//                   >
//                     ADD
//                   </button>
//                 )}

//                 {/* Quantity Stepper */}
//                 {!product.soldout && cartItem && (
//                   <div className="absolute bottom-2 right-2 flex items-center bg-primary text-white rounded-lg">

//                     <button
//                       onClick={() =>
//                         handleQuantity("decrement", product._id)
//                       }
//                       className="px-3 py-1"
//                     >
//                       -
//                     </button>

//                     <span className="px-2">{cartItem.quantity}</span>

//                     <button
//                       onClick={() =>
//                         handleQuantity("increment", product._id)
//                       }
//                       className="px-3 py-1"
//                     >
//                       +
//                     </button>

//                   </div>
//                 )}

//                 {/* Sold Out */}
//                 {product.soldout && (
//                   <div className="absolute bg-white/70 w-full h-full flex items-center justify-center rounded-xl">
//                     <span className="text-red-600 font-bold">
//                       Sold Out
//                     </span>
//                   </div>
//                 )}

//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="h-full object-contain"
//                 />
//               </div>

//               {/* Price */}
//               <div className="mt-2 flex items-center gap-2">
//                 <span className="bg-primary text-white text-sm px-2 py-1 rounded-md font-semibold">
//                   ₹{product.price}
//                 </span>

//                 {product.oldPrice && (
//                   <span className="line-through text-gray-400 text-sm">
//                     ₹{product.oldPrice}
//                   </span>
//                 )}
//               </div>

//               {/* Discount text */}
//               {/* {product.oldPrice && (
//                 <p className="text-primary-dark text-sm font-semibold mt-1 line-through">
//                   ₹{product.oldPrice }
//                 </p>
//               )} */}

//               {/* Name */}
//               <h3 className="text-md font-semibold mt-2 leading-tight line-clamp-2">
//                 {product.name}
//               </h3>

//               {/* Weight */}
//               {product.weight  ? (
//                 <p className="text-gray-500 text-sm">
//                   {product.weight}
//                 </p>
//               ):(
//                 <div></div>
//               )}

//               {/* Rating */}
//               <div className="flex items-center gap-1 mt-2">
//                 <span className="bg-primary-light text-primary-dark text-sm px-2 py-0.5 rounded">
//                   ⭐ 4.8
//                 </span>
//                 <span className="text-gray-500 text-sm">
//                   (4.7k)
//                 </span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default OilsSlider;


