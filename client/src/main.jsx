import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import CommentCaMarche from "./pages/CommentCaMarche";
import RecipesPage from "./pages/RecipesPage";

/* eslint-disable-next-line prefer-destructuring */
const VITE_API_URL = import.meta.env.VITE_API_URL;

const recipesLoader = async () => {
  const response = await fetch(`${VITE_API_URL}/api/recipes`);
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
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
