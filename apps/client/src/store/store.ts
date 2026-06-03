import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/cart/cartSlice";
import authReducer from "@/features/auth/authSlice";
import checkoutReducer from "@/features/checkout/checkoutSlice";
import ordersReducer from "@/features/orders/ordersSlice";
import { baseApi } from "@/services/api/baseApi";
import wishlistReducer from "@/features/wishlist/wishlistSlice";
import recentlyViewedReducer from "@/features/recentlyViewed/recentlyViewedSlice";
import reviewsReducer from "@/features/reviews/reviewsSlice";
import profileReducer from "@/features/profile/profileSlice";
import {
  saveCartState,
  saveAuthState,
  saveOrdersState,
  saveWishlistState,
  saveRecentlyViewedState,
  saveReviewsState,
  saveProfileState
} from "./persistence";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    checkout: checkoutReducer,
    orders: ordersReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    wishlist: wishlistReducer,
    recentlyViewed: recentlyViewedReducer,
    reviews: reviewsReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

store.subscribe(() => {
  saveCartState(store.getState().cart);
  saveAuthState(store.getState().auth);
  saveOrdersState(store.getState().orders);
  saveWishlistState(store.getState().wishlist);
  saveRecentlyViewedState(store.getState().recentlyViewed);
  saveReviewsState(store.getState().reviews);
  saveProfileState(store.getState().profile);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
