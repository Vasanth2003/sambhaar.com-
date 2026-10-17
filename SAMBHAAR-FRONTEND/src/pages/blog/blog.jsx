import React from "react";
import { useFetchAllBlogsQuery } from "../../redux/features/blogs/blogsApi";
import { Link } from "react-router-dom";

const BlogPage = () => {
  const { data, error, isLoading } = useFetchAllBlogsQuery({
    page: 1,
    limit: 10,
  });

  if (isLoading) {
    return (
      <div className="text-center mt-10 text-lg font-semibold">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">
        Error loading blogs: {error.message}
      </div>
    );
  }

  const blogs = data?.blogs || []; // Adjust this based on API response

  // Function to format the date to "Jan 23, 2025"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <div className="relative flex w-full justify-center bg-slate-200 md:min-h-[250px] lg:min-h-[288px]">
        <div className="relative flex w-full flex-col items-center justify-center py-10">
          <h1 className="text-black text-center text-xl font-bold md:text-2xl lg:text-3xl 2xl:text-[40px]">
            <span className="font-manrope mb-3 block font-bold md:mb-4 lg:mb-5 2xl:mb-7">
              Blogs
            </span>
          </h1>
          <div className="flex items-center">
            <ul className="flex w-full items-center overflow-hidden">
              <li className="px-2.5 text-sm text-black transition duration-200 ease-in hover:text-accent ltr:first:pl-0 ltr:last:pr-0 rtl:first:pr-0 rtl:last:pl-0">
                <Link to={"/"} className="inline-flex items-center">
                  Home
                </Link>
              </li>
              <li className="mt-[1px] text-base text-black">
                <i className="ri-arrow-right-s-line"></i>
              </li>
              <li className="px-2.5 text-sm text-black transition duration-200 ease-in ltr:first:pl-0 ltr:last:pr-0 rtl:first:pr-0 rtl:last:pl-0">
                Blogs
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex-grow px-4 py-10">
        {blogs.length === 0 ? (
          <div className="text-center text-gray-500">No blogs available.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="w-full relative overflow-hidden">
                  <img
                    src={blog.image || "default-image-url"}
                    alt={blog.title}
                    className="w-full h-auto object-cover"
                  />
                </div>

                <div className="p-4 flex-grow">
                  <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                  <p
                    className="text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html:
                        blog.description.split(" ").slice(0, 30).join(" ") +
                        (blog.description.split(" ").length > 30 ? " ..." : ""),
                    }}
                  ></p>
                </div>
                {/* Display formatted createdAt and author */}
                <div className="p-4 text-sm text-gray-500">
                  <p>
                    {formatDate(blog.postedAt)} - By{" "}
                    {blog.author?.name || "Admin"}
                  </p>
                </div>

                {/* View More Button placed at the bottom */}
                <div className="p-4 mt-auto">
                  <Link
                    to={`/blogDetails/${blog._id}`}
                    className="transform translate-x-0 rounded-full shadow-md transition-all duration-500 group-hover:scale-110 flex items-center justify-center px-4 py-2 text-xs sm:text-sm md:text-base lg:text-lg font-semibold border-2 border-orange-600 bg-transparent bg-gradient-to-br from-[#c74227] to-[#edbb1c] hover:from-[#edbb1c] hover:to-[#c74227] hover:shadow-lg hover:shadow-orange-500/50 text-gray-50"
                    style={{width: 'fit-content'}}
                  >
                    View More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
