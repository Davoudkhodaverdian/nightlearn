import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './authApi'
import { courseApi } from './courseApi'
import { teacherApi } from './teacherApi'
import { categoryApi } from './categoryApi'
import toastReducer from './toast';
// ...

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [teacherApi.reducerPath]: teacherApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    toast: toastReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    [authApi.middleware, courseApi.middleware,teacherApi.middleware, categoryApi.middleware]
  )
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch