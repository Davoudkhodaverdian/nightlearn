// Need to use the React-specific entry point to allow generating React hooks
import { Course } from '@/services/models/course';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// Define a service using a base URL and expected endpoints

export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/', // inner app server nextjs
    credentials: "include"
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (body: Course) => {
        return {
          url: "course",
          method: "post",
          body,
          // headers: { authorization: token } // send token for backend when httponly is not active
        }
      },

    }),
    getCourses: builder.query({
      query: (token: string) => {
        return {
          url: "courses",
          method: "GET",
          // headers: { authorization: token } // send token for backend when httponly is not active
        }
      }
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetCoursesQuery, useCreateCourseMutation } = courseApi