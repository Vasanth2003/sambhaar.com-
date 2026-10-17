import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getBaseUrl } from '../../util/baseURL';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { FaStar } from "react-icons/fa";

const GoogleReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${getBaseUrl()}/api/googlereviews`);
        setReviews(response.data);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="my-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-10">
        ⭐ Honest Words from Happy Carts
      </h2>

      {reviews.length > 0 && (
        <Swiper
          modules={[Autoplay, Navigation, EffectCoverflow]}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          // effect="coverflow"
          // coverflowEffect={{
          //   rotate: -15,
          //   stretch: 1,
          //   depth: 100,
          //   modifier: 1,
          //   slideShadows: true,
          // }}
          spaceBetween={40}
          speed={1000}
          grabCursor={true}
          breakpoints={{
            320: { slidesPerView: 1 },
            576: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index} className=' shadow-2xl'>
              <div className="bg-white/80 backdrop-blur-md border  rounded-2xl p-6 h-[280px] shadow-xl   transition-transform duration-500 ease-in-out relative overflow-hidden group">

                {/* Glowing Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-primary  md:border-primary md:group-hover:border-primary transition-all duration-500 pointer-events-none"></div>

                <h3 className="text-xl font-semibold text-black drop-shadow mb-2">
                  {review.author_name}
                </h3>

                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`mr-1 drop-shadow ${   
                        i < review.rating ? "text-primary" : "text-gray-400"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-black text-sm italic leading-relaxed drop-shadow">
                  “{review.text?.slice(0, 350) || 'No text available.'}...”
                </p>

                <div className="absolute bottom-4 left-4 text-xs text-primary">
                  {review.relative_time_description}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default GoogleReviews;
