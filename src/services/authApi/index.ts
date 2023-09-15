// Need to use the React-specific entry point to allow generating React hooks
import { Signin } from '@/components/login/models/signin'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9000/api/' }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body : Signin)=>{
        return {
          url:"auth/login",
          method:"post",
          body
        }
      }
    })
  }), 
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useLoginUserMutation } = authApi