import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  useFetchBlogByIdQuery,
  useUpdateBlogMutation,
} from "../../../../redux/features/blogs/blogsApi";
import TextInput from "../addProduct/TextInput";
import UploadImage from "../addProduct/UploadImage";
import ReactQuill from "react-quill"; // Import Quill editor
import "react-quill/dist/quill.snow.css"; // Import Quill CSS

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [blog, setBlog] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [newImage, setNewImage] = useState(null);

  // Fetch blog details by ID
  const {
    data: blogData,
    isLoading: isBlogLoading,
    error: fetchError,
  } = useFetchBlogByIdQuery(id);

  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();

  useEffect(() => {
    if (blogData) {
      const { title, description, image } = blogData;
      setBlog({ title, description, image });
    }
  }, [blogData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (image) => {
    setNewImage(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedBlog = {
      ...blog,
      image: newImage || blog.image,
      author: user?._id,
    };

    try {
      await updateBlog({ id, ...updatedBlog }).unwrap();
      alert("Blog updated successfully");
      navigate("/dashboard/manage-blogs");
    } catch (error) {
      console.error("Failed to update blog:", error);
    }
  };

  if (isBlogLoading) return <div>Loading...</div>;
  if (fetchError) return <div>Error fetching blog!</div>;

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Update Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <UploadImage
          name="image"
          id="image"
          value={newImage || blog.image}
          placeholder="Image"
          setImage={handleImageChange}
        />

        <TextInput
          label="Blog Title"
          name="title"
          placeholder="Enter the blog title"
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
            onChange={(value) =>
              setBlog((prev) => ({ ...prev, description: value }))
            }
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
            formats={[
              "header",
              "font",
              "size",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "indent",
              "link",
              "image",
              "video",
            ]}
          />
        </div>

        <div>
          <button
            type="submit"
            className={`mt-14 w-full bg-orange-600 text-white py-3 px-4 rounded-md shadow-lg transition-all duration-300 ${
              isUpdating ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isUpdating ? "Updating..." : "Update Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;
