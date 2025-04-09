import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./Components/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home";
import Statistics from "./Components/Statistics.jsx";
import Login from "./Components/Login.jsx";
import Settings from "./Components/Settings.jsx";
import Register from "./Components/Register.jsx";
import Error from "./Components/Error.jsx";

export const server =
  "https://calories-tracker-backend-sage.vercel.app";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/stats",
        element: <Statistics />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

const root = document.getElementById("root");
if (!root._reactRoot) {
  root._reactRoot = createRoot(root);
}

root._reactRoot.render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
