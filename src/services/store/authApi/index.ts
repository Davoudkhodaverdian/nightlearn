// Need to use the React-specific entry point to allow generating React hooks
import { Signin } from '@/components/login/models/signin';
import { Signup } from '@/components/register/models/signup';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// Define a service using a base URL and expected endpoints


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://localhost:9000/api/',  // mysql
    // baseUrl: 'http://localhost:9000/api/', // mongodb
    baseUrl: 'http://localhost:3000/api/', // mongodb inner app server nextjs
    credentials: "include"
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: Signin) => {
        return {
          url: "auth/login",
          method: "post",
          body
        }
      },

    }),
    registerUser: builder.mutation({
      query: (body: Signup) => {
        return {
          url: "auth/register",
          method: "post",
          body
        }
      },
    }),
    authUser: builder.query({
      query: (token: string) => {
        return {
          url: "auth/user",
          method: "GET",
          // headers: { authorization: token } // send token for backend when httponly is not active
        }
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled; // Waiting for the request to complete
        } catch (error) {
          // console.log(error);
        }
      },
      providesTags: ['User'],

    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useRegisterUserMutation, useLoginUserMutation, useAuthUserQuery } = authApi