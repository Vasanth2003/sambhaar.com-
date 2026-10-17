import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import UploadImage from "./UploadImage";
import { useFetchAllCategoriesQuery } from "../../../../redux/features/categories/categoriesApi";
import { useAddProductMutation } from "../../../../redux/features/products/productsApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getBaseUrl } from "../../../../util/baseURL";
import axios from "axios";

const AddProduct = () => {
  const { user } = useSelector((state) => state.auth);
  const [brands,setBrands]= useState([])
  const [category, setCategory] = useState([]);
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

      setCategory(formattedCategories);
    }
  }, [data]);

  useEffect(() => {
    const fetchBrands = async () => {
      const response = await axios.get(`${getBaseUrl()}/api/brands/getAllBrands`);
       const transformed =response.data.map((brand)=>({
        label:brand.name,
        value:brand.name
       }))
      setBrands(transformed);
    };
    fetchBrands();
  }, []);

  const categories = category;

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
    bestseller:"",
    brandCategory:""
  });
  const [image, setImage] = useState("");

  const [AddProduct, { isLoading }] = useAddProductMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setProduct({
      ...product,
      category: selectedCategory,
      subcategory: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !product.name ||
      !product.category ||
      !product.subcategory ||
      !product.price ||
      !product.description ||
      !product.brand ||
      !product.gst ||
      !product.weight ||
      !product.bestseller 
    ) {
      console.log(product.weight);
      
      toast.error(`Please fill all the required fields`);
      return;
    }
  
    try {
      await AddProduct({ ...product, image, author: user?._id }).unwrap();
      toast.success("Product added successfully");
  
      // Delay navigation to allow toast to display
      setTimeout(() => {
        navigate("/shop");
      }, 2000); // 2000ms = 2 seconds delay
  
      // Reset form fields
      setProduct({
        name: "",
        category: "",
        subcategory: "",
        brand: "",
        price: "",
        description: "",
        oldPrice: "",
        gst: "",
        weight: "",
        bestseller:"",
        brandCategory:""
      });
      setImage("");
    } catch (error) {
      toast.error("Failed to submit product");
    }
  };
  

  const selectedCategory = categories.find(
    (cat) => cat.value === product.category
  );
  const subcategories = selectedCategory ? selectedCategory.subcategories : [];
  const bestSellerOptions = [{"label":"Yes",value:"true"},
                             {"label":"No",value:"false"}]


  
 
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
    

        <UploadImage
          name="image"
          id="image"
          value={(e) => setImage(e.target.value)}
          placeholder="Image"
          setImage={setImage}
        />

        <TextInput
          label="Product Name"
          name="name"
          placeholder="Ex: Rice"
          value={product.name}
          onChange={handleChange}
        />
        <TextInput
          label="Weight"
          name="weight"
          placeholder="Ex: 1kg or 200g"
          value={product.weight}
          onChange={handleChange}
        />
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
          options={[
            { label: "Select Subcategory", value: "" },
            ...subcategories,
          ]}          
        />

              <SelectInput
          label="BrandCategory(Admin)"
          name="brandCategory"
          value={product.brandCategory}
          onChange={handleChange}
          options={[
            { label: "Select Brand(For Admin Use)", value: "" },
            ...brands,
          ]}          
        />
          <SelectInput
          label="BestSeller"
          name="bestseller"
          value={product.bestseller}
          onChange={handleChange}
          options={[
          { label: "Select Yes or No", value: "" },
          ...bestSellerOptions,
          ]}
        />
  
        <TextInput
          label="Brand Name"
          name="brand"
          placeholder="Ex: Udhaiyam"
          value={product.brand}
          onChange={handleChange}
        />

        <TextInput
          label="SB Price"
          name="price"
          type="number"
          placeholder="Ex: 100"
          value={product.price}
          onChange={handleChange}
        />

        <TextInput
          label="MRP"
          name="oldPrice"
          type="number"
          placeholder="Ex: 200"
          value={product.oldPrice}
          onChange={handleChange}
        />

        <TextInput
          label="GST"
          name="gst"
          type="gst"
          placeholder="Ex: 10%"
          value={product.gst}
          onChange={handleChange}
        />

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
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
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add product"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
