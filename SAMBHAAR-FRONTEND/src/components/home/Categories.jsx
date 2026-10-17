

// import React from "react";
// import { Link } from "react-router-dom";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";

// import Category1 from "../../assets/categories/Grocery.png";
// import Category2 from "../../assets/categories/Dairy.png";
// import Category3 from "../../assets/categories/Oil.png";
// import Category4 from "../../assets/categories/Sweet.png";
// import Category5 from "../../assets/categories/Frozen.png";
// import Category6 from "../../assets/categories/Personal Care.png";
// import Category7 from "../../assets/categories/Cleaning.png";
// import Category8 from "../../assets/categories/Pooja Essentials.png";
// import Category9 from "../../assets/categories/Stationery.png";
// import Category10 from "../../assets/categories/tea.png";
// import Category11 from "../../assets/categories/veg.png";
// import Category12 from "../../assets/categories/ice.png";
// import Category13 from "../../assets/categories/dry.png";

// const Categories = () => {
//   const categories = [
//     // { name: "Browse All Categories", image: Category1, idd: "674713a16d3bc0eb4161e5cc", path:"/shop" },
//     { name: "Grocery Essentials", image: Category1, idd: "674713a16d3bc0eb4161e5cc" },
//     { name: "Dairy & Fresh Foods", image: Category2, idd: "674713d66d3bc0eb4161e5d7" },
//     { name: "Oils & Condiments", image: Category3, idd: "674714076d3bc0eb4161e5e4" },
//     { name: "Sweets & Savouries", image: Category4, idd: "674714356d3bc0eb4161e5f4" },
//     { name: "Beverages & Frozen Foods", image: Category5, idd: "674714686d3bc0eb4161e605" },
//     { name: "Fruits & Vegetables", image: Category11, idd: "674714906d3bc0eb4161e61a" },
//     { name: "Tea & Coffee", image: Category10, idd: "674714bb6d3bc0eb4161e630" },
//     { name: "Ice Creams", image: Category12, idd: "67497e06ef6a9102d46d8667" },
//     { name: "Nuts & Dry Fruits", image: Category13, idd: "67497f1aef6a9102d46d870e" },
//   ];

//   return (
// <section className="px-3 sm:px-4 md:px-6 lg:px-0 pt-48 sm:pt-16 md:pt-20  py-4 mx-auto max-w-screen-xl relative">
//       <Swiper
//         modules={[Navigation]}
//         navigation
//         spaceBetween={20}
//         breakpoints={{
//           320: { slidesPerView: 3 },
//           480: { slidesPerView: 4 },
//           640: { slidesPerView: 5 },
//           768: { slidesPerView: 6 },
//           1024: { slidesPerView: 7 },
//           1280: { slidesPerView: 8 },
//         }}
//         className="categorySwiper"
//       >
//         {categories.map((category) => (
//           <SwiperSlide key={category.name}>
//            {(category.name=="Browse All Categories") ?    
//            (
//              <Link
//               to={`${category.path}`}
//               className="flex flex-col items-center justify-between py-3  h-[180px] rounded-2xl  transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
//             >
//               <img
//                 src={category.image}
//                 alt={category.name}
//                 className="w-28 h-28 object-contain bg-gray-100  rounded-lg shadow-md"
//               />

//               <p className="font-semibold text-primary text-sm text-center line-clamp-3  h-[40px] flex justify-center  items-center">
//                 {category.name}
//               </p>
//             </Link>
//            ):
//            (
//              <Link
//               to={`/homecategoryproducts/${category.idd}`}
//               className="flex flex-col items-center justify-between py-3  h-[180px] rounded-2xl  transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
//             >
//               <img
//                 src={category.image}
//                 alt={category.name}
//                 className="w-28 h-28 object-contain bg-gray-100  rounded-lg shadow-md"
//               />

//               <p className="font-semibold text-gray-800 text-sm text-center line-clamp-3  h-[40px] flex justify-center  items-center">
//                 {category.name}
//               </p>
//             </Link>
//         )}
//           </SwiperSlide>
//         ))}
//       </Swiper>

//     </section>
//   );
// };

// export default Categories;
// import React from "react";
// import { Link } from "react-router-dom";

// import Category1 from "../../assets/categories/Grocery.png";
// import Category2 from "../../assets/categories/Dairy.png";
// import Category3 from "../../assets/categories/Oil.png";
// import Category4 from "../../assets/categories/Sweet.png";
// import Category5 from "../../assets/categories/Frozen.png";
// import Category10 from "../../assets/categories/tea.png";
// import Category11 from "../../assets/categories/veg.png";
// import Category12 from "../../assets/categories/ice.png";
// import Category13 from "../../assets/categories/dry.png";

