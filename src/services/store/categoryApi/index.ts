// Need to use the React-specific entry point to allow generating React hooks
import { Category } from '@/services/models/category';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// Define a service using a base URL and expected endpoints

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/', // inner app server nextjs
    credentials: "include"
  }),
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (body: Category) => {
        return {
          url: "category",
          method: "post",
          body,
          // headers: { authorization: token } // send token for backend when httponly is not active
        }
      },

    }),
    getCategories: builder.query ({
      query: (token: string) => {
        return {
          url: "categories",
          method: "GET",
          // headers: { authorization: token } // send token for backend when httponly is not active
        }
      }
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetCategoriesQuery, useCreateCategoryMutation } = categoryApi