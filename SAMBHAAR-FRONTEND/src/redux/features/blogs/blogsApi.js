import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../util/baseURL";

const blogsApi = createApi({
  reducerPath: "blogsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/blogs`,
    credentials: "include",
  }),
  tagTypes: ["Blogs"],
  endpoints: (builder) => ({
    fetchAllBlogs: builder.query({
      query: ({ page = 1, limit = 10 }) => {
        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        }).toString();
        return `/?${queryParams}`;
      },
      providesTags: ["Blogs"],
    }),

    fetchBlogById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Blogs", id }],
    }),

    addBlog: builder.mutation({
      query: (newBlog) => ({
        url: "/create-blog",
        method: "POST",
        body: newBlog,
        credentials: "include",
      }),
      invalidatesTags: ["Blogs"],
    }),

    fetchRelatedBlogs: builder.query({
      query: (id) => `/related/${id}`,
    }),

    updateBlog: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/update-blog/${id}`,
        method: "PATCH",
        body: rest,
        credentials: "include",
      }),
      invalidatesTags: ["Blogs"],
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Blogs", id }],
    }),

    searchBlogs: builder.query({
      query: (query) => `/search?query=${query}`,
      providesTags: ["Blogs"],
    }),
  }),
});

export const {
  useFetchAllBlogsQuery,
  useFetchBlogByIdQuery,
  useAddBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useFetchRelatedBlogsQuery,
  useSearchBlogsQuery,
} = blogsApi;

export default blogsApi;
