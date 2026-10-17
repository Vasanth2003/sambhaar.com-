// import React from "react";
// import { Link } from "react-router-dom";
// import dealsImg from "../../assets/milk/Banner-2.jpg";
// import prodbanner1 from "../../assets/productbanner/Atta-flour_final-web.png";
// import prodbanner2 from "../../assets/productbanner/Cooking-oil-Ghee.png";
// import prodbanner3 from "../../assets/productbanner/Dals-Pulses.png";
// import prodbanner4 from "../../assets/productbanner/Indian-Masala.png";
// import prodbanner5 from "../../assets/productbanner/Dry-fruits-nuts.png";
// import prodbanner6 from "../../assets/productbanner/Bakery.png";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";

// const DealsSection = () => {
//   const productImages1 = [
//     { src: prodbanner1, alt: "prodbanner1", path: "Atta, Sooji & Flours" },
//     { src: prodbanner2, alt: "prodbanner2", path: "Edible & Cold Pressed Oil" },
//     { src: prodbanner3, alt: "prodbanner3", path: "Dals & Pulses" },
//     { src: prodbanner4, alt: "prodbanner4", path: "Masala & Spices" },
//     { src: prodbanner5, alt: "prodbanner5", path: "Nuts & Dry Fruits" },
//     { src: prodbanner6, alt: "prodbanner6", path: "Sweets & Chocolates" },
//   ];

//   const options = {
//   slidesPerView: 6,
//   spaceBetween: 20,
//   speed: 1000,
//   loop:true,
//   autoplay: {
//     delay: 3000,
//     disableOnInteraction: false,
//   },

//   modules: [Navigation, Autoplay],

//   breakpoints: {
//     320: { slidesPerView: 2 },
//     576: { slidesPerView: 2 },
//     768: { slidesPerView: 2 },
//     992: { slidesPerView: 4 },
//     1200: { slidesPerView: 5 },
//   }
// };
 
//   return (
//     <div className="p-1 md:px-24">
//       <Swiper className="product-grid " {...options}>
//         {productImages1.map((image, index) => (
//           <SwiperSlide
//             key={index}
//             className="relative w-full bg-white rounded-lg shadow-md overflow-hidden group "
//           >
//             <img
//               src={image.src}
//               alt={image.alt}
//               className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300"></div>
//             <Link
//               to={`/subcategory/${image.path}`}
// className="absolute bottom-4 left-1/2 -translate-x-1/2 transform rounded-lg shadow-md transition-all duration-500 group-hover:scale-110 flex items-center justify-center px-2 py-1 text-xs sm:text-sm md:text-base lg:text-sm font-semibold bg-transparent bg-gradient-to-br from-[#c74227] to-[#edbb1c] hover:from-[#edbb1c] hover:to-[#c74227] hover:shadow-lg hover:shadow-orange-500/50 text-gray-50"            >
//               Order now
//             </Link>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//       <br />
// {/* 
//       <section className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col lg:flex-row items-center gap-2 p-6 lg:py-8 lg:px-12 max-w-7xl mx-auto">
//         <div className="relative lg:w-1/2">
//           <img
//             src={dealsImg}
//             alt="Fresh Milk Daily"
//             className="w-[450px] transform hover:scale-105 transition-transform duration-300 ease-in-out"
//           />
//           <div className="absolute top-4 left-4 bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg">
//             100% Fresh & Natural
//           </div>
//         </div>

//         <div className="lg:w-1/2 text-center lg:text-left">
//           <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800 leading-tight">
//             Get <span className="text-primary">Fresh Milk</span> Daily
//           </h2>
//           <p className="mt-2 text-lg text-gray-600 leading-relaxed">
//             Experience the joy of fresh, creamy milk delivered right to your
//             doorstep every morning. Your family's health deserves the best!
//           </p>
//           <ul className="mt-4 text-md text-gray-700 space-y-2">
//             <li className="flex items-center gap-2">
//               <i className="ri-check-double-line text-primary"></i> Fresh every
//               day
//             </li>
//             <li className="flex items-center gap-2">
//               <i className="ri-check-double-line text-primary"></i> Easy
//               subscription options
//             </li>
//             <li className="flex items-center gap-2">
//               <i className="ri-check-double-line text-primary"></i> Affordable
//               prices
//             </li>
//           </ul>

