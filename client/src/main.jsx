import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";

import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import UserGuide from "./pages/UserGuide";
import RecipesPage from "./pages/RecipesPage";
import Register from "./pages/Register";
import CreateRecipe from "./pages/CreateRecipe";
import Login from "./pages/Login";

import { AuthProvider } from "./contexts/AuthContext";
import AuthUserVerification from "./components/AuthUserVerification";
import AuthAdminVerification from "./components/AuthAdminVerification";

import "./index.css";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Error404 from "./pages/Error404";

const { VITE_API_URL } = import.meta.env;

const recipesLoader = async () => {
  const response = await fetch(`${VITE_API_URL}/api/recipes`);
  const data = await response.json();
  return data;
};

const OneRecipeLoader = async ({ params }) => {
  const { id } = params;

  if (!id) {
    throw new Error("ID de recette non défini");
  }

  const recipesResponse = await fetch(`${VITE_API_URL}/api/recipes`);
  const quantityResponse = await fetch(
    `${VITE_API_URL}/api/quantities/recipe/${id}`
  );
  const recipesData = await recipesResponse.json();
  const quantityData = await quantityResponse.json();
  return { recipes: recipesData, quantity: quantityData };
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
        element: <RecipesPage />,
        path: "/recettes",
        loader: recipesLoader,
      },
      {
        element: <RecipePage />,
        path: "/recettes/:id",
        loader: OneRecipeLoader,
      },
      {
        element: <UserGuide />,
        path: "/étapes",
      },
      {
        element: <Login />,
        path: "/se-connecter",
      },
      {
        element: <Register />,
        path: "/s-enregistrer",
      },
      {
        path: "privé",
        element: <AuthUserVerification />,
        children: [
          {
            element: <Profile />,
            path: "profil/:username",
          },
          {
            element: <CreateRecipe />,
            path: "recettes/creation",
          },
        ],
      },
      {
        path: "admin",
        element: <AuthAdminVerification />,
        children: [
          {
            path: "",
            element: <Admin />,
          },
        ],
      },
      {
        path: "*",
        element: <Error404 />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
