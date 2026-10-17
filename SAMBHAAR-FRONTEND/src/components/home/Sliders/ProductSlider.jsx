import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  updateQuantity,
  removeFromCart,
} from "../../../redux/features/cart/cartSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductSlider = ({ fetchUrl, title, path }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.products);

 useEffect(() => {
  async function fetchProducts() {
    try {
      setLoading(true);
      const res = await axios.get(fetchUrl);
      setProducts(res.data?.products || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (fetchUrl) fetchProducts();
}, [fetchUrl]);

if (loading) {
  return (
    <div className="flex justify-center items-center h-40">
      <motion.img
        src="/sambhaar.png"
        alt="Loading..."
        className=" w-64 "
        animate={{ opacity: [0.7, 0.3, 0.7] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
  // Find cart product
  const findProductInCart = (id) => {
    return cartProducts.find((p) => p._id === id) || null;
  };

  // Add to cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  // Quantity logic
  const handleQuantity = (type, id) => {
    const item = findProductInCart(id);

    if (type === "increment") {
      dispatch(updateQuantity({ type, id }));
    } else {
      if (item && item.quantity === 1) {
        dispatch(removeFromCart({ id }));
      } else {
        dispatch(updateQuantity({ type, id }));
      }
    }
  };

  return (
  <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-28 ">
  <div className="flex items-center justify-between mb-4">
  <h2 className="text-lg sm:text-xl md:text-2xl font-bold">{title}</h2>      <Link to={path}>

 <motion.div 
   whileHover={{ x: 4 }}
  transition={{ type: "spring", stiffness: 300 }}
 className="group relative flex items-center gap-2 font-semibold text-primary cursor-pointer w-fit">
  <span>See more</span>

  <i className="ri-arrow-right-line text-lg transition-all duration-300 group-hover:translate-x-2"></i>

  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
</motion.div>
      </Link>
      </div>
<div className="flex gap-3 sm:gap-4 md:gap-3 overflow-x-auto scrollbar-hide pb-3">
        {products.map((product) => {
          const cartItem = findProductInCart(product._id);

          return (
            <div
              key={product._id}
              className="min-w-[120px] sm:min-w-[180px] md:min-w-[150px] bg-white border rounded-xl p-2 sm:p-3   shadow-sm flex flex-col"            >
              {/* Image */}
              <div 
              className="relative flex justify-center items-center h-24 sm:h-28 md:h-32">

                {/* Discount */}
              

                {/* Add Button */}
                {!product.soldout && !cartItem && (
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="absolute bottom-2 right-2 bg-white border-2 border-primary text-primary-dark text-xs sm:text-sm font-bold px-2 sm:px-4 py-1 rounded-xl shadow"                  >
                    ADD
                  </button>
                )}

                {/* Quantity */}
                {!product.soldout && cartItem && (
                  <div className="absolute bottom-2 right-2 flex items-center bg-primary text-white rounded-lg">

                    <button
                      onClick={() =>
                        handleQuantity("decrement", product._id)
                      }
                      className="px-3 py-1"
                    >
                      -
                    </button>

                    <span className="px-2">{cartItem.quantity}</span>

                    <button
                      onClick={() =>
                        handleQuantity("increment", product._id)
                      }
                      className="px-3 py-1"
                    >
                      +
                    </button>

                  </div>
                )}

                {/* Sold out */}
                {product.soldout && (
                  <div className="absolute bg-white/70 w-full h-full flex items-center justify-center rounded-xl">
                    <span className="text-red-600 font-bold">
                      Sold Out
                    </span>
                  </div>
                )}

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full object-contain"
                />
              </div>

              {/* Price */}
              <div className="mt-2 flex items-center gap-2">
                <span className="bg-primary text-white text-xs sm:text-sm px-2 py-1 rounded-md font-semibold">
                  ₹{product.price}
                </span>

                {product.oldPrice && (
                  <span className="line-through text-gray-400 text-sm">
                    ₹{product.oldPrice}
                  </span>
                )}
              </div>

              {/* Name */}
              <h3 className="text-sm sm:text-md font-semibold mt-2 leading-tight line-clamp-2">
                {product.name}
              </h3>

              {/* Weight */}
              {product.weight && (
                <p className="text-gray-500 text-sm">
                  {product.weight}
                </p>
              )}


                {product.oldPrice && (
                  <div className="  text-primary text-sm  py-1 rounded-br-lg">
                    {Math.round(
                      ((product.oldPrice - product.price) /
                        product.oldPrice) *
                        100
                    )}
                    % OFF
                  </div>
                )}

              {/* Rating */}
              {/* <div className="flex items-center gap-1 mt-2">
                <span className="bg-primary-light text-primary-dark text-sm px-2 py-0.5 rounded">
                  ⭐ 4.8
                </span>
                <span className="text-gray-500 text-sm">
                  (4.7k)
                </span>
              </div> */}

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSlider;