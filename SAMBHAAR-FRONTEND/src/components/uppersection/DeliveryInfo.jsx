import React from "react";

const deliveryData = [
  {
    title: "Same Day Delivery",
    icon: "ri-truck-line",
  },
  {
    title: "5–7 PM Delivery",
    icon: "ri-time-line",
  },
  {
    title: "Min Order ₹150",
    icon: "ri-shopping-bag-3-line",
  },
];

const DeliveryInfo = () => {
  return (
    <section className="w-full bg-gray-50 py-4 px-4 md:px-6 lg:px-0">
      
      <div className="max-w-screen-xl mx-auto">
<h1 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 md:mb-5">
  Delivery Info
</h1>        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          
          {deliveryData.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition"
            >
              
              {/* ICON */}
              <div className="bg-primary/10 text-primary p-3 rounded-lg">
                <i className={`${item.icon} text-xl`}></i>
              </div>

              {/* TEXT */}
              <p className="text-sm md:text-base font-medium text-gray-800">
                {item.title}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default DeliveryInfo;