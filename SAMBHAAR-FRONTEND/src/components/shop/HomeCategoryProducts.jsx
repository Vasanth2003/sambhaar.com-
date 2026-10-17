// import { useEffect, useState } from "react";
// import { useParams,Link } from "react-router-dom";
// import ProductCards from "../../components/shop/ProductCards";
// import ShopFiltering from "./ShopFiltering";
// import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";
// import { useFetchAllCategoriesQuery } from "../../redux/features/categories/categoriesApi";
// import Loader from "../Loader";
// import BestSelling from "./BestSelling";
// import ShopFilteringHome from "./ShopFilteringHome";
// import { getBaseUrl } from "../../util/baseURL";
// import Products from "./Products";

// import axios from "axios";
// const HomeCategoryProducts = () => {
//   const {categoryid} = useParams();
//   console.log("Category"+categoryid);
  
//   const [categories, setCategories] = useState([]);
//   const [callShopFiltering, setCallShopFiltering] = useState(false)
//   const [subcategories,setSubcategories] = useState([])
//   const [subcategory,setSubcatagory] = useState("")


  
  
//  useEffect(() => {
//     const fetchProductsByCategoryID = async () => {
//       try {
//         const response = await axios.get(`${getBaseUrl()}/api/categories/${categoryid}`);
        
//         console.log("API Response:", response.data.subcategories);
//         setSubcategories(response.data.subcategories);

//       } catch (err) {
//         console.error("Error fetching products:", err);
//       }
//     };

//     fetchProductsByCategoryID();
//   }, []);



//     const {
//     data: { products = [] } = {},
//     error,
//     isLoading,
//   } = useFetchAllProductsQuery({
    
//     subcategory: subcategory || subcategory[0],
    
//   });
//   return (
//     <>
//       <section className="py-12 grid grid-cols-6 gap-4">
//         <div className="p-8 pt-24 fixed col-span-2">
              
//               {
//                 subcategories.length>0 && subcategories.map((subcategory,index)=>(
//                 <Link key={index} onClick={() => {
//                   setSubcatagory(subcategory.name);
//                   }} className=" ">
//                   <div  className="pb-3"> 
//                     {subcategory.name}
//                   </div>
//                   </Link>
//                 ))
//               }
              
//             </div>
//         <div className=" col-span-4">
          
//                       <ProductCards products={products}/>

//         </div>
//       </section>
//     </>
//   );
// };

// export default HomeCategoryProducts;

// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import ProductCards from "../../components/shop/ProductCards";
// import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";
// import { getBaseUrl } from "../../util/baseURL";
// import axios from "axios";
// import UpperSection from "../uppersection/UpperSection";

// const HomeCategoryProducts = () => {
//   const { categoryid } = useParams();
//   const [subcategories, setSubcategories] = useState([]);
//   const [subcategory, setSubcatagory] = useState("");

//   useEffect(() => {
//     const fetchProductsByCategoryID = async () => {
//       try {
//         const response = await axios.get(`${getBaseUrl()}/api/categories/${categoryid}`);
//         setSubcategories(response.data.subcategories || []);
//       } catch (err) {
//         console.error("Error fetching subcategories:", err);
//       }
//     };
//     fetchProductsByCategoryID();
//   }, [categoryid]);

//   const {
//     data: { products = [] } = {},
//     isLoading,
//     error,
//   } = useFetchAllProductsQuery({
//     subcategory: subcategory || subcategories[0]?.name || "",
//   });

//   const [scrolled, setScrolled] = useState(false);

// useEffect(() => {
//   const handleScroll = () => {
//     setScrolled(window.scrollY > 100); // Adjust scroll threshold as needed
//   };
//   window.addEventListener("scroll", handleScroll);
//   return () => window.removeEventListener("scroll", handleScroll);
// }, []);


//   return (
//     <section className="pt-[64px] md:pt-[150px]"> {/* Padding to avoid navbar overlap */}
//      {/* Mobile Subcategory Buttons */}
// {/* Mobile Subcategory Buttons */}
// {/* <div className="">
//     <div className="h-[1px] bg-gray-400 overflow-hidden mt-5"></div>
//     <UpperSection />
//     <div className="h-[3px] bg-gray-300 shadow-[0_2px_4px_rgba(0,0,0,0.2)] overflow-hidden"></div>
//   </div> */}
// <div
//   className={`
//     md:hidden sticky top-[100px] z-30 bg-white shadow-sm border-b border-gray-200 
//     px-4 py-3 m-2 gap-2 transition-all duration-300 ease-in-out
//     flex ${scrolled ? "flex-row flex-wrap justify-start" : "flex-col"}
//   `}
// >
//   {subcategories.map((sub, index) => (
//     <button
//       key={index}
//       onClick={() => setSubcatagory(sub.name)}
//       className={`px-2 py-1 rounded-full text-sm border  transition-colors duration-300
//         ${sub.name === subcategory
//           ? "bg-primary text-white border-orange-700"
//           : "bg-white text-gray-700 border-gray-300 hover:bg-orange-100"}`}
//     >
//       {sub.name}
//     </button>
//   ))}
// </div>