//           <div className="mt-6 flex flex-col lg:flex-row items-center gap-4">
//             <Link
//               to="#"
//               className="subscribe-btn text-md font-semibold shadow-md transition-all duration-300 cursor-not-allowed opacity-50"
//               onClick={(e) => e.preventDefault()} // Prevents the link from navigating
//             >
//               Coming Soon...!
//             </Link>
//           </div>
//         </div>
//       </section> */}

//       {/* <br /> */}
//       {/* <div className="product-grid"> */}
//         {/* {productImages2.map((image, index) => (
//           <div
//             key={index}
//             className="relative w-full bg-white rounded-lg shadow-md overflow-hidden group"
//           >
//             <img
//               src={image.src}
//               alt={image.alt}
//               className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300"></div>
//             <Link
//               to={`/subcategory/${image.path}`}
//               className="absolute bottom-0 left-0 mb-4 ml-4 transform translate-x-0 rounded-full shadow-md transition-all duration-500 group-hover:scale-110 flex items-center justify-center px-4 py-2 text-xs sm:text-sm md:text-base lg:text-lg font-semibold border-2 border-orange-600 bg-transparent bg-gradient-to-br from-[#c74227] to-[#edbb1c] hover:from-[#edbb1c] hover:to-[#c74227] hover:shadow-lg hover:shadow-orange-500/50 text-gray-50"
//             >
//               Get now
//             </Link>
//           </div>
//         ))} */}
//       {/* </div> */}
//     </div>
//   );
// };

// export default DealsSection;


import React from "react";
import { Link } from "react-router-dom";
import dealsImg from "../../assets/milk/Banner-2.jpg";
import prodbanner1 from "../../assets/productbanner/Atta-flour_final-web.png";
import prodbanner2 from "../../assets/productbanner/Cooking-oil-Ghee.png";
import prodbanner3 from "../../assets/productbanner/Dals-Pulses.png";
import prodbanner4 from "../../assets/productbanner/Indian-Masala.png";
import prodbanner5 from "../../assets/productbanner/Dry-fruits-nuts.png";
import prodbanner6 from "../../assets/productbanner/Bakery.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const DealsSection = () => {
  const productImages1 = [
    { src: prodbanner1, alt: "prodbanner1", path: "Atta, Sooji & Flours" },
    { src: prodbanner2, alt: "prodbanner2", path: "Edible & Cold Pressed Oil" },
    { src: prodbanner3, alt: "prodbanner3", path: "Dals & Pulses" },
    { src: prodbanner4, alt: "prodbanner4", path: "Masala & Spices" },
    { src: prodbanner5, alt: "prodbanner5", path: "Nuts & Dry Fruits" },
    { src: prodbanner6, alt: "prodbanner6", path: "Sweets & Chocolates" },
  ];

  const options = {
    slidesPerView: 6,
    spaceBetween: 20,
    speed: 1000,
    loop: true,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    modules: [Navigation, Autoplay],

    breakpoints: {
      0: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 12,
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 18,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      1280: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
      1536: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
    },
  };

  return (
    <div className="px-3 sm:px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-28 py-2">

      <Swiper className="product-grid" {...options}>
        {productImages1.map((image, index) => (
          <SwiperSlide
            key={index}
            className="relative w-full bg-white rounded-lg shadow-md overflow-hidden group"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-[110px] sm:h-[130px] md:h-[150px] lg:h-[160px] xl:h-[170px] object-cover transition-transform duration-300 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300"></div>

            <Link
              to={`/subcategory/${image.path}`}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 transform rounded-lg shadow-md transition-all duration-500 group-hover:scale-110 flex items-center justify-center px-2 sm:px-3 md:px-4 py-1 text-[10px] sm:text-xs md:text-sm lg:text-sm font-semibold bg-gradient-to-br from-[#c74227] to-[#edbb1c] hover:from-[#edbb1c] hover:to-[#c74227] hover:shadow-lg hover:shadow-orange-500/50 text-gray-50"
            >
              Order now
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <br />

    </div>
  );
};

export default DealsSection;