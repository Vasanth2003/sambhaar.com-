import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCards from "../../components/shop/ProductCards";
import axios from "axios";
import { getBaseUrl } from "../../util/baseURL";
import Products from "../../components/shop/Products";
import Loader from "../../components/Loader";
import { Button } from "@mui/material";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet-async";

const Category = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(11);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadMoreProducts = () => {
    setVisibleProducts((prev) => prev + 4);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${getBaseUrl()}/api/products`, {
          params: { category: categoryName },
        });

        setProducts(response.data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  return (
    <div>
      <Helmet>
        <title>{`${categoryName} - Shop Your Essentials`}</title>
        <meta
          name="description"
          content={`Find the best ${categoryName} products for your needs.`}
        />
        <meta
          name="keywords"
          content={`${categoryName}, online shopping, essentials`}
        />
      </Helmet>
      <section className="w-full justify-center bg-slate-200 py-20 md:min-h-[250px] lg:min-h-[288px]">
        <h2 className="section__header capitalize">{categoryName}</h2>
        <p className="section__subheader">
          Explore our collection of {categoryName} products, curated to suit
          your taste.
        </p>
      </section>
      {isLoading && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
      {error && <p>{error}</p>}
      {!isLoading && !error && (
        <div style={{ padding: "35px" }}>
          <ProductCards products={products.slice(0, visibleProducts)} />
          {products.length > visibleProducts && (
            <div className="mx-auto w-full flex justify-center">
              <Button
                variant="outlined"
                color="warning"
                onClick={loadMoreProducts}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  px: 4,
                  py: 2,
                  fontSize: "0.875rem", // Equivalent to 'text-sm'
                  fontWeight: 600,
                  borderRadius: "6999px", // Rounded-full
                  transition: "all 0.2s",
                  "&:hover": {
                    backgroundColor: "#ea580c",
                    color: "#fff", // Gray-50 equivalent
                  },
                  textTransform: "capitalize",
                }}
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      )}
      <Products />
      <Footer />
    </div>
  );
};

export default Category;






// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import ProductCards from "../../components/shop/ProductCards";
// import axios from "axios";
// import { getBaseUrl } from "../../util/baseURL";
// import Products from "../../components/shop/Products";
// import Loader from "../../components/Loader";
// import { Button } from "@mui/material";
// import Footer from "../../components/Footer";
// import { Helmet } from "react-helmet-async";

// const Category = () => {
//   const { categoryName } = useParams();
//   const [products, setProducts] = useState([]);
//   const [visibleProducts, setVisibleProducts] = useState(11);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const loadMoreProducts = () => {
//     setVisibleProducts((prev) => prev + 4);
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get(`${getBaseUrl()}/api/products`, {
//           params: { category: categoryName },
//         });

//         setProducts(response.data.products);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setError("Failed to load products. Please try again.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [categoryName]);

//   return (
//     <div>
//       <Helmet>
//         <title>{`${categoryName} - Shop Your Essentials`}</title>
//         <meta
//           name="description"
//           content={`Find the best ${categoryName} products for your needs.`}
//         />
//         <meta
//           name="keywords"
//           content={`${categoryName}, online shopping, essentials`}
//         />
//       </Helmet>
//       <section className="w-full justify-center bg-slate-200 py-20 md:min-h-[250px] lg:min-h-[288px]">
//         <h2 className="section__header capitalize">{categoryName}</h2>
//         <p className="section__subheader">
//           Explore our collection of {categoryName} products, curated to suit
//           your taste.
//         </p>
//       </section>
//       {isLoading && (
//         <div className="loader-container">
//           <Loader />
//         </div>
//       )}
//       {error && <p>{error}</p>}
//       {!isLoading && !error && (
//         <div style={{ padding: "35px" }}>
//           <ProductCards products={products.slice(0, visibleProducts)} />
//           {products.length > visibleProducts && (
//             <div className="mx-auto w-full flex justify-center">
//               <Button
//                 variant="outlined"
//                 color="warning"
//                 onClick={loadMoreProducts}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   px: 4,
//                   py: 2,
//                   fontSize: "0.875rem", // Equivalent to 'text-sm'
//                   fontWeight: 600,
//                   borderRadius: "6999px", // Rounded-full
//                   transition: "all 0.2s",
//                   "&:hover": {
//                     backgroundColor: "#ea580c",
//                     color: "#fff", // Gray-50 equivalent
//                   },
//                   textTransform: "capitalize",
//                 }}
//               >
//                 Load More
//               </Button>
//             </div>
//           )}
//         </div>
//       )}
//       <Products />
//       <Footer />
//     </div>
//   );
// };

// export default Category;
