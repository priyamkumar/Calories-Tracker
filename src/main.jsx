import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./Contexts/ThemeContext.jsx";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import caloriesReducer from "./Components/CaloriesTodaySlice.js";


const store = configureStore({
  reducer: {
    calories: caloriesReducer},
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
