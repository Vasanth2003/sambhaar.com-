import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  useFetchProductByIdQuery,
  useUpdateProductMutation,
} from "../../../../redux/features/products/productsApi";
import SelectInput from "../addProduct/SelectInput";
import TextInput from "../addProduct/TextInput";
import UploadImage from "../addProduct/UploadImage";
import { useFetchAllCategoriesQuery } from "../../../../redux/features/categories/categoriesApi";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [fetchCategory, setFetchCategory] = useState([]);
  const { data } = useFetchAllCategoriesQuery();

  useEffect(() => {
    if (data) {
      const formattedCategories = data.map((category) => ({
        label: category.name,
        value: category.name,
        subcategories: category.subcategories.map((subcategory) => ({
          label: subcategory.name,
          value: subcategory.name,
        })),
      }));
      setFetchCategory(formattedCategories);
    }
  }, [data]);

  const categories = fetchCategory;

  const [product, setProduct] = useState({
    name: "",
    category: "",
    brand: "",
    subcategory: "",
    price: "",
    oldPrice: "",
    description: "",
    gst: "",
    weight: "",
    bestseller: false,
    soldout: false,
    image: "",
  });

  const {
    data: productData,
    isLoading: isProductLoading,
    error: fetchError,
    refetch,
  } = useFetchProductByIdQuery(id);

  const [newImage, setNewImage] = useState(null);

  const [updateProduct, { isLoading: isUpdating, error: updateError }] =
    useUpdateProductMutation();

  useEffect(() => {
    if (productData?.product) {
      const p = productData.product;
      setProduct({
        name: p.name || "",
        category: p.category || "",
        price: p.price || "",
        description: p.description || "",
        image: p.image || "",
        brand: p.brand || "",
        subcategory: p.subcategory || "",
        oldPrice: p.oldPrice || "",
        gst: p.gst || "",
        weight: p.weight || "",
        bestseller: !!p.bestseller,
        soldout: !!p.soldout,
      });
    }
  }, [productData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setProduct((prev) => ({ ...prev, category: selectedCategory, subcategory: "" }));
  };

  const handleImageChange = (image) => {
    setNewImage(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...product,
      soldout: product.soldout === "true" || product.soldout === true,
      bestseller: product.bestseller === "true" || product.bestseller === true,
      image: newImage || product.image,
      author: user?._id,
    };

    try {
      await updateProduct({ id, ...updatedProduct }).unwrap();
      alert("Product updated successfully");
      await refetch();
      navigate("/dashboard/manage-products");
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  if (isProductLoading) return <div>Loading....</div>;
  if (fetchError) return <div>Error fetching product!...</div>;

  const selectedCategory = categories.find((cat) => cat.value === product.category);
  const subcategories = selectedCategory ? selectedCategory.subcategories : [];

  const booleanOptions = [
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
  ];

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <UploadImage
          name="image"
          id="image"
          value={newImage || product.image}
          placeholder="Image"
          setImage={handleImageChange}
        />

        <TextInput label="Product Name" name="name" placeholder="Ex: Rice" value={product.name} onChange={handleChange} />
        <TextInput label="Weight" name="weight" placeholder="Ex: 1kg or 200g" value={product.weight} onChange={handleChange} />

        <SelectInput
          label="Category"
          name="category"
          value={product.category}
          onChange={handleCategoryChange}
          options={[{ label: "Select Category", value: "" }, ...categories]}
        />

        <SelectInput
          label="Subcategory"
          name="subcategory"
          value={product.subcategory}
          onChange={handleChange}
          options={[{ label: "Select Subcategory", value: "" }, ...subcategories]}
        />

        <SelectInput
          label="Best Seller"
          name="bestseller"
          value={String(product.bestseller)}
          onChange={(e) => setProduct({ ...product, bestseller: e.target.value })}
          options={[{ label: "Select Yes or No", value: "" }, ...booleanOptions]}
        />

        <SelectInput
          label="Sold Out"
          name="soldout"
          value={String(product.soldout)}
          onChange={(e) => setProduct({ ...product, soldout: e.target.value })}
          options={[{ label: "Select Yes or No", value: "" }, ...booleanOptions]}
        />

        <TextInput label="Brand Name" name="brand" placeholder="Ex: Udhaiyam" value={product.brand} onChange={handleChange} />
        <TextInput label="SB Price" name="price" type="number" placeholder="Ex: 100" value={product.price} onChange={handleChange} />
        <TextInput label="MRP" name="oldPrice" type="number" placeholder="Ex: 200" value={product.oldPrice} onChange={handleChange} />
        <TextInput label="GST" name="gst" type="text" placeholder="Ex: 10%" value={product.gst} onChange={handleChange} />

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            id="description"
            className="mt-2 p-3 w-full border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 h-40"
            value={product.description}
            placeholder="Write a product description"
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className={`mt-4 w-full bg-orange-600 text-white py-3 px-4 rounded-md shadow-lg transition-all duration-300 ${
              isUpdating ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isUpdating ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;




// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   useFetchProductByIdQuery,
//   useUpdateProductMutation,
// } from "../../../../redux/features/products/productsApi";
// import SelectInput from "../addProduct/SelectInput";
// import TextInput from "../addProduct/TextInput";
// import UploadImage from "../addProduct/UploadImage";
// import { useFetchAllCategoriesQuery } from "../../../../redux/features/categories/categoriesApi";

// const UpdateProduct = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);

//   const [fetchCategory, setFetchCategory] = useState([]);
//   const { data } = useFetchAllCategoriesQuery();

//   useEffect(() => {
//     if (data) {
//       // Format the data to match the required structure
//       const formattedCategories = data.map((category) => ({
//         label: category.name,
//         value: category.name,
//         subcategories: category.subcategories.map((subcategory) => ({
//           label: subcategory.name,
//           value: subcategory.name,
//         })),
//       }));

//       setFetchCategory(formattedCategories); // Store the formatted categories in state
//     }
//   }, [data]);

//   const categories = fetchCategory;

//   const [product, setProduct] = useState({
//     name: "",
//     category: "",
//     brand: "",
//     subcategory: "",
//     price: "",
//     oldPrice: "",
//     description: "",
//     gst: "",
//     weight: "",
//     bestseller:"",
//     soldout:"",
//   });

//   const {
//     data: productData,
//     isLoading: isProductLoading,
//     error: fetchError,
//     refetch,
//   } = useFetchProductByIdQuery(id);
  
//   const [newImage, setNewImage] = useState(null);

//   const {
//     name,
//     category,
//     brand,
//     subcategory,
//     oldPrice,
//     gst,
//     weight,
//     description,
//     image: imageURL,
//     price,
//     bestseller,
//     soldout,
//   } = productData?.product || {};
  
//   const [updateProduct, { isLoading: isUpdating, error: updateError }] =
//     useUpdateProductMutation();
  
//   useEffect(() => {
//     if (productData) {
//       setProduct({
//         name: name || "",
//         category: category || "",
//         price: price || "",
//         description: description || "",
//         image: imageURL || "",
//         brand: brand || "",
//         subcategory: subcategory || "",
//         oldPrice: oldPrice || "",
//         gst: gst || "",
//         weight: weight || "",
//         bestseller:bestseller || "false",
//         soldout:soldout || "false"
//       });
//     }
//   }, [productData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({
//       ...product,
//       [name]: value,
//     });
//   };

//   const handleCategoryChange = (e) => {
//     const selectedCategory = e.target.value;
//     setProduct({
//       ...product,
//       category: selectedCategory,
//       subcategory: "", // Reset subcategory when category changes
//     });
//   };

//   const handleImageChange = (image) => {
//     setNewImage(image);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const updatedProduct = {
//       ...product,
//       image: newImage ? newImage : product.image,
//       author: user?._id,
//     };

//     try {
//       await updateProduct({ id: id, ...updatedProduct }).unwrap();      
//       alert("Product updated successfully");
//       await refetch();
//       navigate("/dashboard/manage-products");
//     } catch (error) {
//       console.error("Failed to update product:", error);
//     }
//   };

//   if (isProductLoading) return <div>Loading....</div>;
//   if (fetchError) return <div>Error fetching product!...</div>;

//   // Get the selected category's subcategories
//   const selectedCategory = categories.find(
//     (cat) => cat.value === product.category
//   );
//   const subcategories = selectedCategory ? selectedCategory.subcategories : [];
//   const bestSellerOptions = [{"label":"Yes",value:true},
//   {"label":"No",value:false}]

//   const soldoutOptions = [{"label":"Yes",value:true},
//   {"label":"No",value:false}]

//   return (
//     <div className="container mx-auto mt-8">
//       <h2 className="text-2xl font-bold mb-6">Update Product </h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <UploadImage
//           name="image"
//           id="image"
//           value={newImage || product.image}
//           placeholder="Image"
//           setImage={handleImageChange}
//         />

//         <TextInput
//           label="Product Name"
//           name="name"
//           placeholder="Ex: Rice"
//           value={product.name}
//           onChange={handleChange}
//         />
//         <TextInput
//           label="Weight"
//           name="weight"
//           placeholder="Ex: 1kg or 200g"
//           value={product.weight}
//           onChange={handleChange}
//         />
//         <SelectInput
//           label="Category"
//           name="category"
//           value={product.category}
//           onChange={handleCategoryChange}
//           options={[{ label: "Select Category", value: "" }, ...categories]}
//         />
//         <SelectInput
//           label="Subcategory"
//           name="subcategory"
//           value={product.subcategory}
//           onChange={handleChange}
//           options={[
//             { label: "Select Subcategory", value: "" },
//             ...subcategories,
//           ]}
//         />


//         <SelectInput
//                   label="Best Seller"
//                   name="bestseller"
//                   value={product.bestseller}
//                   onChange={(e)=>
//                     setProduct({
//                     ...product,
//                     bestseller: e.target.value === "true" ? "true" : "false",
//                     })
//                   }
//                   options={[
//             { label: "Select Yes or No", value: "" },
//             ...bestSellerOptions,
//           ]}
//                 />

//                 <SelectInput
//                   label="Sold Out"
//                   name="soldout"
//                   value={product.soldout}
//                   onChange={(e)=>
//                     setProduct({
//                     ...product,
//                     soldout: e.target.value === "true" ? "true" : "false",
//                     })
//                   }
//                   options={[
//             { label: "Select Yes or No", value: "" },
//             ...soldoutOptions,
//           ]}
//                 />        

//         <TextInput
//           label="Brand Name"
//           name="brand"
//           placeholder="Ex: Udhaiyam"
//           value={product.brand}
//           onChange={handleChange}
//         />

//         <TextInput
//           label="SB Price"
//           name="price"
//           type="number"
//           placeholder="Ex: 100"
//           value={product.price}
//           onChange={handleChange}
//         />

//         <TextInput
//           label="MRP"
//           name="oldPrice"
//           type="number"
//           placeholder="Ex: 200"
//           value={product.oldPrice}
//           onChange={handleChange}
//         />

//         <TextInput
//           label="GST"
//           name="gst"
//           type="gst"
//           placeholder="Ex: 10%"
//           value={product.gst}
//           onChange={handleChange}
//         />

//         <div>
//           <label
//             htmlFor="description"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Description
//           </label>
//           <textarea
//             name="description"
//             id="description"
//             className="mt-2 p-3 w-full border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 h-40"
//             value={product.description}
//             placeholder="Write a product description"
//             onChange={handleChange}
//           ></textarea>
//         </div>

//         <div>
//           <button
//             type="submit"
//             className={`mt-4 w-full bg-orange-600 text-white py-3 px-4 rounded-md shadow-lg transition-all duration-300 ${
//               isUpdating ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             {isUpdating ? "Updating..." : "Update Product"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateProduct;
