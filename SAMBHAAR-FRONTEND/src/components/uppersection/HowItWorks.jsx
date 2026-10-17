import React from "react";

const steps = [
  {
    title: "Browse & Select",
    desc: "Explore products and choose what you need",
    icon: "ri-store-2-line",
  },
  {
    title: "Easy Checkout",
    desc: "Quick and secure payment process",
    icon: "ri-secure-payment-line",
  },
  {
    title: "Fresh Delivery",
    desc: "Get items delivered fresh to your doorstep",
    icon: "ri-truck-line",
  },
];

const HowItWorks = () => {
  return (
    <section className="w-full bg-white py-6 px-4 md:px-6 lg:px-0">
      
      <div className="max-w-screen-xl mx-auto">

        {/* Heading */}
        <h2 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 text-center md:text-left">
          How It Works
        </h2>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center md:items-start text-center md:text-left bg-gray-50 rounded-xl p-5 border border-gray-200 hover:shadow-md transition"
            >
              
              {/* ICON */}
              <div className="bg-primary/10 text-primary p-4 rounded-full mb-3">
                <i className={`${step.icon} text-2xl`}></i>
              </div>

              {/* TITLE */}
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-1">
                {step.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-600">
                {step.desc}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default HowItWorks;