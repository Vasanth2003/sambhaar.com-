import React, { useEffect, useState } from "react";

import newbanner1 from "./../../assets/banners/Banner_3.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Category4 from "../../assets/icons/Fruits-&-Vegetables2.png";
import Category6 from "../../assets/icons/Healthcare & Personal Care.png";
import Category7 from "../../assets/icons/Cleaning-&-Household2.png";
import Category8 from "../../assets/icons/Pooja-Essentials2.png";
import Category9 from "../../assets/icons/Stationery2.png";

import { FaBolt, FaTruck, FaStore, FaStar, FaWhatsapp } from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  updateQuantity,
  removeFromCart,
} from "../../redux/features/cart/cartSlice";

const LandingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const slides = [
    {
      id: 1,
      image: newbanner1,
      title: "Fresh Milk Everyday",
      description: "Enjoy Fresh Milk Everyday with our new subscription feature",
    },
    {
      id: 2,
      image: newbanner1,
      title: "Groceries You'll Love",
      description: "Delicious treats for every occasion.",
    },
  ];

  const location = useLocation();
  const [active, setActive] = useState("/");
  const [popularProducts, setPopularProducts] = useState([]);
  const dispatch = useDispatch();
  const itemsPerPage = 35;
const [currentPage, setCurrentPage] = useState(1);

const totalPages = Math.ceil(popularProducts.length / itemsPerPage);

const startIndex = (currentPage - 1) * itemsPerPage;
const currentProducts = popularProducts.slice(
  startIndex,
  startIndex + itemsPerPage
);
const cartProducts = useSelector((state) => state.cart.products);

const findProductInCart = (id) => {
  return cartProducts.find((p) => p._id === id) || null;
};

const handleAddToCart = (product) => {
  dispatch(addToCart(product));
};

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

