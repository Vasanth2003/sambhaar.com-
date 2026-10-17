// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { getBaseUrl } from "../../../util/baseURL";

// const productsApi = createApi({
//   reducerPath: "productsApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: `${getBaseUrl()}/api/products`,
//     credentials: "include",
//   }),
//   tagTypes: ["Products"],
//   endpoints: (builder) => ({

//     fetchAllProducts: builder.query({
//       query: ({
//         category,
//         brand,
//         subcategory,
//         minPrice,
//         maxPrice,
//         page = 1,
//         limit = 20,
//       }) => {
//         const queryParams = new URLSearchParams({
//           category: category || "",
//           brand: brand || "", 
//           subcategory: subcategory || "",
//           minPrice: minPrice || 0,
//           maxPrice: maxPrice || "",
//           page: page.toString(),
//           limit: limit.toString(),

//         }).toString();  
//         return `/?${queryParams}`;
//       },
//       providesTags: ["Products"],
//     }),

//     fetchProductById: builder.query({
//       query: (id) => `/${id}`,
//       providesTags: (result, error, id) => [{ type: "Products", id }],
//     }),

//     addProduct: builder.mutation({
//       query: (newProduct) => ({
//         url: "/create-product",
//         method: "POST",
//         body: newProduct,
//         credentials: "include",
//       }),
//       invalidatesTags: ["Products"],
//     }),

//     fetchRelatedProducts: builder.query({
//       query: (id) => `/related/${id}`,
//     }),

//     updateProduct: builder.mutation({
//       query: ({ id, ...rest }) => ({
//         url: `/update-product/${id}`,
//         method: "PATCH",
//         body: rest,
//         credentials: "include",
//       }),
//       invalidatesTags: ["Products"],
//     }),

//     deleteProduct: builder.mutation({
//       query: (id) => ({
//         url: `/${id}`,
//         method: "DELETE",
//         credentials: "include",
//       }),
//       invalidatesTags: (result, error, id) => [{ type: "Products", id }],
//     }),
//     fetchBestSellerProducts: builder.query({
//       query: () => "/?bestseller=true",
//       providesTags: ["Products"],
//     }),
//   }),
// });

// export const {
//   useFetchAllProductsQuery,
//   useFetchProductByIdQuery,
//   useAddProductMutation,
//   useUpdateProductMutation,
//   useDeleteProductMutation,
//   useFetchRelatedProductsQuery,
// } = productsApi;

// export default productsApi;


// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { getBaseUrl } from "../../../util/baseURL";

// const productsApi = createApi({
//   reducerPath: "productsApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: `${getBaseUrl()}/api/products`,
//     credentials: "include",
//   }),
//   tagTypes: ["Products"],
//   endpoints: (builder) => ({
//     fetchAllProducts: builder.query({
//       query: ({
//         category,
//         brand,
//         subcategory,
//         minPrice,
//         maxPrice,
//         page = 1,
//         limit = 20,
//       }) => {
//         const queryParams = new URLSearchParams({
//           category: category || "",
//           brand: brand || "",
//           subcategory: subcategory || "",
//           minPrice: minPrice || 0,
//           maxPrice: maxPrice || "",
//           page: page.toString(),
//           limit: limit.toString(),
//         }).toString();
//         return `/?${queryParams}`;
//       },
//       providesTags: ["Products"],
//     }),

//     fetchProductById: builder.query({
//       query: (id) => `/${id}`,
//       providesTags: (result, error, id) => [{ type: "Products", id }],
//     }),

//     addProduct: builder.mutation({
//       query: (newProduct) => ({
//         url: "/create-product",
//         method: "POST",
//         body: newProduct,
//         credentials: "include",
//       }),
//       invalidatesTags: ["Products"],
//     }),

//     updateProduct: builder.mutation({
//       query: ({ id, ...rest }) => ({
//         url: `/update-product/${id}`,
//         method: "PATCH",
//         body: rest,
//         credentials: "include",
//       }),
//       invalidatesTags: ["Products"],
//     }),

//     deleteProduct: builder.mutation({
//       query: (id) => ({
//         url: `/${id}`,
//         method: "DELETE",
//         credentials: "include",
//       }),
//       invalidatesTags: (result, error, id) => [{ type: "Products", id }],
//     }),

//     fetchRelatedProducts: builder.query({
//       query: (id) => `/related/${id}`,
//     }),

//     fetchBestSellerProducts: builder.query({
//       query: () => "/?bestseller=true",
//       providesTags: ["Products"],
//     }),
//   }),
// });

// export const {
//   useFetchAllProductsQuery,
//   useFetchProductByIdQuery,
//   useAddProductMutation,
//   useUpdateProductMutation,
//   useDeleteProductMutation,
//   useFetchRelatedProductsQuery,
//   useFetchBestSellerProductsQuery, // ✅ ✅ Exported!
// } = productsApi;

