import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import axios from "axios";

import App from "./App";

import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import UserGuide from "./pages/UserGuide";
import RecipesPage from "./pages/RecipesPage";
import Register from "./pages/Register";
import CreateRecipe from "./pages/CreateRecipe";
import UserManagement from "./pages/UserManagement";
import Login from "./pages/Login";
import EditRecipe from "./pages/EditRecipe";

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
        path: "utilisateur",
        element: <AuthUserVerification />,
        children: [
          {
            element: <CreateRecipe />,
            path: "recettes/creation",
          },
          {
            element: <EditRecipe />,
            path: "recettes/edition/:id",
            loader: async ({ params }) => {
              const categoriesResponse = await fetch(
                `${import.meta.env.VITE_API_URL}/api/categories`
              );
              const ingredientsResponse = await fetch(
                `${import.meta.env.VITE_API_URL}/api/ingredients`
              );
              const recipeResponse = await fetch(
                `${import.meta.env.VITE_API_URL}/api/recipes/${params.id}`
              );

              const categoriesToJson = await categoriesResponse.json();
              const ingredientsToJson = await ingredientsResponse.json();
              const recipeToJson = await recipeResponse.json();

              return [categoriesToJson, ingredientsToJson, recipeToJson];
            },
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
            loader: async ({ params }) => {
              const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/users/${params.id}`
              );
              return response.data;
            },
          },
          {
            path: "/admin/utilisateur/:id",
            element: <Profile />,
            loader: async ({ params }) => {
              const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/users/${params.id}`
              );
              return response.data;
            },
            action: async ({ request, params }) => {
              const formData = await request.formData();
              console.info(request.method);
              switch (request.method.toLowerCase()) {
                case "put": {
                  await axios.put(
                    `${import.meta.env.VITE_API_URL}/api/users/${params.id}`,
                    {
                      firstname: formData.get("firstname"),
                      lastname: formData.get("lastname"),
                      username: formData.get("username"),
                      email: formData.get("email"),
                      password: formData.get("password"),
                    }
                  );

                  return redirect(`/admin/${params.id}`);
                }
                case "delete": {
                  await axios.delete(
                    `${import.meta.env.VITE_API_URL}/api/users/${params.id}`
                  );

                  return redirect(`/`);
                }

                default:
                  throw new Response("", { status: 405 });
              }
            },
          },
          {
            path: "/admin/utilisateurgestion",
            element: <UserManagement />,
            loader: async () => {
              const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/users/`
              );
              return response.data;
            },
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
