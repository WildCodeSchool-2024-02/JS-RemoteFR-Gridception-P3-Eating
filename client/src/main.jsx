import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <HomePage />,
        path: "/",
      },
      {
        element: <RecipePage />,
        path: "/RecipePage/:id",
        loader: async () => {
          const recipesResponse = await fetch(
            "http://localhost:3310/api/recipes"
          );
          const quantityResponse = await fetch(
            "http://localhost:3310/api/quantities/recipe/1"
          );
          const recipesData = await recipesResponse.json();
          const quantityData = await quantityResponse.json();
          return { recipes: recipesData, quantity: quantityData };
        },
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
