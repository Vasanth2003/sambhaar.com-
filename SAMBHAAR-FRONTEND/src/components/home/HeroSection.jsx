// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-fade";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// import banner1 from "./../../assets/banners/new/Banner(1).jpg"
// // import banner2 from "./../../assets/banners/new/Banner (2).jpg"
// // // import banner3 from "./../../assets/banners/new/Banner (3).jpg"
// // import banner4 from "./../../assets/banners/new/Banner (4).jpg"
// // // import onam from "./../../assets/banners/new/Onam.jpg"
// // import banner6 from "./../../assets/banners/new/Banner coming.jpg"

// // import banner7 from "./../../assets/banners/new/Banner (7).jpg.png"
// // import banner8 from "./../../assets/banners/new/Banner (8).png"
// // import banner8 from "./../../assets/banners/new/Banner (8).png"
// // import banner8 from "./../../assets/banners/new/Banner (8).png"
// import newbanner1 from "./../../assets/banners/new/banner1.png"
// import newbanner2 from "./../../assets/banners/new/banner2.png"
// import mobbanner1 from "./../../assets/banners/new/Mobile(1).jpg"
// import mobbanner2 from "./../../assets/banners/new/Mobile(2).jpg"
// // import mobbanner3 from "./../../assets/banners/new/Mobile(3).jpg"
// import mobbanner4 from "./../../assets/banners/new/Mobile(4).jpg"
// // import mobonam from "./../../assets/banners/new/OnamMobile.jpg"
// import mobbanner5 from "./../../assets/banners/new/Banner coming Mobile.jpg"
// // import UpperSection from "../uppersection/UpperSection";
// const HeroSection = () => {
//   const slides = [
  
//     {
//       id: 1,
//         image: newbanner1,
//       title: "Fresh Milk Everyday",
//       description: "Enjoy Fresh Milk Everyday with our new subscription feature",
//     },
//     {
//       id: 2,
//       image: newbanner2,
//       title: "Groceries You'll Love",
//       description: "Delicious treats for every occasion.",
//     },
// //  {
// //       id: 3,
// //       image: banner3,
// //       title: "Vinayagar Chaturthi Special",
// //       description: "Celebrate this Vinayagar Chaturthi with our delightful groceries",
// //     },
//     // {
//     //   id: 4,
    
//     //    image: banner4,
//     //   title: "Groceries Delivered Fast",
//     //   description: "Quality groceries at your convenience.",
//     // },
//     //  {
//     //   id: 5,
    
//     //    image: onam,
//     //   title: "Hindu cultural festival",
//     //   description: "Kerala's annual harvest festival.",
//     // },
//     // {
//     //   id: 6,
    
//     //    image: banner2,
//     //   title: "Our New Store",
//     //   description: "Opening new store in perumbakkam",
//     // },
//     // {
//     //   id: 7,
    
//     //    image: banner7,
//     //   title: "Our New Store",
//     //   description: "Opening new store in perumbakkam",
//     // },
//     // {
//     //   id: 6,
    
//     //    image: banner8,
//     //   title: "Our New Store",
//     //   description: "Opening new store in perumbakkam",
//     // },
//   ];


//     const mobileslides = [
        
//     {
//       id: 1,
//         image: mobbanner1,
//       title: "Fresh Milk Everyday",
//       description: "Enjoy Fresh Milk Everyday with our new subscription feature",
//     },
//     {
//       id: 2,
//       image: mobbanner2,
//       title: "Groceries You'll Love",
//       description: "Delicious treats for every occasion.",
//     },
// //  {
// //       id: 3,
// //       image: mobbanner3,
// //       title: "Vinayagar Chaturthi Special",
// //       description: "Celebrate this Vinayagar Chaturthi with our delightful groceries",
// //     },
//     {
//       id: 4,
    
//        image: mobbanner4,
//       title: "Groceries Delivered Fast",
//       description: "Quality groceries at your convenience.",
//     },
//     //  {
//     //   id: 5,
    
