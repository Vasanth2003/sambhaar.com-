// import React from "react";

// const reviews = [
//   {
//     name: "Bhagya Suresh",
//     text: "Very good quality products. Very friendly staff. The owners are warm and helpful. They even home deliver groceries. Highly recommend!",
//   },
//   {
//     name: "Andrew Abraham",
//     text: "Great shopping experience. Store is clean, organized, and fully stocked with essentials.",
//   },
//   {
//     name: "Layola S",
//     text: "Best place to purchase everything in one place. Loved the customer service.",
//   },
//   {
//     name: "Sathya Natarajan",
//     text: "Great place for daily needs. Prices are better than nearby shops.",
//   },
//   {
//     name: "Haripriya",
//     text: "Very clean and neat supermarket. Had a good experience.",
//   },
//   {
//     name: "Tankul lslsm",
//     text: "Very good place to buy groceries and chocolates. Good luck!",
//   },
//   {
//     name: "Lazy Grwl",
//     text: "Amazing grocery shop with great customer support.",
//   },
//   {
//     name: "Selva Kumar",
//     text: "Very good quality products and excellent service.",
//   },
// ];

// const Reviews = () => {
//   return (
//     <section className="w-full bg-gray-50 py-8 px-4 md:px-6 lg:px-0">
      
//       <div className="max-w-screen-xl mx-auto">

//         {/* HEADER */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          
//           <h2 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">
//             Customer Reviews
//           </h2>

//           <div className="flex items-center gap-2 mt-2 md:mt-0">
//             <span className="text-2xl font-bold text-primary">4.9</span>
            
//             <div className="flex text-yellow-400">
//               {"★★★★★"}
//             </div>

//             <span className="text-sm text-gray-600">(64 reviews)</span>
//           </div>

//         </div>

//         {/* REVIEWS GRID */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          
//           {reviews.map((review, index) => (
//             <div
//               key={index}
//               className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
//             >
              
//               {/* STARS */}
//               <div className="text-yellow-400 text-sm mb-2">
//                 ★★★★★
//               </div>

//               {/* TEXT */}
//               <p className="text-sm text-gray-700 mb-4 line-clamp-4">
//                 {review.text}
//               </p>

//               {/* USER */}
//               <p className="font-semibold text-gray-800 text-sm">
//                 {review.name}
//               </p>

//               <span className="text-xs text-gray-500">
//                 9 months ago
//               </span>

//             </div>
//           ))}

//         </div>

//       </div>

//     </section>
//   );
// };

// export default Reviews;
import React, { useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const reviews = [
  {
    name: "Bhagya Suresh",
    text: "Very good quality products. Very friendly staff. The owners are warm and helpful. They even home deliver groceries. Highly recommend!",
  },
  {
    name: "Andrew Abraham",
    text: "Great shopping experience. Store is clean, organized, and fully stocked with essentials.",
  },
  {
    name: "Layola S",
    text: "Best place to purchase everything in one place. Loved the customer service.",
  },
  {
    name: "Sathya Natarajan",
    text: "Great place for daily needs. Prices are better than nearby shops.",
  },
  {
    name: "Haripriya",
    text: "Very clean and neat supermarket. Had a good experience.",
  },
  {
    name: "Tankul lslsm",
    text: "Very good place to buy groceries and chocolates. Good luck!",
  },
  {
    name: "Lazy Grwl",
    text: "Amazing grocery shop with great customer support.",
  },
  {
    name: "Selva Kumar",
    text: "Very good quality products and excellent service.",
  },
];

const Reviews = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = 340;

      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  // AUTO SLIDE
  useEffect(() => {
    const slider = scrollRef.current;

    const interval = setInterval(() => {
      if (slider) {
        const maxScrollLeft =
          slider.scrollWidth - slider.clientWidth;

        // RESET TO START
        if (slider.scrollLeft >= maxScrollLeft - 10) {
          slider.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        } else {
          slider.scrollBy({
            left: 340,
            behavior: "smooth",
          });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-gray-50 py-8 px-4 md:px-6 lg:px-0">
      <div className="max-w-screen-xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">

          <div>
            <h2 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">
              Customer Reviews
            </h2>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-2xl font-bold text-primary">
                4.9
              </span>

              <div className="flex text-yellow-400">
                ★★★★★
              </div>

              <span className="text-sm text-gray-600">
                (64 reviews)
              </span>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border bg-white shadow-sm flex items-center justify-center hover:bg-gray-100 transition"
            >
              <FaChevronLeft size={14} />
            </button>

            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border bg-white shadow-sm flex items-center justify-center hover:bg-gray-100 transition"
            >
              <FaChevronRight size={14} />
            </button>
          </div>

        </div>

        {/* SLIDER */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className="min-w-[300px] sm:min-w-[320px] bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition flex-shrink-0"
            >

              {/* STARS */}
              <div className="text-yellow-400 text-sm mb-2">
                ★★★★★
              </div>

              {/* REVIEW */}
              <p className="text-sm text-gray-700 mb-4 line-clamp-4">
                {review.text}
              </p>

              {/* USER */}
              <p className="font-semibold text-gray-800 text-sm">
                {review.name}
              </p>

              <span className="text-xs text-gray-500">
                9 months ago
              </span>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Reviews;