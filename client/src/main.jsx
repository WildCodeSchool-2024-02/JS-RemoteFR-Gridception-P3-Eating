import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import CommentCaMarche from "./pages/CommentCaMarche";
import RecipesPage from "./pages/RecipesPage";
import Register from "./pages/Register";
import Login from "./pages/Login";

const recipesLoader = async () => {
  const response = await fetch(`http://localhost:3310/api/recipes`);
  const data = await response.json();
  return data;
};

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <HomePage />,
        path: "/",
        loader: recipesLoader,
      },
      {
        element: <RecipePage />,
        path: "/RecipePage/:id",
      },
      {
        element: <CommentCaMarche />,
        path: "/CommentCaMarche",
      },
      {
        element: <RecipesPage />,
        path: "/RecipesPage",
        loader: recipesLoader,
      },
      // {
      //   element: <Login />,
      //   path: "/Login",
      // },
      // {
      //   element: <Register />,
      //   path: "/RegisterPage",
      // },
    ],
  },
  {
    element: <Login />,
    path: "/Login",
  },
  {
    element: <Register />,
    path: "/RegisterPage",
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