// export default productsApi;
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { getBaseUrl } from "../../../util/baseURL";

// const productsApi = createApi({
//   reducerPath: "productsApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: `${getBaseUrl()}/api/products`,
//     credentials: "include",
//   }),
//   tagTypes: \["Products"],
//   endpoints: (builder) => ({

//     fetchAllProducts: builder.query({
//       query: ({
//         category,
//         brand,
//         subcategory,
//         minPrice,
//         maxPrice,
//         page = 1,
//         limit = 20,
//       }) => {
//         const queryParams = new URLSearchParams({
//           category: category || "",
//           brand: brand || "",
//           subcategory: subcategory || "",
//           minPrice: minPrice || 0,
//           maxPrice: maxPrice || "",
//           page: page.toString(),
//           limit: limit.toString(),

//         }).toString();
//         return `/?${queryParams}`;
//       },
//       providesTags: \["Products"],
//     }),

//     fetchProductById: builder.query({
//       query: (id) => `/${id}`,
//       providesTags: (result, error, id) => \[{ type: "Products", id }],
//     }),

//     addProduct: builder.mutation({
//       query: (newProduct) => ({
//         url: "/create-product",
//         method: "POST",
//         body: newProduct,
//         credentials: "include",
//       }),
//       invalidatesTags: \["Products"],
//     }),

//     fetchRelatedProducts: builder.query({
//       query: (id) => `/related/${id}`,
//     }),

//     updateProduct: builder.mutation({
//       query: ({ id, ...rest }) => ({
//         url: `/update-product/${id}`,
//         method: "PATCH",
//         body: rest,
//         credentials: "include",
//       }),
//       invalidatesTags: \["Products"],
//     }),

//     deleteProduct: builder.mutation({
//       query: (id) => ({
//         url: `/${id}`,
//         method: "DELETE",
//         credentials: "include",
//       }),
//       invalidatesTags: (result, error, id) => \[{ type: "Products", id }],
//     }),
//     fetchBestSellerProducts: builder.query({
//       query: () => "/?bestseller=true",
//       providesTags: \["Products"],
//     }),
//   }),
// });

// export const {
//   useFetchAllProductsQuery,
//   useFetchProductByIdQuery,
//   useAddProductMutation,
//   useUpdateProductMutation,
//   useDeleteProductMutation,
//   useFetchRelatedProductsQuery,
// } = productsApi;

// export default productsApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../util/baseURL";

const productsApi = createApi({
reducerPath: "productsApi",
baseQuery: fetchBaseQuery({
baseUrl: `${getBaseUrl()}/api/products`,
credentials: "include",
}),
tagTypes: ["Products"],
endpoints: (builder) => ({
fetchAllProducts: builder.query({
query: ({
category,
brand,
subcategory,
minPrice,
maxPrice,
page = 1,
limit = 20,
}) => {
const queryParams = new URLSearchParams({
category: category || "",
brand: brand || "",
subcategory: subcategory || "",
minPrice: minPrice || 0,
maxPrice: maxPrice || "",
page: page.toString(),
limit: limit.toString(),
}).toString();
return `/?${queryParams}`;
},
providesTags: ["Products"],
}),

fetchProductById: builder.query({
  query: (id) => `update/${id}`,
  providesTags: (result, error, id) => [{ type: "Products", id }],
}),

addProduct: builder.mutation({
  query: (newProduct) => ({
    url: "/create-product",
    method: "POST",
    body: newProduct,
    credentials: "include",
  }),
  invalidatesTags: ["Products"],
}),

updateProduct: builder.mutation({
  query: ({ id, ...rest }) => ({
    url: `/update-product/${id}`,
    method: "PATCH",
    body: rest,
    credentials: "include",
  }),
  invalidatesTags: ["Products"],
}),

updateViaExcel: builder.mutation({
  query: (formData) => ({
    url: "/bulk-update",
    method: "POST",
    body: formData,  // ✅ sending FormData
    credentials: "include", // ✅ cookie (JWT) included
  }),
}),

deleteProduct: builder.mutation({
  query: (id) => ({
    url: `/${id}`,
    method: "DELETE",
    credentials: "include",
  }),
  invalidatesTags: (result, error, id) => [{ type: "Products", id }],
}),

fetchRelatedProducts: builder.query({
  query: (id) => `/related/${id}`,
}),

 fetchBestSellerProducts: builder.query({
      query: () => "/bestseller-products", 
      providesTags: ["Products"],
    }),
}),
});

export const {
useFetchAllProductsQuery,
useFetchProductByIdQuery,
useAddProductMutation,
useUpdateProductMutation,
useDeleteProductMutation,
useFetchRelatedProductsQuery,
useFetchBestSellerProductsQuery,
useUpdateViaExcelMutation 
} = productsApi;

export default productsApi;

