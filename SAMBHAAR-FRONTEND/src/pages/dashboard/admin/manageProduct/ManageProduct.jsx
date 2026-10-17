import React, { useState,useEffect ,useCallback} from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import {
  useDeleteProductMutation,
  useFetchAllProductsQuery,
  useUpdateViaExcelMutation
} from "../../../../redux/features/products/productsApi";
import { Link } from "react-router-dom";
import { formatDate } from "../../../../util/formatDate";
import Loader from "../../../../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import * as XLSX from "xlsx"; // Import XLSX for Excel export
import "react-toastify/dist/ReactToastify.css";
import { RiFilterLine } from "react-icons/ri"; // Filter icon for category and brand

const ManageProduct = () => {
  const {
    data: { products = [] } = {},
    isLoading,
    error,
    refetch,
  } = useFetchAllProductsQuery({
    category: "",
    subcategory: "",
    minPrice: "",
    maxPrice: "",
    limit: 0,
  });

  const [deleteProduct] = useDeleteProductMutation();
  const [updateViaExcel] = useUpdateViaExcelMutation();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  // State for filter visibility and selections
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [showSubCategoryFilter, setShowSubCategoryFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
   // const [paginatedProducts,setPaginatedProducts] = useState([])


    const [searchValue,setSearchValue] = useState("")

    const [searchInputOn,setSearchInputOn] = useState(false)

  const categories = [...new Set(products.map((product) => product.category))];
  const subcategories = [
    ...new Set(products.map((product) => product.subcategory)),
  ];



  const handleDeleteProduct = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (confirmDelete) {
        await deleteProduct(id).unwrap();
        toast.success("Product deleted successfully!");
        await refetch();
      }
    } catch (error) {
      toast.error("Failed to delete product. Please try again.");
    }
  };


const filteredProducts = products.filter((product) => {
  const categoryMatch =
    selectedCategories.length === 0 ||
    selectedCategories.includes(product.category);
  const subcategoryMatch =
    selectedSubCategories.length === 0 ||
    selectedSubCategories.includes(product.subcategory);
  const searchMatch = product.name
    .toLowerCase()
    .includes(searchValue.toLowerCase());

  return categoryMatch && subcategoryMatch && searchMatch;
});

const paginatedProducts = searchInputOn
  ? filteredProducts
  : filteredProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  // Handle filter change
  const handleCategoryChange = (category) => {
    setSelectedCategories((prevState) =>
      prevState.includes(category)
        ? prevState.filter((item) => item !== category)
        : [...prevState, category]
    );
  };

  const handleSubCategoryChange = (subcategory) => {
    setSelectedSubCategories((prevState) =>
      prevState.includes(subcategory)
        ? prevState.filter((item) => item !== subcategory)
        : [...prevState, subcategory]
    );
  };


  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Export all products to Excel
  const handleExportToExcel = () => {
    if (!products.length) {
      toast.error("No products available to export.");
      return;
    }

    const formattedProducts = products.map((product, index) => ({
      ID: index + 1,
      Name: product.name,
      Category: product.category || "-",
      Subcategory: product.subcategory || "-",
      Brand: product.brand || "-",
      Weight: product.weight || "-",
      Price: product.price ? `₹${product.price}` : "-",
      Date: product.createdAt ? formatDate(product.createdAt) : "-",
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedProducts);
 
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    XLSX.writeFile(workbook, "Products.xlsx");
    toast.success("Products exported to Excel successfully!");
  };

  // Total pages
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

//   const onDrop = useCallback((acceptedFiles) => {
//     const file = acceptedFiles[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const data = new Uint8Array(event.target.result);
//       const workbook = XLSX.read(data, { type: "array" });

//       // Get first sheet
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];

//       // Convert to JSON
//       const jsonData = XLSX.utils.sheet_to_json(worksheet);
//       console.log("Excel Data:", jsonData);
//       console.log(`Token:${localStorage.getItem("token")}`);
      
//       // Send to backend
//      axios.post(
//   "http://localhost:5000/api/products/bulk-update",
//   { file: jsonData },
//   {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`, // or however you store it
//     },
//   }
// )
// .then((res) => {
//   alert("Upload Successful: " + res.data.message);
// })
// .catch((err) => {
//   console.error(err);
//   alert("Upload Failed: " + err.response?.data?.message || err.message);
// });
//     };

//     reader.readAsArrayBuffer(file);
//   }, []);


//     const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
//       "application/vnd.ms-excel": [".xls"],
//     },
//   });


const onDrop = useCallback(
  async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file); // 👈 must match backend `upload.single("file")`

    try {
        const res = await updateViaExcel(formData).unwrap(); // ✅ use mutation
      alert("Upload Successful: " + res.message);
      console.log("Response:", res);
    } catch (err) {
      console.error("Upload Failed:", err);
      alert("Upload Failed: " + (err.data?.message || err.error || "Unknown error"));
    }
  },
  [updateViaExcel]
);

