// BlogDetailsPage.js
import React from "react";
import { useParams } from "react-router-dom";
import { useFetchAllBlogsQuery } from "../../redux/features/blogs/blogsApi";
import { Link } from "react-router-dom";

const BlogDetailsPage = () => {
  const { blogId } = useParams(); // Get the blogId from the URL
  const { data, error, isLoading } = useFetchAllBlogsQuery({
    page: 1,
    limit: 10,
  });

  // Find the blog with the matching blogId
  const blog = data?.blogs.find((blog) => blog._id === blogId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading blog details.</div>;
  }

  if (!blog) {
    return <div>Blog not found.</div>;
  }

  return (
    <>
      <div className="relative flex w-full justify-center bg-slate-200 md:min-h-[250px] lg:min-h-[288px]">
        <div className="relative flex w-full flex-col items-center justify-center py-10">
          <h1 className="text-black text-center text-xl font-bold md:text-2xl lg:text-3xl 2xl:text-[40px]">
            <span className="font-manrope mb-3 block font-bold md:mb-4 lg:mb-5 2xl:mb-7">
              Blog Details
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
                Blog Details
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        <img
          src={blog.image || "default-image-url"}
          alt={blog.title}
          className="w-full h-auto object-cover mt-4"
        />
        <div className="mt-6 text-lg">
          <p
            className="text-gray-700"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          ></p>
          {/* You can add more details like the full blog content here */}
        </div>
      </div>
    </>
  );
};

export default BlogDetailsPage;