//     //    image: mobonam,
//     //   title: "Hindu cultural festival",
//     //   description: "Kerala's annual harvest festival",
//     // },
//     {
//       id: 6,
    
//        image: mobbanner5,
//       title: "New Store",
//       description: "New store in perumbakkam",
//     },

//   ];

//   return (
//     <>
//     <section className="relative pt-[116px] sm:block hidden">
//      <img
//                 // style={{
//                 //   objectFit: "cover",
//                 //   width: "100%",
//                 //   height: "100%",
//                 // }}
//                 className="w-full h-auto object-contain "
//                src={banner1}
//               />
// {/* <Swiper
//       spaceBetween={30}
//       effect={"fade"}
//       modules={[EffectFade, Navigation, Pagination, Autoplay]}
//       autoplay={{ delay: 6000, disableOnInteraction: false }}
//       pagination={{ clickable: true }}
//       loop={true}
//       className="w-[94%] rounded-[10px]"
//     > */}
//         {/* {slides.map((slide) => (
//           <SwiperSlide key={slide.id}>
//             <div className="relative w-[1920px] h-[384px] overflow-hidden">
//                         <div className="relative w-auto sm:h-auto h-48  overflow-hidden">
//                         <div className="w-full">

//               <img
//                 // style={{
//                 //   objectFit: "cover",
//                 //   width: "100%",
//                 //   height: "100%",
//                 // }}
//                 className="w-full h-auto object-contain "
//                 src={slide.image}
//                 alt={slide.title}
//               />
//             </div>
//           </SwiperSlide>
//         ))} */}
//         <div
//           style={{
//             display: "none",
//           }}
//           className="swiper-pagination"
//         ></div>
//       {/* </Swiper>  */}
//         {/* <style>{`
//         .swiper-pagination-bullet {
//           @apply bg-gray-400 opacity-70 w-3 h-3;
//         }
//         .swiper-pagination-bullet-active {
//           @apply bg-pink-600 opacity-100 w-4 h-4;
//         }
//       `}</style> */}
//     </section>
//      {/* <section className="relative pt-[105px] sm:hidden block">
//        <Swiper
//         spaceBetween={30}
//       effect={"fade"}
//       modules={[EffectFade, Navigation, Pagination, Autoplay]}
//       autoplay={{ delay: 6000, disableOnInteraction: false }}
//       pagination={{ clickable: true }}
//       loop={true}
//       className="w-[94%] rounded-[10px]"
//       >
//         {mobileslides.map((slide) => (
//           <SwiperSlide key={slide.id}>
          
//                         <div className="w-full h-full sm:h-96  object-contain">
//               <img
//                 style={{
//                   objectFit: "cover",
//                   width: "100%",
//                   height: "100%",
//                 }}
//                 src={slide.image}
//                 alt={slide.title}
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//         <div
//           style={{
//             display: "none",
//           }}
//           className="swiper-pagination"
//         ></div>
//       </Swiper> 
        
//     </section> */}
//     </>
//   );
// };

// export default HeroSection;




import React from "react";

import desktopBanner1 from "./../../assets/banners/new/Newofferbanner-01.png";
import desktopBanner2 from "./../../assets/banners/new/banner2.png";

import mobileBanner1 from "./../../assets/banners/new/Mobile(1).jpg";
import mobileBanner2 from "./../../assets/banners/new/Mobile(2).jpg";

const HeroSection = () => {
  return (
    <section className="w-full pt-[130px] sm:pt-[120px] md:pt-[130px]">
      
      <div className="w-full max-w-screen-2xl mx-auto px-3 sm:px-4 md:px-6">
        
        {/* Desktop Banner */}
        <div className="hidden sm:block">
          <img
            src={desktopBanner1}
            alt="Banner"
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>

        {/* Mobile Banner */}
        <div className="block sm:hidden">
          <img
            src={mobileBanner1}
            alt="Mobile Banner"
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>

      </div>

    </section>
  );
};

export default HeroSection;