// const Categories = () => {
//   // const categories = [
//   //   { name: "Grocery Essentials", image: Category1, idd: "674713a16d3bc0eb4161e5cc" },
//   //   { name: "Dairy & Fresh Foods", image: Category2, idd: "674713d66d3bc0eb4161e5d7" },
//   //   { name: "Oils & Condiments", image: Category3, idd: "674714076d3bc0eb4161e5e4" },
//   //   { name: "Sweets & Savouries", image: Category4, idd: "674714356d3bc0eb4161e5f4" },
//   //   { name: "Beverages & Frozen Foods", image: Category5, idd: "674714686d3bc0eb4161e605" },
//   //   { name: "Fruits & Vegetables", image: Category11, idd: "674714906d3bc0eb4161e61a" },
//   //   { name: "Tea & Coffee", image: Category10, idd: "674714bb6d3bc0eb4161e630" },
//   //   { name: "Ice Creams", image: Category12, idd: "67497e06ef6a9102d46d8667" },
//   //   { name: "Nuts & Dry Fruits", image: Category13, idd: "67497f1aef6a9102d46d870e" },
//   // ];


//   return (
//     <section className="px-4 md:px-6 lg:px-0 py-6 mx-auto max-w-screen-xl pt-[105px]">

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        
//         {/* {categories.map((category) => (
//           <Link
//             key={category.name}
//             to={`/homecategoryproducts/${category.idd}`}
//             className="flex items-center justify-between bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 h-[90px]"
//           >
            
//             <p className="text-sm md:text-base font-medium text-gray-800 w-2/3">
//               {category.name}
//             </p>

//             <img
//               src={category.image}
//               alt={category.name}
//               className="w-14 h-14 object-contain"
//             />

//           </Link>
//         ))} */}

//         {categories.map((category, index) => {
//   const isEven = index % 2 === 0;

//   return (
//     <Link
//       key={category.name}
//       to={`/homecategoryproducts/${category.idd}`}
//       className={`flex items-center justify-between rounded-xl transition p-4 h-[90px]
//         ${isEven 
//           ? "bg-orange-100 hover:bg-orange-200" 
//           : "bg-gray-100 hover:bg-gray-200"}
//       `}
//     >
      
//       {/* LEFT TEXT */}
//       <p className="text-sm md:text-base font-medium text-gray-800 w-2/3">
//         {category.name}
//       </p>

//       {/* RIGHT IMAGE */}
//       <img
//         src={category.image}
//         alt={category.name}
//         className="w-14 h-14 object-contain"
//       />

//     </Link>
//   );
// })}

//       </div>
//     </section>
//   );
// };

// export default Categories;


// import React from "react";
// import { Link } from "react-router-dom";

// import Category1 from "../../assets/categories/Grocery.png";
// import Category2 from "../../assets/categories/Dairy.png";
// import Category3 from "../../assets/categories/Oil.png";
// import Category4 from "../../assets/categories/Sweet.png";
// import Category5 from "../../assets/categories/Frozen.png";
// import Category10 from "../../assets/categories/tea.png";
// import Category11 from "../../assets/categories/veg.png";
// import Category12 from "../../assets/categories/ice.png";
// import Category13 from "../../assets/categories/dry.png";

// const Categories = () => {
// const categories = [
//   {
//     name: "Grocery Essentials",
//     image: Category1,
//     idd: "674713a16d3bc0eb4161e5cc",
//     bg: "bg-orange-200 hover:bg-orange-300",
//   },
//   {
//     name: "Dairy & Fresh Foods",
//     image: Category2,
//     idd: "674713d66d3bc0eb4161e5d7",
//     bg: "bg-blue-200 hover:bg-blue-300",
//   },
//   {
//     name: "Oils & Condiments",
//     image: Category3,
//     idd: "674714076d3bc0eb4161e5e4",
//     bg: "bg-green-200 hover:bg-green-300",
//   },
//   {
//     name: "Sweets & Savouries",
//     image: Category4,
//     idd: "674714356d3bc0eb4161e5f4",
//     bg: "bg-pink-200 hover:bg-pink-300",
//   },
//   {
//     name: "Beverages & Frozen Foods",
//     image: Category5,
//     idd: "674714686d3bc0eb4161e605",
//     bg: "bg-purple-200 hover:bg-purple-300",
//   },
//   {
//     name: "Fruits & Vegetables",
//     image: Category11,
//     idd: "674714906d3bc0eb4161e61a",
//     bg: "bg-lime-200 hover:bg-lime-300",
//   },
//   {
//     name: "Tea & Coffee",
//     image: Category10,
//     idd: "674714bb6d3bc0eb4161e630",
//     bg: "bg-yellow-200 hover:bg-yellow-300",
//   },
//   {
//     name: "Ice Creams",
//     image: Category12,
//     idd: "67497e06ef6a9102d46d8667",
//     bg: "bg-cyan-200 hover:bg-cyan-300",
//   },
//   {
//     name: "Nuts & Dry Fruits",
//     image: Category13,
//     idd: "67497f1aef6a9102d46d870e",
//     bg: "bg-amber-200 hover:bg-amber-300",
//   },
// ];

