import { configureStore } from "@reduxjs/toolkit";
import caloriesReducer from "./CaloriesTodaySlice.js";
import authenticateReducer from "./AuthenticationSlice.js";

const store = configureStore({
    reducer: {
      calories: caloriesReducer,
      authentication: authenticateReducer
    },
  });

  export default store;