//       <div className="grid grid-cols-1 md:grid-cols-6 gap-6 px-4 md:px-12 py-6">
//         <div className="hidden md:block md:col-span-1  p-4 rounded-md sticky top-[120px] h-fit">
//           <h2 className="text-lg font-semibold mb-4 text-gray-700 pt-8">Subcategories</h2>
//           <div className="space-y-2">
//             {subcategories.map((sub, index) => (
//               <Link
//                 key={index}
//                 onClick={() => setSubcatagory(sub.name)}
//                 className={`block px-3 py-2 rounded-md cursor-pointer transition 
//                 ${sub.name === subcategory ?  ' bg-primary text-white' : 'hover:bg-orange-100 text-gray-700'}`}
//               >
//                 {sub.name}
//               </Link>
//             ))}
//           </div>
//         </div>

//         {/* Products Section */}
//         <div className="md:col-span-5">
//           {isLoading ? (
//             <div className="text-center py-12 text-lg text-gray-500">Loading products...</div>
//           ) : error ? (
//             <div className="text-center text-red-500">Error loading products.</div>
//           ) : (
//             <ProductCards products={products} />
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HomeCategoryProducts;




import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCards from "../../components/shop/ProductCards";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";
import { getBaseUrl } from "../../util/baseURL";
import axios from "axios";

const HomeCategoryProducts = () => {
  const { categoryid } = useParams();

  const [subcategories, setSubcategories] = useState([]);
  const [subcategory, setSubcatagory] = useState("");

  const [scrolled, setScrolled] = useState(false);

  /* FETCH SUBCATEGORIES */
  useEffect(() => {
    const fetchProductsByCategoryID = async () => {
      try {
        const response = await axios.get(
          `${getBaseUrl()}/api/categories/${categoryid}`
        );
        setSubcategories(response.data.subcategories || []);
      } catch (err) {
        console.error("Error fetching subcategories:", err);
      }
    };

    fetchProductsByCategoryID();
  }, [categoryid]);

  /* PRODUCTS API */
  const {
    data: { products = [] } = {},
    isLoading,
    error,
  } = useFetchAllProductsQuery({
    subcategory: subcategory || subcategories[0]?.name || "",
  });

  /* MOBILE SCROLL */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="pt-[64px] md:pt-[140px] lg:pt-[150px]">

      {/* MOBILE SUBCATEGORY BAR */}
      <div
        className={`md:hidden sticky top-[100px] z-30 bg-white shadow-sm border-b border-gray-200 pt-24
        pb-4 py-3 m-2 gap-2 transition-all duration-300 ease-in-out
        flex ${scrolled ? "flex-row flex-wrap justify-start" : "flex-col"}`}
      >
        {subcategories.map((sub, index) => (
          <button
            key={index}
            onClick={() => setSubcatagory(sub.name)}
            className={`px-3 py-1 rounded-full text-sm border transition-colors duration-300
            ${
              sub.name === subcategory
                ? "bg-primary text-white border-orange-700"
                : "bg-white text-gray-700 border-gray-300 hover:bg-orange-100"
            }`}
          >
            {sub.name}
          </button>
        ))}
      </div>

      {/* MAIN LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 px-4 sm:px-6 md:px-10 lg:px-12 py-6">

        {/* SIDEBAR */}
        <div className="hidden md:block md:col-span-2 lg:col-span-1 p-4 rounded-md sticky top-[120px] h-fit">

          <h2 className="text-lg font-semibold mb-4 text-gray-700 pt-8">
            Subcategories
          </h2>

          <div className="space-y-2">
            {subcategories.map((sub, index) => (
              <Link
                key={index}
                onClick={() => setSubcatagory(sub.name)}
                className={`block px-3 py-2 rounded-md cursor-pointer transition
                ${
                  sub.name === subcategory
                    ? "bg-primary text-white"
                    : "hover:bg-orange-100 text-gray-700"
                }`}
              >
                {sub.name}
              </Link>
            ))}
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="md:col-span-4 lg:col-span-5">

          {isLoading ? (
            <div className="text-center py-12 text-lg text-gray-500">
              Loading products...
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              Error loading products.
            </div>
          ) : (
            <ProductCards products={products} />
          )}

        </div>

      </div>
    </section>
  );
};

export default HomeCategoryProducts;