//   return (
//     <section className="px-4 md:px-6 lg:px-0 py-6 mx-auto max-w-screen-xl pt-[50px]">
      
//       {/* Title (optional) */}
//       <h2 className="text-lg font-semibold text-gray-800 mb-4">
//         Shop by Category
//       </h2>

//       {/* Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        
//         {categories.map((category) => (
//           <Link
//             key={category.name}
//             to={`/homecategoryproducts/${category.idd}`}
//             className={`flex items-center justify-between p-4 h-[100px] rounded-xl 
//             border border-gray-200 shadow-sm hover:shadow-md transition ${category.bg}`}
//           >
            
//             {/* LEFT TEXT */}
//             <p className="text-sm md:text-base font-medium text-gray-800 w-2/3">
//               {category.name}
//             </p>

//             {/* RIGHT IMAGE */}
//             <img
//               src={category.image}
//               alt={category.name}
//               className="w-14 h-14 object-contain"
//             />

//           </Link>
//         ))}

//       </div>
//     </section>
//   );
// };

// export default Categories;

import React from "react";
import { Link } from "react-router-dom";

import Category1 from "../../assets/categories/Grocery.png";
import Category2 from "../../assets/categories/Dairy.png";
import Category3 from "../../assets/categories/Oil.png";
import Category4 from "../../assets/categories/Sweet.png";
import Category5 from "../../assets/categories/Frozen.png";
import Category10 from "../../assets/categories/tea.png";
import Category11 from "../../assets/categories/veg.png";
import Category12 from "../../assets/categories/ice.png";
import Category13 from "../../assets/categories/dry.png";

const Categories = () => {
  const categories = [
    { name: "Grocery Essentials", image: Category1, idd: "674713a16d3bc0eb4161e5cc", bg: "bg-orange-200 hover:bg-orange-300" },
    { name: "Dairy & Fresh Foods", image: Category2, idd: "674713d66d3bc0eb4161e5d7", bg: "bg-blue-200 hover:bg-blue-300" },
    { name: "Oils & Condiments", image: Category3, idd: "674714076d3bc0eb4161e5e4", bg: "bg-green-200 hover:bg-green-300" },
    { name: "Sweets & Savouries", image: Category4, idd: "674714356d3bc0eb4161e5f4", bg: "bg-pink-200 hover:bg-pink-300" },
    { name: "Beverages & Frozen Foods", image: Category5, idd: "674714686d3bc0eb4161e605", bg: "bg-purple-200 hover:bg-purple-300" },
    { name: "Fruits & Vegetables", image: Category11, idd: "674714906d3bc0eb4161e61a", bg: "bg-lime-200 hover:bg-lime-300" },
    { name: "Tea & Coffee", image: Category10, idd: "674714bb6d3bc0eb4161e630", bg: "bg-yellow-200 hover:bg-yellow-300" },
    { name: "Ice Creams", image: Category12, idd: "67497e06ef6a9102d46d8667", bg: "bg-cyan-200 hover:bg-cyan-300" },
    { name: "Nuts & Dry Fruits", image: Category13, idd: "67497f1aef6a9102d46d870e", bg: "bg-amber-200 hover:bg-amber-300" },
  ];

  return (
    <section className="px-4 sm:px-5 md:px-6 lg:px-0 py-6 md:py-8 mx-auto max-w-screen-xl pt-[20px] md:pt-[50px]">
      
      {/* Title */}
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-6">
        Shop by Category
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/homecategoryproducts/${category.idd}`}
            className={`flex items-center justify-between 
            p-3 sm:p-4 
            min-h-[80px] sm:min-h-[90px] md:min-h-[100px]
            rounded-xl border border-gray-200 shadow-sm hover:shadow-md 
            transition duration-200 ${category.bg}`}
          >
            
            {/* TEXT */}
            <p className="text-xs sm:text-sm md:text-base font-medium text-gray-800 w-2/3 leading-tight">
              {category.name}
            </p>

            {/* IMAGE */}
            <img
              src={category.image}
              alt={category.name}
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain"
            />

          </Link>
        ))}

      </div>
    </section>
  );
};

export default Categories;