const { getRootProps, getInputProps, isDragActive } = useDropzone({
  onDrop,
  accept: {
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    "application/vnd.ms-excel": [".xls"],
  },
});
  return (
    <>
      {isLoading && <Loader />}
      {error && <div>Error loading products.</div>}
      <section className="overflow-hidden rounded-lg-md m-5">
        <div className="w-full mb-12 xl:mb-0 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0 ">
              <div className=" items-center">
                <div className="relative flex-1">
                  <h2 className="text-2xl font-bold mb-6">All Products</h2>
                </div>
                
                
                <div className="relative text-end  space-x-2">
                <div className="mb-4 text-sm text-start">
                Showing {paginatedProducts.length} of {filteredProducts.length}{" "}
                products
              </div>
             <input
                type="text"
                placeholder="Search by product name..."
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  setSearchInputOn(e.target.value !== "");
                  setCurrentPage(1); // reset to page 1 on new search
                }}
                className="px-3 py-2 border rounded-md text-sm w-64"
              />

                  <Link
                    to={`/dashboard/add-product`}
                    className="bg-primary text-white py-2 px-4 rounded-md shadow-md"
                  >
                    Add New Product
                  </Link>
                  <button
                    onClick={handleExportToExcel}
                    className="bg-green-500 text-white py-2 px-4 rounded-md shadow-md mb-10"
                  >
                    Export to Excel
                  </button>
                   <div
      {...getRootProps()}
      className="border-2 border-dashed mb-10 border-gray-400 rounded-lg p-10 text-center cursor-pointer hover:border-blue-500 transition"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-blue-600 font-semibold">Drop the file here...</p>
      ) : (
        <p className="text-gray-700">Drag & drop your Excel file here, or click to select</p>
      )}
    </div>
                  
                </div>
                
              </div>
              
            </div>
            <div className="block w-full overflow-x-auto">
              <table className="min-w-full table-auto border-collapse border border-gray-200">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="border border-gray-200 text-center text-sm font-medium text-gray-900 h-12">
                      ID
                    </th>
                    <th className="border border-gray-200 text-center text-sm font-medium text-gray-900 h-12">
                      Image
                    </th>
                    <th className="border border-gray-200 text-center text-sm font-medium text-gray-900 h-12">
                      Name
                    </th>
                    <th className="border border-gray-200 text-center text-sm font-medium text-gray-900 h-12">
                        Category
                      <RiFilterLine
                        size={20}
                        className="inline-block cursor-pointer ml-2"
                        onClick={() =>
                          setShowCategoryFilter(!showCategoryFilter)
                        }
                      />
                      {showCategoryFilter && (
                        <div
                          className="absolute bg-white shadow-md rounded-lg z-10 mt-2"
                          style={{
                            maxHeight: "200px",
                            overflowY: "auto",
                          }}
                        >
                          {categories.slice(0, 9).map((category) => (
                            <div
                              key={category}
                              className="flex items-center px-5 py-1 pt-2"
                            >
                              <input
                                type="checkbox"
                                id={`category-${category}`}
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCategoryChange(category)}
                                className="mr-2"
                              />
                              <label
                                htmlFor={`category-${category}`}
                                className="text-sm text-gray-700"
                              >
                                {category}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </th>
                    <th className="border border-gray-200 text-center text-sm font-medium text-gray-900 h-12">
                      Subcategory
                      <RiFilterLine
                        size={20}
                        className="inline-block cursor-pointer ml-2"
                        onClick={() =>
                          setShowSubCategoryFilter(!showSubCategoryFilter)
                        }
                      />
                      {showSubCategoryFilter && (
                        <div
                          className="absolute bg-white shadow-md rounded-lg z-10 mt-2"
                          style={{
                            maxHeight: "200px",
                            overflowY: "auto",
                          }}
                        >
                          {subcategories.map((subcategory) => (
                            <div
                              key={subcategory}
                              className="flex items-center px-5 py-1 pt-2"
                            >
                              <input
                                type="checkbox"
                                id={`subcategory-${subcategory}`}
                                checked={selectedSubCategories.includes(
                                  subcategory
                                )}
                                onChange={() =>
                                  handleSubCategoryChange(subcategory)
                                }
                                className="mr-2"
                              />
                              <label
                                htmlFor={`subcategory-${subcategory}`}
                                className="text-sm text-gray-700"
                              >
                                {subcategory}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </th>
                    <th className="border border-gray-200 text-center text-sm font-medium text-gray-900 h-12">
                      SB Price
                    </th>
                    <th className="border border-gray-200 text-center text-sm font-medium text-gray-900 h-12">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedProducts.map((product, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-200 text-sm text-center text-gray-700 h-10 ">
                        #{index + 1 + (currentPage - 1) * itemsPerPage}
                      </td>
                      <td className="border border-gray-200 flex justify-center gap-3 text-sm text-gray-700 h-10 ">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-full w-full object-contain border border-gray-300 rounded-lg"
                            src={product.image || "default-image-url"}
                            alt={product.name}
                          />
                        </div>
                      </td>
                      <td className="border border-gray-200 text-sm text-center text-gray-700 h-10  truncate max-w-[150px]">
                        {product.name}
                      </td>
                      <td className="border border-gray-200 text-sm text-center text-gray-700 h-10  truncate max-w-[150px]">
                        {product.category || "-"}
                      </td>
                      <td className="border border-gray-200 text-sm text-center text-gray-700 h-10  truncate max-w-[150px]">
                        {product.subcategory || "-"}
                      </td>
                      <td className="border border-gray-200 text-sm text-center text-gray-700 h-10 ">
                        ₹{product.price || "-"}
                      </td>
                      <td className="border border-gray-200 text-center text-sm text-gray-700 h-10 ">
                        <Link
                          to={`/dashboard/update-product/${product._id}`}
                          className="text-blue-500 hover:text-blue-700 mr-2"
                        >
                          <i className="ri-edit-box-line ri-lg"></i>
                        </Link>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <i className="ri-delete-bin-line ri-lg"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center my-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-1 text-blue-500"
              >
                Prev
              </button>

              {/* Show current page */}
              <button className="px-4 mx-0 border bg-blue-500 text-white">
                {currentPage}
              </button>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 mx-1 text-blue-500"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default ManageProduct;
















// import React, { useState } from "react";
// import {
//   useDeleteProductMutation,
//   useFetchAllProductsQuery,
// } from "../../../../redux/features/products/productsApi";
// import { Link } from "react-router-dom";
// import { formatDate } from "../../../../util/formatDate";
// import Loader from "../../../../components/Loader";
// import { ToastContainer, toast } from "react-toastify";
// import * as XLSX from "xlsx"; // Import XLSX for Excel export
// import "react-toastify/dist/ReactToastify.css";
// import { RiFilterLine } from "react-icons/ri"; // Filter icon for category and brand

// const ManageProduct = () => {
//   const {
//     data: { products = [] } = {},
//     isLoading,
//     error,
//     refetch,
//   } = useFetchAllProductsQuery({
//     category: "",
//     subcategory: "",
//     minPrice: "",
//     maxPrice: "",
//     limit: 0,
//   });

//   const [deleteProduct] = useDeleteProductMutation();

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 15;

//   // State for filter visibility and selections
//   const [showCategoryFilter, setShowCategoryFilter] = useState(false);
//   const [showSubCategoryFilter, setShowSubCategoryFilter] = useState(false);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedSubCategories, setSelectedSubCategories] = useState([]);

//   // Get unique categories and subcategories from the products
//   const categories = [...new Set(products.map((product) => product.category))];
//   const subcategories = [
//     ...new Set(products.map((product) => product.subcategory)),
//   ];

//   const handleDeleteProduct = async (id) => {
//     try {
//       const confirmDelete = window.confirm(
//         "Are you sure you want to delete this product?"
//       );
//       if (confirmDelete) {
//         await deleteProduct(id).unwrap();
//         toast.success("Product deleted successfully!");
//         await refetch();
//       }
//     } catch (error) {
//       toast.error("Failed to delete product. Please try again.");
//     }
//   };

//   // Filtered products based on selected categories and subcategories
//   const filteredProducts = products.filter((product) => {
//     const categoryMatch =
//       selectedCategories.length === 0 ||
//       selectedCategories.includes(product.category);
//     const subcategoryMatch =
//       selectedSubCategories.length === 0 ||
//       selectedSubCategories.includes(product.subcategory);

//     return categoryMatch && subcategoryMatch;
//   });

//   // Handle filter change
//   const handleCategoryChange = (category) => {
//     setSelectedCategories((prevState) =>
//       prevState.includes(category)
//         ? prevState.filter((item) => item !== category)
//         : [...prevState, category]
//     );
//   };

//   const handleSubCategoryChange = (subcategory) => {
//     setSelectedSubCategories((prevState) =>
//       prevState.includes(subcategory)
//         ? prevState.filter((item) => item !== subcategory)
//         : [...prevState, subcategory]
//     );
//   };

//   // Paginated products for the current page
//   const paginatedProducts = filteredProducts.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   // Handle page change
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   // Export all products to Excel
//   const handleExportToExcel = () => {
//     if (!products.length) {
//       toast.error("No products available to export.");
//       return;
//     }

//     const formattedProducts = products.map((product, index) => ({
//       ID: index + 1,
//       Name: product.name,
//       Category: product.category || "-",
//       Subcategory: product.subcategory || "-",
//       Brand: product.brand || "-",
//       Weight: product.weight || "-",
//       Price: product.price ? `₹${product.price}` : "-",
//       Date: product.createdAt ? formatDate(product.createdAt) : "-",
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(formattedProducts);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

//     XLSX.writeFile(workbook, "Products.xlsx");
//     toast.success("Products exported to Excel successfully!");
//   };

//   // Total pages
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

//   return (
//     <>
//       {isLoading && <Loader />}
//       {error && <div>Error loading products.</div>}
//       <section className="overflow-hidden rounded-lg-md m-5">
//         <div className="w-full mb-12 xl:mb-0 mx-auto">
//           <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
//             <div className="rounded-t mb-0 px-4 py-3 border-0">
//               <div className="flex flex-wrap items-center">
//                 <div className="relative w-full max-w-full flex-grow flex-1">
//                   <h2 className="text-2xl font-bold mb-6">All Products</h2>
//                 </div>
//                 <div className="relative w-full max-w-full flex-grow flex-1 text-end space-x-2">
//                   <Link
//                     to={`/dashboard/add-product`}
//                     className="bg-primary text-white py-2 px-4 rounded-md shadow-md"
//                   >
//                     Add New Product
//                   </Link>
//                   <button
//                     onClick={handleExportToExcel}
//                     className="bg-green-500 text-white py-2 px-4 rounded-md shadow-md"
//                   >
//                     Export to Excel
//                   </button>
//                 </div>
//               </div>
//               <h3 className="my-4 text-sm">
//                 Showing {paginatedProducts.length} of {filteredProducts.length}{" "}
//                 products
//               </h3>
//             </div>
//             <div className="block w-full overflow-x-auto">
//               <table className="min-w-full table-auto border-collapse border border-gray-200">
//                 <thead className="bg-gray-100 border-b border-gray-200">
//                   <tr>
//                     <th className="border border-gray-200 text-center text-sm font-medium text-gray-900 h-12">
//                       ID
//                     </th>
//                     <th className="border border-gray-200 text-center text-sm font-medium text-gray-900 h-12">
//                       Image
//                     </th>
//                     <th className="border border-gray-200 text-center text-sm font-medium text-gray-900 h-12">
//                       Name
//                     </th>
//                     <th className="border border-gray-200 text-center text-sm font-medium text-gray-900 h-12">
//                       Category
//                       <RiFilterLine
//                         size={20}
//                         className="inline-block cursor-pointer ml-2"
//                         onClick={() =>
//                           setShowCategoryFilter(!showCategoryFilter)
//                         }
//                       />
//                       {showCategoryFilter && (
//                         <div
//                           className="absolute bg-white shadow-md rounded-lg z-10 mt-2"
//                           style={{
//                             maxHeight: "200px",
//                             overflowY: "auto",
//                           }}
//                         >
//                           {categories.slice(0, 9).map((category) => (
//                             <div
//                               key={category}
//                               className="flex items-center px-5 py-1 pt-2"
//                             >
//                               <input
//                                 type="checkbox"
//                                 id={`category-${category}`}
//                                 checked={selectedCategories.includes(category)}
//                                 onChange={() => handleCategoryChange(category)}
//                                 className="mr-2"
//                               />
//                               <label
//                                 htmlFor={`category-${category}`}
//                                 className="text-sm text-gray-700"
//                               >
//                                 {category}
//                               </label>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </th>
//                     <th className="border border-gray-200 text-center text-sm font-medium text-gray-900 h-12">
//                       Subcategory
//                       <RiFilterLine
//                         size={20}
//                         className="inline-block cursor-pointer ml-2"
//                         onClick={() =>
//                           setShowSubCategoryFilter(!showSubCategoryFilter)
//                         }
//                       />
//                       {showSubCategoryFilter && (
//                         <div
//                           className="absolute bg-white shadow-md rounded-lg z-10 mt-2"
//                           style={{
//                             maxHeight: "200px",
//                             overflowY: "auto",
//                           }}
//                         >
//                           {subcategories.map((subcategory) => (
//                             <div
//                               key={subcategory}
//                               className="flex items-center px-5 py-1 pt-2"
//                             >
//                               <input
//                                 type="checkbox"
//                                 id={`subcategory-${subcategory}`}
//                                 checked={selectedSubCategories.includes(
//                                   subcategory
//                                 )}
//                                 onChange={() =>
//                                   handleSubCategoryChange(subcategory)
//                                 }
//                                 className="mr-2"
//                               />
//                               <label
//                                 htmlFor={`subcategory-${subcategory}`}
//                                 className="text-sm text-gray-700"
//                               >
//                                 {subcategory}
//                               </label>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </th>
//                     <th className="border border-gray-200 text-center text-sm font-medium text-gray-900 h-12">
//                       SB Price
//                     </th>
//                     <th className="border border-gray-200 text-center text-sm font-medium text-gray-900 h-12">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {paginatedProducts.map((product, index) => (
//                     <tr key={index} className="hover:bg-gray-50">
//                       <td className="border border-gray-200 text-sm text-center text-gray-700 h-10 ">
//                         #{index + 1 + (currentPage - 1) * itemsPerPage}
//                       </td>
//                       <td className="border border-gray-200 flex justify-center gap-3 text-sm text-gray-700 h-10 ">
//                         <div className="h-10 w-10 flex-shrink-0">
//                           <img
//                             className="h-full w-full object-contain border border-gray-300 rounded-lg"
//                             src={product.image || "default-image-url"}
//                             alt={product.name}
//                           />
//                         </div>
//                       </td>
//                       <td className="border border-gray-200 text-sm text-center text-gray-700 h-10  truncate max-w-[150px]">
//                         {product.name}
//                       </td>
//                       <td className="border border-gray-200 text-sm text-center text-gray-700 h-10  truncate max-w-[150px]">
//                         {product.category || "-"}
//                       </td>
//                       <td className="border border-gray-200 text-sm text-center text-gray-700 h-10  truncate max-w-[150px]">
//                         {product.subcategory || "-"}
//                       </td>
//                       <td className="border border-gray-200 text-sm text-center text-gray-700 h-10 ">
//                         ₹{product.price || "-"}
//                       </td>
//                       <td className="border border-gray-200 text-center text-sm text-gray-700 h-10 ">
//                         <Link
//                           to={`/dashboard/update-product/${product._id}`}
//                           className="text-blue-500 hover:text-blue-700 mr-2"
//                         >
//                           <i className="ri-edit-box-line ri-lg"></i>
//                         </Link>
//                         <button
//                           onClick={() => handleDeleteProduct(product._id)}
//                           className="text-red-500 hover:text-red-700"
//                         >
//                           <i className="ri-delete-bin-line ri-lg"></i>
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <div className="flex justify-center my-4">
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="px-4 py-2 mx-1 text-blue-500"
//               >
//                 Prev
//               </button>

//               {/* Show current page */}
//               <button className="px-4 mx-0 border bg-blue-500 text-white">
//                 {currentPage}
//               </button>

//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className="px-4 py-2 mx-1 text-blue-500"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//       <ToastContainer />
//     </>
//   );
// };

// export default ManageProduct;
// import React, { useState,useEffect } from "react";
// import {
//   useDeleteProductMutation,
//   useFetchAllProductsQuery,
// } from "../../../../redux/features/products/productsApi";
// import { Link } from "react-router-dom";
// import { formatDate } from "../../../../util/formatDate";
// import Loader from "../../../../components/Loader";
// import { ToastContainer, toast } from "react-toastify";
// import * as XLSX from "xlsx"; // Import XLSX for Excel export
// import "react-toastify/dist/ReactToastify.css";
// import { RiFilterLine } from "react-icons/ri"; // Filter icon for category and brand

// const ManageProduct = () => {
//   const {
//     data: { products = [] } = {},
//     isLoading,
//     error,
//     refetch,
//   } = useFetchAllProductsQuery({
//     category: "",
//     subcategory: "",
//     minPrice: "",
//     maxPrice: "",
//     limit: 0,
//   });

//   const [deleteProduct] = useDeleteProductMutation();

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 15;
//   // State for filter visibility and selections
//   const [showCategoryFilter, setShowCategoryFilter] = useState(false);
//   const [showSubCategoryFilter, setShowSubCategoryFilter] = useState(false);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedSubCategories, setSelectedSubCategories] = useState([]);
//    // const [paginatedProducts,setPaginatedProducts] = useState([])


//     const [searchValue,setSearchValue] = useState("")

//     const [searchInputOn,setSearchInputOn] = useState(false)

//   const categories = [...new Set(products.map((product) => product.category))];
//   const subcategories = [
//     ...new Set(products.map((product) => product.subcategory)),
//   ];



//   const handleDeleteProduct = async (id) => {
//     try {
//       const confirmDelete = window.confirm(
//         "Are you sure you want to delete this product?"
//       );
//       if (confirmDelete) {
//         await deleteProduct(id).unwrap();
//         toast.success("Product deleted successfully!");
//         await refetch();
//       }
//     } catch (error) {
//       toast.error("Failed to delete product. Please try again.");
//     }
//   };


// const filteredProducts = products.filter((product) => {
//   const categoryMatch =
//     selectedCategories.length === 0 ||
//     selectedCategories.includes(product.category);
//   const subcategoryMatch =
//     selectedSubCategories.length === 0 ||
//     selectedSubCategories.includes(product.subcategory);
//   const searchMatch = product.name
//     .toLowerCase()
//     .includes(searchValue.toLowerCase());

//   return categoryMatch && subcategoryMatch && searchMatch;
// });

// const paginatedProducts = searchInputOn
//   ? filteredProducts
//   : filteredProducts.slice(
//       (currentPage - 1) * itemsPerPage,
//       currentPage * itemsPerPage
//     );
//   // Handle filter change
//   const handleCategoryChange = (category) => {
//     setSelectedCategories((prevState) =>
//       prevState.includes(category)
//         ? prevState.filter((item) => item !== category)
//         : [...prevState, category]
//     );
//   };

//   const handleSubCategoryChange = (subcategory) => {
//     setSelectedSubCategories((prevState) =>
//       prevState.includes(subcategory)
//         ? prevState.filter((item) => item !== subcategory)
//         : [...prevState, subcategory]
//     );
//   };


//   // Handle page change
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   // Export all products to Excel
//   const handleExportToExcel = () => {
//     if (!products.length) {
//       toast.error("No products available to export.");
//       return;
//     }

//     const formattedProducts = products.map((product, index) => ({
//       ID: index + 1,
//       Name: product.name,
//       Category: product.category || "-",
//       Subcategory: product.subcategory || "-",
//       Brand: product.brand || "-",
//       Weight: product.weight || "-",
//       Price: product.price ? `₹${product.price}` : "-",
//       Date: product.createdAt ? formatDate(product.createdAt) : "-",
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(formattedProducts);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

//     XLSX.writeFile(workbook, "Products.xlsx");
//     toast.success("Products exported to Excel successfully!");
//   };

//   // Total pages
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

//   return (
//     <>
//       {isLoading && <Loader />}
//       {error && <div>Error loading products.</div>}
//       <section className="overflow-hidden rounded-lg-md m-5">
//         <div className="w-full mb-12 xl:mb-0 mx-auto">
//           <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
//             <div className="rounded-t mb-0 px-4 py-3 border-0 ">
//               <div className=" items-center">
//                 <div className="relative flex-1">
//                   <h2 className="text-2xl font-bold mb-6">All Products</h2>
//                 </div>
                
                
//                 <div className="relative text-end  space-x-2">
//                 <div className="mb-4 text-sm text-start">
//                 Showing {paginatedProducts.length} of {filteredProducts.length}{" "}
//                 products
//               </div>
//              <input
//                 type="text"
//                 placeholder="Search by product name..."
//                 value={searchValue}
//                 onChange={(e) => {
//                   setSearchValue(e.target.value);
//                   setSearchInputOn(e.target.value !== "");
//                   setCurrentPage(1); // reset to page 1 on new search
//                 }}
//                 className="px-3 py-2 border rounded-md text-sm w-64"
//               />
// {/* 
//                     <Link className=" bg-blue-300 rounded-md  py-2 px-4 hover:text-primary " to="/search">
//                      Search Product <i className="ri-search-line ri-lg "></i>
//                     </Link> */}
//                   <Link
//                     to={`/dashboard/add-product`}
//                     className="bg-primary text-white py-2 px-4 rounded-md shadow-md"
//                   >
//                     Add New Product
//                   </Link>
//                   <button
//                     onClick={handleExportToExcel}
//                     className="bg-green-500 text-white py-2 px-4 rounded-md shadow-md"
//                   >
//                     Export to Excel
//                   </button>
                  
                  
//                 </div>
                
//               </div>
              
//             </div>
//             <div className="block w-full overflow-x-auto">
//               <table className="min-w-full table-auto border-collapse border border-gray-200">
//                 <thead className="bg-gray-100 border-b border-gray-200">
//                   <tr>
//                     <th className="border border-gray-200 text-center text-sm font-medium text-gray-900 h-12">
//                       ID
//                     </th>
//                     <th className="border border-gray-200 text-center text-sm font-medium text-gray-900 h-12">
//                       Image
//                     </th>
//                     <th className="border border-gray-200 text-center text-sm font-medium text-gray-900 h-12">
//                       Name
//                     </th>
//                     <th className="border border-gray-200 text-center text-sm font-medium text-gray-900 h-12">
//                         Category
//                       <RiFilterLine
//                         size={20}
//                         className="inline-block cursor-pointer ml-2"
//                         onClick={() =>
//                           setShowCategoryFilter(!showCategoryFilter)
//                         }
//                       />
//                       {showCategoryFilter && (
//                         <div
//                           className="absolute bg-white shadow-md rounded-lg z-10 mt-2"
//                           style={{
//                             maxHeight: "200px",
//                             overflowY: "auto",
//                           }}
//                         >
//                           {categories.slice(0, 9).map((category) => (
//                             <div
//                               key={category}
//                               className="flex items-center px-5 py-1 pt-2"
//                             >
//                               <input
//                                 type="checkbox"
//                                 id={`category-${category}`}
//                                 checked={selectedCategories.includes(category)}
//                                 onChange={() => handleCategoryChange(category)}
//                                 className="mr-2"
//                               />
//                               <label
//                                 htmlFor={`category-${category}`}
//                                 className="text-sm text-gray-700"
//                               >
//                                 {category}
//                               </label>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </th>
//                     <th className="border border-gray-200 text-center text-sm font-medium text-gray-900 h-12">
//                       Subcategory
//                       <RiFilterLine
//                         size={20}
//                         className="inline-block cursor-pointer ml-2"
//                         onClick={() =>
//                           setShowSubCategoryFilter(!showSubCategoryFilter)
//                         }
//                       />
//                       {showSubCategoryFilter && (
//                         <div
//                           className="absolute bg-white shadow-md rounded-lg z-10 mt-2"
//                           style={{
//                             maxHeight: "200px",
//                             overflowY: "auto",
//                           }}
//                         >
//                           {subcategories.map((subcategory) => (
//                             <div
//                               key={subcategory}
//                               className="flex items-center px-5 py-1 pt-2"
//                             >
//                               <input
//                                 type="checkbox"
//                                 id={`subcategory-${subcategory}`}
//                                 checked={selectedSubCategories.includes(
//                                   subcategory
//                                 )}
//                                 onChange={() =>
//                                   handleSubCategoryChange(subcategory)
//                                 }
//                                 className="mr-2"
//                               />
//                               <label
//                                 htmlFor={`subcategory-${subcategory}`}
//                                 className="text-sm text-gray-700"
//                               >
//                                 {subcategory}
//                               </label>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </th>
//                     <th className="border border-gray-200 text-center text-sm font-medium text-gray-900 h-12">
//                       SB Price
//                     </th>
//                     <th className="border border-gray-200 text-center text-sm font-medium text-gray-900 h-12">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {paginatedProducts.map((product, index) => (
//                     <tr key={index} className="hover:bg-gray-50">
//                       <td className="border border-gray-200 text-sm text-center text-gray-700 h-10 ">
//                         #{index + 1 + (currentPage - 1) * itemsPerPage}
//                       </td>
//                       <td className="border border-gray-200 flex justify-center gap-3 text-sm text-gray-700 h-10 ">
//                         <div className="h-10 w-10 flex-shrink-0">
//                           <img
//                             className="h-full w-full object-contain border border-gray-300 rounded-lg"
//                             src={product.image || "default-image-url"}
//                             alt={product.name}
//                           />
//                         </div>
//                       </td>
//                       <td className="border border-gray-200 text-sm text-center text-gray-700 h-10  truncate max-w-[150px]">
//                         {product.name}
//                       </td>
//                       <td className="border border-gray-200 text-sm text-center text-gray-700 h-10  truncate max-w-[150px]">
//                         {product.category || "-"}
//                       </td>
//                       <td className="border border-gray-200 text-sm text-center text-gray-700 h-10  truncate max-w-[150px]">
//                         {product.subcategory || "-"}
//                       </td>
//                       <td className="border border-gray-200 text-sm text-center text-gray-700 h-10 ">
//                         ₹{product.price || "-"}
//                       </td>
//                       <td className="border border-gray-200 text-center text-sm text-gray-700 h-10 ">
//                         <Link
//                           to={`/dashboard/update-product/${product._id}`}
//                           className="text-blue-500 hover:text-blue-700 mr-2"
//                         >
//                           <i className="ri-edit-box-line ri-lg"></i>
//                         </Link>
//                         <button
//                           onClick={() => handleDeleteProduct(product._id)}
//                           className="text-red-500 hover:text-red-700"
//                         >
//                           <i className="ri-delete-bin-line ri-lg"></i>
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <div className="flex justify-center my-4">
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="px-4 py-2 mx-1 text-blue-500"
//               >
//                 Prev
//               </button>

//               {/* Show current page */}
//               <button className="px-4 mx-0 border bg-blue-500 text-white">
//                 {currentPage}
//               </button>

//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className="px-4 py-2 mx-1 text-blue-500"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//       <ToastContainer />
//     </>
//   );
// };

// export default ManageProduct;
