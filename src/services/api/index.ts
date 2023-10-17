// Need to use the React-specific entry point to allow generating React hooks
import { Signin } from '@/components/login/models/signin'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9000/api/' }), // mysql
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:27017/api/' }), // mongodb
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body : Signin)=>{
        return {
          url:"auth/login",
          method:"post",
          body
        }
      },
    }),
    authUser: builder.query({
      query: (token : string)=>{
        return {
          url:"user",
          method:"GET",
         headers:{
          authorization: token
         }
        }
      },
    
    }),
  }), 
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useLoginUserMutation,useAuthUserQuery } = authApi