const reviews = [
  {
    name: "Bhagya Suresh",
    text: "Very good quality products. Very friendly staffs. The owners are very warm and helpful. They even home deliver groceries. Highly recommended!",
  },
  {
    name: "Andrew Abraham",
    text: "Great shopping experience near Thuraipakkam. Store is clean, organized, and fully stocked with essentials.",
  },
  {
    name: "Layola S",
    text: "Best grocery shop for all needs in one place. Excellent customer service. Loved the experience.",
  },
  {
    name: "Swathi D",
    text: "A store that blends traditional South Indian products with modern online shopping.",
  },
  {
    name: "Logi Papa",
    text: "Best place to buy groceries and daily essentials in Thoraipakkam.",
  },
  {
    name: "Salmaan Mansoori",
    text: "Very good supermarket in Thoraipakkam with affordable prices.",
  },
];
  const upperSections = [
    {
      name: "Farm Fresh",
      path: "Pooja Essentials",
      image: Category4,
      idd: "67497e06ef6a9102d46d8667",
    },
    {
      name: "Personal Care",
      path: "Health & Personal Care",
      image: Category6,
      idd: "674714906d3bc0eb4161e61a",
    },
    {
      name: "House Keeping",
      path: "Cleaning & Household",
      image: Category7,
      idd: "674714bb6d3bc0eb4161e630",
    },
    {
      name: "Pooja",
      path: "Pooja Essentials",
      image: Category8,
      idd: "67497e06ef6a9102d46d8667",
    },
    {
      name: "Stationery",
      path: "Stationery & Fancy Items",
      image: Category9,
      idd: "67497f1aef6a9102d46d870e",
    },
  ];

  useEffect(() => {
   async function fetchPopularProducts() 
   {
        const response = await fetch(`https://api.sambhaar.com/api/products/bestseller-products`);
        const data = await response.json();
        console.log(data);

setPopularProducts(data?.bestseller || []);
    } 
    fetchPopularProducts();
  }, [location]);

  return (
    <section className="relative pt-28 sm:pt-[105px]">
      
      {/* ✅ Banner Section */}
      <div className="px-4 md:px-6 lg:px-10">
        <Swiper
          spaceBetween={30}
          effect={"fade"}
          modules={[EffectFade, Navigation, Pagination, Autoplay]}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          className="w-full rounded-[12px] overflow-hidden"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[620px]">
                <img
                  className="w-full h-full object-cover"
                  src={slide.image}
                  alt={slide.title}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ✅ Shop by Category */}
      <div className="w-full px-4 md:px-6 lg:px-10 pb-10 flex flex-col items-start overflow-x-auto scrollbar-hide">
        
        <h1 className="py-5 text-left w-full text-lg font-semibold">
          Shop by Category
        </h1>

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 text-center justify-start gap-3 md:gap-4">
          {upperSections.map((item, index) => (
            <div key={index}>
              <Link
                onClick={() => setActive(item.idd)}
                to={`/homecategoryproducts/${item.idd}`}
                className="flex items-center cursor-pointer hover:scale-105 transition"
              >
                <div className="flex flex-col items-center h-28 w-28 justify-center bg-slate-200 rounded-xl">
                  
                  <div className="flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14"
                    />
                  </div>

                  {/* Optional Label */}
                  <p className="text-xs mt-2">{item.name}</p>

                  {/* Active Indicator */}
                  {active === item.idd && (
                    <motion.div
                      layoutId="activeCategory"
                      className="p-0.5 rounded-tl-full rounded-tr-full w-1/2 bg-primary mt-1"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Placeholder Section */}
  <div className="px-4 md:px-6 lg:px-10">
  <h1 className="text-lg font-semibold">Most Popular Products</h1>

 {popularProducts.length === 0 ? (
  <p className="text-gray-500 mt-2">
    No popular products available at the moment.
  </p>
) : (
  <>
    {/* ✅ Products Grid */}
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
      
      {currentProducts.map((product) => {
        const cartItem = findProductInCart(product._id);

        return (
          <div
            key={product._id}
            className="bg-white border rounded-xl p-3 shadow-sm flex flex-col"
          >
            <div className="relative flex justify-center items-center h-28 md:h-32">

              {!product.soldout && !cartItem && (
                <button
                  onClick={() => handleAddToCart(product)}
                  className="absolute bottom-2 right-2 bg-white border-2 border-primary text-primary text-xs font-bold px-3 py-1 rounded-xl shadow"
                >
                  ADD
                </button>
              )}

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

            <div className="mt-2 flex items-center gap-2">
              <span className="bg-primary text-white text-sm px-2 py-1 rounded-md font-semibold">
                ₹{product.price}
              </span>

              {product.oldPrice && (
                <span className="line-through text-gray-400 text-sm">
                  ₹{product.oldPrice}
                </span>
              )}
            </div>

            <h3 className="text-sm font-semibold mt-2 line-clamp-2">
              {product.name}
            </h3>

            {product.weight && (
              <p className="text-gray-500 text-sm">
                {product.weight}
              </p>
            )}

            {product.oldPrice && (
              <div className="text-primary text-sm mt-1">
                {Math.round(
                  ((product.oldPrice - product.price) /
                    product.oldPrice) *
                    100
                )}
                % OFF
              </div>
            )}
          </div>
        );
      })}
    </div>

    {/* ✅ Pagination Controls */}
    <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
      
      {/* Prev */}
      <button
        onClick={() => setCurrentPage((p) => p - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        ←
      </button>

      {/* Page Numbers */}
      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;

        return (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded border ${
              currentPage === page
                ? "bg-primary text-white"
                : "bg-white"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        onClick={() => setCurrentPage((p) => p + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        →
      </button>
    </div>
      <div className="">
      <h1>Save More with Details</h1>
        
      </div>

      <div className="px-4 md:px-6 lg:px-10 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

        {/* Express Delivery */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border hover:shadow-md hover:-translate-y-1 transition">
          <FaBolt className="text-primary text-3xl md:text-4xl" />
          <div>
            <h3 className="font-semibold text-sm md:text-base">
              Express Delivery
            </h3>
            <p className="text-gray-500 text-xs md:text-sm">
              Get your orders delivered within hours.
            </p>
          </div>
        </div>

        {/* Free Delivery */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border hover:shadow-md hover:-translate-y-1 transition">
          <FaTruck className="text-primary text-3xl md:text-4xl" />
          <div>
            <h3 className="font-semibold text-sm md:text-base">
              Free Delivery
            </h3>
            <p className="text-gray-500 text-xs md:text-sm">
              Enjoy free delivery on selected orders.
            </p>
          </div>
        </div>

        {/* Offline Store */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border hover:shadow-md hover:-translate-y-1 transition">
          <FaStore className="text-primary text-3xl md:text-4xl" />
          <div>
            <h3 className="font-semibold text-sm md:text-base">
              Offline Store Available
            </h3>
            <p className="text-gray-500 text-xs md:text-sm">
              Visit our store for a direct shopping experience.
            </p>
          </div>
        </div>

      </div>
    </div>

 <div className="px-4 md:px-6 lg:px-10 py-10 bg-gray-50">

      {/* Heading */}
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">
        What Our Customers Say
      </h2>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition h-full flex flex-col justify-between">
              
              {/* Stars */}
              <div className="flex gap-1 text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                "{review.text}"
              </p>

              {/* User */}
              <h4 className="font-semibold text-sm text-gray-800">
                {review.name}
              </h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>

          <div className="px-4 md:px-6 lg:px-10 py-10">
      
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left Content */}
        <div className="text-center md:text-left max-w-lg">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Send Your Grocery List via WhatsApp 🛒
          </h2>

          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Simply share your grocery list with us on WhatsApp and we’ll take care of the rest.
            Quick, easy, and hassle-free ordering from the comfort of your home.
          </p>
        </div>

        {/* Button */}
        <a
          href="https://wa.me/918181812912"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-600 transition font-semibold"
        >
          <FaWhatsapp size={20} />
          Chat on WhatsApp
        </a>

      </div>
    </div>

    <div className="px-4 md:px-6 lg:px-10 py-12">
      
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-2xl p-8 md:p-12 text-center shadow-lg">

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold">
          Start Your Grocery Shopping Now 🛒
        </h2>

        {/* Description */}
        <p className="mt-3 text-sm md:text-base max-w-2xl mx-auto text-orange-50">
          Discover fresh groceries, daily essentials, and exclusive offers — all in one place.
          Shop easily, enjoy fast delivery, and experience the convenience of modern grocery shopping.
        </p>

        {/* Button */}
        <a
          href="https://sambhaar.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 bg-white text-orange-500 font-semibold px-6 md:px-8 py-3 rounded-full shadow-md hover:bg-gray-100 transition transform hover:scale-105"
        >
          Shop Now
        </a>

      </div>

    </div>

  </>
)}
</div>
  

    </section>
  );
};

export default LandingPage;