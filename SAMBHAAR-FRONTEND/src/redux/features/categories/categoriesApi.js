import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../util/baseURL";

const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/categories`,
    credentials: "include",
  }),
  tagTypes: ["Categories"],
  
  endpoints: (builder) => ({

    fetchAllCategories: builder.query({
      query: () => "/",
      providesTags: ["Categories"],
    }),

    fetchCategoryById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Categories", id }],
    }),

    addCategory: builder.mutation({
      query: (newCategory) => ({
        url: "/create-category",
        method: "POST",
        body: newCategory,
        credentials: "include",
      }),
      invalidatesTags: ["Categories"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/update-category/${id}`,
        method: "PATCH",
        body: rest,
        credentials: "include",
      }),
      invalidatesTags: ["Categories"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/delete-category/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Categories", id }],
    }),

    fetchSubcategories: builder.query({
      query: (id) => `/${id}/subcategories`,
      providesTags: (result, error, id) => [{ type: "Categories", id }],
    }),
  
  }),
});

export const {
  useFetchAllCategoriesQuery,
  useFetchCategoryByIdQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchSubcategoriesQuery,
} = categoriesApi;

export default categoriesApi;
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { getBaseUrl } from "../../../util/baseURL";

// const categoriesApi = createApi({
//   reducerPath: "categoriesApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: `${getBaseUrl()}/api`, // 👈 base is now just "/api"
//     credentials: "include",
//   }),
//   tagTypes: ["Categories"],
//   endpoints: (builder) => ({

//     // ✅ GET all categories
//     fetchAllCategories: builder.query({
//       query: () => "/categories", // 👈 /api/categories
//       providesTags: ["Categories"],
//     }),

//     // ✅ GET single category by ID
//     fetchCategoryById: builder.query({
//       query: (id) => `/categories/${id}`,
//       providesTags: (result, error, id) => [{ type: "Categories", id }],
//     }),

//     // ✅ POST create a category
//     addCategory: builder.mutation({
//       query: (newCategory) => ({
//         url: "/categories/create-category",
//         method: "POST",
//         body: newCategory,
//         credentials: "include",
//       }),
//       invalidatesTags: ["Categories"],
//     }),

//     // ✅ PATCH update category
//     updateCategory: builder.mutation({
//       query: ({ id, ...rest }) => ({
//         url: `/categories/update-category/${id}`,
//         method: "PATCH",
//         body: rest,
//         credentials: "include",
//       }),
//       invalidatesTags: ["Categories"],
//     }),

//     // ✅ DELETE category
//     deleteCategory: builder.mutation({
//       query: (id) => ({
//         url: `/categories/delete-category/${id}`,
//         method: "DELETE",
//         credentials: "include",
//       }),
//       invalidatesTags: (result, error, id) => [{ type: "Categories", id }],
//     }),

//     // ✅ GET subcategories by category ID
//     fetchSubcategories: builder.query({
//       query: (id) => `/categories/${id}/subcategories`,
//       providesTags: (result, error, id) => [{ type: "Categories", id }],
//     }),

//   }),
// });

// // Export hooks
// export const {
//   useFetchAllCategoriesQuery,
//   useFetchCategoryByIdQuery,
//   useAddCategoryMutation,
//   useUpdateCategoryMutation,
//   useDeleteCategoryMutation,
//   useFetchSubcategoriesQuery,
// } = categoriesApi;

// export default categoriesApi;
