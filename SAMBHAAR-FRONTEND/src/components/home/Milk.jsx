import React from 'react'
import dealsImg from "../../assets/milk/Banner-2.jpg";
import { Link } from "react-router-dom";

const Milk = () => {
  return (
    <div>
        
              <section className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col lg:flex-row items-center gap-2 p-6 lg:py-8 lg:px-12 max-w-7xl mx-auto">
                <div className="relative lg:w-1/4 mr-9">
                  <img
                    src={dealsImg}
                    alt="Fresh Milk Daily"
                    className="w-[450px] transform hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
                  <div className="absolute top-4 left-4 bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg">
                    100% Fresh & Natural
                  </div>
                </div>
        
                <div className="lg:w-1/2 text-center lg:text-left">
                  <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800 leading-tight">
                    Get <span className="text-primary">Fresh Milk</span> Daily
                  </h2>
                  <p className="mt-2 text-lg text-gray-600 leading-relaxed">
                    Experience the joy of fresh, creamy milk delivered right to your
                    doorstep every morning. Your family's health deserves the best!
                  </p>
                  <ul className="mt-4 text-md text-gray-700 space-y-2">
                    <li className="flex items-center gap-2">
                      <i className="ri-check-double-line text-primary"></i> Fresh every
                      day
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-double-line text-primary"></i> Easy
                      subscription options
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-double-line text-primary"></i> Affordable
                      prices
                    </li>
                  </ul>
        
                  <div className="mt-6 flex flex-col lg:flex-row items-center gap-4">
                    <Link
                      to="/subscription"
                      className="subscribe-btn text-md font-semibold shadow-md transition-all duration-300  "
                      // onClick={(e) => e.preventDefault()} // Prevents the link from navigating
                    >
                      Subscribe
                    </Link>
                  </div>
                </div>
              </section>
    </div>
  )
}

export default Milk