// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// Define a service using a base URL and expected endpoints

export const teacherApi = createApi({
  reducerPath: 'teacherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/', // inner app server nextjs
    credentials: "include"
  }),
  endpoints: (builder) => ({
    getTeachers: builder.mutation({
      query: (token: string) => {
        return {
          url: "teachers",
          method: "GET",
          // headers: { authorization: token } // send token for backend when httponly is not active
        }
      }
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetTeachersMutation } = teacherApi