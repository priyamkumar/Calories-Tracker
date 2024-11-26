import { configureStore } from "@reduxjs/toolkit";
import caloriesReducer from "./CaloriesTodaySlice.js";

const store = configureStore({
    reducer: {
      calories: caloriesReducer
    },
  });

  export default store;