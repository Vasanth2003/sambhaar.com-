import React, { useState, useEffect } from "react";
import {
  useDeleteBlogMutation,
  useFetchAllBlogsQuery,
} from "../../../../redux/features/blogs/blogsApi";
import { Link } from "react-router-dom";
import { formatDate } from "../../../../util/formatDate";
import Loader from "../../../../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import * as XLSX from "xlsx"; // Import XLSX for Excel export
import "react-toastify/dist/ReactToastify.css";

const ManageBlog = () => {
  const [currentPage, setCurrentPage] = useState(1); // Declare currentPage here
  const itemsPerPage = 10;

  const {
    data = { blogs: [], totalPages: 0, page: 1 },
    isLoading,
    error,
    refetch,
  } = useFetchAllBlogsQuery({ page: currentPage, limit: itemsPerPage });

  const [deleteBlog] = useDeleteBlogMutation();

  useEffect(() => {
    if (error) {
      console.error("Error loading blogs:", error);
      toast.error("Failed to load blogs");
    } else {
      console.log("Blogs loaded:", data?.blogs || []);
    }
  }, [data, error]);

  const blogs = data?.blogs || [];

  const paginatedBlogs = blogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteBlog = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this blog?"
      );
      if (confirmDelete) {
        await deleteBlog(id).unwrap();
        toast.success("Blog deleted successfully!");
        await refetch();
      }
    } catch (error) {
      toast.error("Failed to delete blog. Please try again.");
    }
  };

  const handleExportToExcel = () => {
    if (!blogs.length) {
      toast.error("No blogs available to export.");
      return;
    }

    const formattedBlogs = blogs.map((blog, index) => ({
      ID: index + 1,
      Title: blog.title,
      Description: blog.description,
      Date: blog.postedAt ? formatDate(blog.postedAt) : "-",
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedBlogs);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Blogs");

    XLSX.writeFile(workbook, "Blogs.xlsx");
    toast.success("Blogs exported to Excel successfully!");
  };

  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  return (
    <>
      {isLoading && <Loader />}
      {error && <div>Error loading blogs: {error.message}</div>}
      <section className="overflow-hidden rounded-lg-md m-5">
        <div className="w-full mb-12 xl:mb-0 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full max-w-full flex-grow flex-1">
                  <h2 className="text-2xl font-bold mb-6">All Blogs</h2>
                </div>
                <div className="relative w-full max-w-full flex-grow flex-1 text-end space-x-2">
                  <Link
                    to={`/dashboard/add-blog`}
                    className="bg-primary text-white py-2 px-4 rounded-md shadow-md"
                  >
                    Add New Blog
                  </Link>
                  <button
                    onClick={handleExportToExcel}
                    className="bg-green-500 text-white py-2 px-4 rounded-md shadow-md"
                  >
                    Export to Excel
                  </button>
                </div>
              </div>
              <h3 className="my-4 text-sm">
                Showing {paginatedBlogs.length} of {blogs.length} blogs
              </h3>
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
                      Title
                    </th>
                    <th className="border border-gray-200 text-center text-sm font-medium text-gray-900 h-12">
                      Description
                    </th>
                    <th className="border border-gray-200 text-center text-sm font-medium text-gray-900 h-12">
                      Posted Date
                    </th>
                    <th className="border border-gray-200 text-center text-sm font-medium text-gray-900 h-12">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedBlogs.map((blog, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-200 text-sm text-center text-gray-700 h-10">
                        #{index + 1 + (currentPage - 1) * itemsPerPage}
                      </td>
                      <td className="border border-gray-200 flex justify-center gap-3 text-sm text-gray-700 h-10">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-full w-full object-contain border border-gray-300 rounded-lg"
                            src={blog.image || "default-image-url"}
                            alt={blog.title}
                          />
                        </div>
                      </td>
                      <td className="border border-gray-200 text-sm text-center text-gray-700 h-10 truncate max-w-[150px]">
                        {blog.title}
                      </td>
                      <td
                        className="border border-gray-200 text-sm text-center text-gray-700 h-10 truncate max-w-[150px]"
                        dangerouslySetInnerHTML={{
                          __html:
                            blog.description.split(" ").slice(0, 5).join(" ") +
                            (blog.description.split(" ").length > 5
                              ? " ..."
                              : ""),
                        }}
                      ></td>
                      <td className="border border-gray-200 text-sm text-center text-gray-700 h-10">
                        {blog.postedAt ? formatDate(blog.postedAt) : "-"}
                      </td>
                      <td className="border border-gray-200 text-center text-sm text-gray-700 h-10">
                        <Link
                          to={`/dashboard/update-blog/${blog._id}`}
                          className="text-blue-500 hover:text-blue-700 mr-2"
                        >
                          <i className="ri-edit-box-line ri-lg"></i>
                        </Link>
                        <button
                          onClick={() => handleDeleteBlog(blog._id)}
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

              <button className="px-4 mx-0 border bg-blue-500 text-white">
                {currentPage}
              </button>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
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

export default ManageBlog;
