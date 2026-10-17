// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";

// const TestSwiper = () => {
//   const banners = [
//     "https://via.placeholder.com/150x100?text=1",
//     "https://via.placeholder.com/150x100?text=2",
//     "https://via.placeholder.com/150x100?text=3",
//     "https://via.placeholder.com/150x100?text=4",
//     "https://via.placeholder.com/150x100?text=5",
//     "https://via.placeholder.com/150x100?text=6",
//   ];

//   return (
//     <div className="w-full px-4 py-10">
//       <Swiper
//         spaceBetween={20}
//         slidesPerView={3}
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 3000, disableOnInteraction: false }}
//         breakpoints={{
//           320: { slidesPerView: 1 },
//           640: { slidesPerView: 2 },
//           768: { slidesPerView: 3 },
//         }}
//         modules={[Pagination, Autoplay]}
//       >
//         {banners.map((url, index) => (
//           <SwiperSlide key={index}>
//             <img
//               src={url}
//               alt={`Slide ${index}`}
//               className="w-full h-32 object-contain rounded border"
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default TestSwiper;
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";

// BRAND BANNERS (Marquee)
import brandbanner1 from "../../assets/brandsbanner/Aachi_logo-e1683180461895.png";
import brandbanner2 from "../../assets/brandsbanner/Ajmi_logo-e1683180758599.png";
import brandbanner3 from "../../assets/brandsbanner/Aroma_logo-e1683180967195.png";
import brandbanner4 from "../../assets/brandsbanner/Brahmins_logo.png";
import brandbanner5 from "../../assets/brandsbanner/Elite_logo-e1683181130287.png";
import brandbanner6 from "../../assets/brandsbanner/Gbappa_logo-e1683180815457.png";
import brandbanner7 from "../../assets/brandsbanner/Idhayam_logo-e1683184686488.png";
import brandbanner8 from "../../assets/brandsbanner/Iyers_logo-e1683190056482.png";
import brandbanner9 from "../../assets/brandsbanner/Kerala-Pickle_logo-e1683181092912.png";
import brandbanner10 from "../../assets/brandsbanner/Meelas_logo.png";
import brandbanner11 from "../../assets/brandsbanner/Nambisans_logo-e1683180253644.png";
import brandbanner12 from "../../assets/brandsbanner/Periya_logo-e1683180926918.png";
import brandbanner13 from "../../assets/brandsbanner/Udhaiyam_logo-e1683180136639.png";
import brandbanner14 from "../../assets/brandsbanner/Veettamma_logo.png";

// CONTENT BANNERS (Swiper)
import contbanner1 from "../../assets/contentbanner/Cleaning.png";
import contbanner2 from "../../assets/contentbanner/Detergent.png";
import contbanner3 from "../../assets/contentbanner/Dish-wash.png";
import contbanner4 from "../../assets/contentbanner/Haircare.png";
import contbanner5 from "../../assets/contentbanner/Bath_Handwash.png";
import contbanner6 from "../../assets/contentbanner/Oral-care.png";
import contbanner7 from "../../assets/contentbanner/Subscription.png";

const PromoBanner = () => {
  const brandImages = [
    brandbanner1, brandbanner2, brandbanner3, brandbanner4, brandbanner5,
    brandbanner6, brandbanner7, brandbanner8, brandbanner9, brandbanner10,
    brandbanner11, brandbanner12, brandbanner13, brandbanner14,
  ];

  const contentImages = [
    { src: contbanner1, alt: "Cleaning", path: "Cleaning & Household" },
    { src: contbanner2, alt: "Detergent", path: "Cleaning & Household" },
    { src: contbanner3, alt: "Dish-wash", path: "Cleaning & Household" },
    { src: contbanner4, alt: "Haircare", path: "Cleaning & Household" },
    { src: contbanner5, alt: "Bath & Handwash", path: "Cleaning & Household" },
    { src: contbanner6, alt: "Oral-care", path: "Cleaning & Household" },
    { src: contbanner7, alt: "Subscription", path: "Cleaning & Household" },
  ];

  return (
    <>
      {/* 🌀 Swiper Carousel for Content Banners */}
      <div className="content-banners px-4 py-10">
        <Swiper
          spaceBetween={20}
          slidesPerView={5}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          modules={[Pagination, Autoplay]}
        >
          {contentImages.map((img, i) => (
            <SwiperSlide key={i}>
              <Link to={`/subcategory/${img.path}`}>
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-32 object-contain border rounded"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 🏃‍♂️ Marquee for Brand Banners */}
      <div className="bg-white py-20 text-center">
        <h2 className="text-2xl lg:text-5xl font-extrabold text-gray-800 leading-tight">
          South Special, <span className="text-primary">Favourite</span> Brands
        </h2>
        <p className="text-text-light mt-4 text-sm lg:text-lg">
          Trusted by millions, these brands bring quality and tradition to your home.
        </p>

        <div className="overflow-hidden mt-10">
          <div className="flex space-x-14 animate-marquee">
            {[...brandImages, ...brandImages].map((src, index) => (
              <img key={index} src={src} alt={`brand-${index}`} className="h-20 max-w-none" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PromoBanner;
