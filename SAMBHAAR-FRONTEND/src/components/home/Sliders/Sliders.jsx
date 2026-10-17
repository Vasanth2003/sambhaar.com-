import React from "react";
import ProductSlider from "./ProductSlider";
import { getBaseUrl } from "../../../util/baseURL";
import Logo from "../../../../public/sambhaar.png"
const sliders = [
  {
    path: "subcategory/Milk, Ghee & Dairy Products",
    title: "Milks & Dairy Products",
    category: "Dairy & Fresh Foods",
    subcategory: "Milk, Ghee & Dairy Products",
  },
  {
    path: "subcategory/Edible & Cold Pressed Oil",
    title: "Edible Oils",
    category: "Oils & Condiments",
    subcategory: "Edible & Cold Pressed Oil",
  },
  {
    path: "subcategory/Rice & Rice Products",
    title: "Rice",
    category: "Grocery Essentials",
    subcategory: "Rice & Rice Products",
  },
  {
    path: "subcategory/Ice Creams",
    title: "Ice Creams",
    category: "Beverages & Frozen Foods",
    subcategory: "Ice Creams",
  },
  {
    path: "subcategory/Sweets & Chocolates",
    title: "Chocolates",
    category: "Sweets & Savouries",
    subcategory: "Sweets & Chocolates",
  },
  {
    path: "subcategory/Dals & Pulses",
    title: "Dal & Pulses",
    category: "Grocery Essentials",
    subcategory: "Dals & Pulses",
  },
  {
    path: "subcategory/Beauty & Personal Care",
    title: "Beauty & Personal Care",
    category: "Health & Personal Care",
    subcategory: "Beauty & Personal Care",
  },
  {
    path: "subcategory/Health drink",
    title: "Health Drinks",
    category: "Beverages & Frozen Foods",
    subcategory: "Health drink",
  },
  {
    path: "subcategory/Agarbathi & Sambrani",
    title: "Agarbathi & Sambrani",
    category: "Pooja Essentials",
    subcategory: "Agarbathi & Sambrani",
  },
  {
    path: "subcategory/Herbals",
    title: "Herbals",
    category: "Beverages & Frozen Foods",
    subcategory: "Herbals",
  },
  {
    path: "subcategory/Masala & Spices",
    title: "Masala & Spices",
    category: "Oils & Condiments",
    subcategory: "Masala & Spices",
  },
  {
    path: "subcategory/Bread & Bakery Products",
    title: "Bread & Bakery Products",
    category: "Dairy & Fresh Foods",
    subcategory: "Bread & Bakery Products",
  },
  {
    path: "subcategory/Baby Care",
    title: "Baby Care",
    category: "Health & Personal Care",
    subcategory: "Baby Care",
  },
   {
    path: "subcategory/Noodles & Pasta's",
    title: "Noodles & Pasta's",
    category: "Grocery Essentials",
    subcategory: "Noodles & Pasta's",
  },
   {
    path: "subcategory/Batter",
    title: "Batter",
    category: "Dairy & Fresh Foods",
    subcategory: "Batter",
  },
  {
    path: "subcategory/Dips & Sauces",
    title: "Dips & Sauces",
    category: "Oils & Condiments",
    subcategory: "Dips & Sauces",
  },
   {
    path: "subcategory/Women Wellness",
    title: "Women Wellness",
    category: "Health & Personal Care",
    subcategory: "Women Wellness",
  },
   {
    path: "subcategory/Men Wellness",
    title: "Men Wellness",
    category: "Health & Personal Care",
    subcategory: "Men Wellness",
  },
];

const Sliders = () => {
  return (
    <div>
      {sliders.map((slider, index) => {
        const fetchUrl = `${getBaseUrl()}/api/products?category=${encodeURIComponent(
          slider.category
        )}&subcategory=${encodeURIComponent(slider.subcategory)}`;

        return (
          <div key={index}>
          {/* <img src={Logo} alt="Logo" className=""/> */}
          <ProductSlider
            
            path={slider.path}
            title={slider.title}
            fetchUrl={fetchUrl}
          />
          </div>
        );
      })}
    </div>
  );
};

export default Sliders;