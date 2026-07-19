import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // future mein aur slices yahan add karo:
    // plans: plansReducer,
    // policies: policiesReducer,
  },
});

export default store;