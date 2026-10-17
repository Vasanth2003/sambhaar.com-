import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import authApi from './features/auth/authApi'
import authReducer from "./features/auth/authSlice"
import productsApi from './features/products/productsApi'
import statsApi from './features/stats/statsApi'
import reviewApi from './features/reviews/reviewsApi'
import orderApi from './features/orders/orderApi'
import categoriesApi from './features/categories/categoriesApi'
import milksApi from './features/milks/milksApi'
import blogsApi from './features/blogs/blogsApi'
import subscriptionApi from "./features/subscriptions/subscriptionsApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [authApi.reducerPath] : authApi.reducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [blogsApi.reducerPath]: blogsApi.reducer,
    [reviewApi.reducerPath] : reviewApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [milksApi.reducerPath]: milksApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productsApi.middleware, blogsApi.middleware, reviewApi.middleware,subscriptionApi.middleware,statsApi.middleware, orderApi.middleware, categoriesApi.middleware, milksApi.middleware)
})