import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextInput from "./TextInput";
import UploadImage from "./UploadImage";
import { useAddBlogMutation } from "../../../../redux/features/blogs/blogsApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from "react-quill"; // Import Quill editor
import "react-quill/dist/quill.snow.css"; // Import Quill CSS

const AddBlog = () => {
  const { user } = useSelector((state) => state.auth);

  const [blog, setBlog] = useState({
    title: "",
    description: "",
  });
  const [image, setImage] = useState("");

  const [AddBlog, { isLoading }] = useAddBlogMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({
      ...blog,
      [name]: value,
    });
  };

  const handleDescriptionChange = (value) => {
    setBlog({
      ...blog,
      description: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!blog.title || !blog.description || !image) {
      toast.error("Please fill all the required fields");
      return;
    }

    try {
      // Add blog through API
      await AddBlog({ ...blog, image, author: user?._id }).unwrap();
      toast.success("Blog added successfully");

      // Delay navigation to allow toast to display
      setTimeout(() => {
        navigate("/dashboard/manage-blogs"); // Navigate to Manage Blogs
      }, 2000); // 2000ms = 2 seconds delay

      // Reset form fields
      setBlog({
        title: "",
        description: "",
      });
      setImage("");
    } catch (error) {
      toast.error("Failed to submit blog");
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Add New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <UploadImage
          name="image"
          id="image"
          setImage={setImage} // Pass setImage directly
          value={image} // Bind the image state
        />

        <TextInput
          label="Blog Title"
          name="title"
          placeholder="Enter blog title"
          value={blog.title}
          onChange={handleChange}
        />

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <ReactQuill
            value={blog.description}
            onChange={handleDescriptionChange}
            theme="snow"
            className="mt-2"
            placeholder="Write a blog description"
            style={{ height: "200px" }} // Adjust height here
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["link", "image", "video"],
                ["clean"],
              ],
              clipboard: {
                matchVisual: false, // Ensure correct handling of <br> tags
              },
            }}
          />
        </div>

        <div>
          <button
            type="submit"
            className={`mt-14 w-full bg-orange-600 text-white py-3 px-4 rounded-md shadow-lg transition-all duration-300 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Blog"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddBlog;
