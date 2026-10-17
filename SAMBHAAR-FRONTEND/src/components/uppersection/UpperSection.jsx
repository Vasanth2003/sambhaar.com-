
import React, { useState } from "react";
import Category4 from "../../assets/icons/Fruits-&-Vegetables2.png";
import Category5 from "../../assets/icons/All.png";
import Category6 from "../../assets/icons/Healthcare & Personal Care.png";
import Category7 from "../../assets/icons/Cleaning-&-Household2.png";
import Category8 from "../../assets/icons/Pooja-Essentials2.png";
import Category9 from "../../assets/icons/Stationery2.png";

import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const UpperSection = () => {
  const location = useLocation();
  const [active, setActive] = useState("/");

  const upperSections = [
    {
      name: "All",
      path: "Health & Personal Care",
      image: Category5,
      idd: "674714906d3bc0eb4161e61a",
      pathUrl: "/",
    },
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

  return (
    <div className="w-full px-3 sm:px-4 md:px-8 md:pl-0 lg:pl-24 flex items-center overflow-x-auto bg-gray-100 scrollbar-hide">

      <div className="flex md:grid md:grid-cols-6 text-center gap-2 md:gap-4 lg:gap-2">

        {upperSections.map((item, index) => (
          <div key={index}>
            
            {/* ALL CATEGORY */}
            {item.pathUrl === "/" ? (
              <Link
                onClick={() => setActive(item.path)}
                to="/"
              >
                <div className="flex items-center cursor-pointer hover:scale-105 transition">

                  <div className="flex flex-col justify-center items-center">

                    <div className="rounded-xl min-w-[110px] md:min-w-[120px] lg:w-40 h-12 md:h-14 flex items-center justify-center gap-1">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-7 h-7 md:w-8 md:h-8"
                      />

                      <div className="text-xs md:text-sm lg:text-md text-primary">
                        {item.name}
                      </div>

                    </div>

                    {location.pathname === "/" && (
                      <motion.div
                        layoutId="activeCategory"
                        className="p-0.5 rounded-tl-full rounded-tr-full w-1/2 bg-primary"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}

                  </div>

                </div>
              </Link>
            ) : (
              
              /* OTHER CATEGORIES */
              <Link
                onClick={() => setActive(item.idd)}
                to={`/homecategoryproducts/${item.idd}`}
              >
                <div className="flex flex-col items-center">

                  <div className="flex items-center cursor-pointer hover:scale-105 transition">

                    <div className="rounded-xl min-w-[110px] md:min-w-[130px] lg:w-40 h-12 md:h-14 flex gap-1 items-center justify-center">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9"
                      />

                      <div className="text-xs md:text-sm lg:text-md text-primary">
                        {item.name}
                      </div>

                    </div>

                  </div>

                  {active === item.idd && (
                    <motion.div
                      layoutId="activeCategory"
                      className="p-0.5 rounded-tl-full rounded-tr-full w-1/2 bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}

                </div>
              </Link>
            )}

          </div>
        ))}

      </div>
    </div>
  );
};

export default UpperSection;