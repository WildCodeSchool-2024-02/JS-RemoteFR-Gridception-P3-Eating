import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";

import { AuthProvider } from "./contexts/AuthContext";

import Admin from "./pages/Admin";
import CreateRecipe from "./pages/CreateRecipe";
import EditRecipe from "./pages/EditRecipe";
import Error404 from "./pages/Error404";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import RecipePage from "./pages/RecipePage";
import RecipesPage from "./pages/RecipesPage";
import Register from "./pages/Register";
import UserGuide from "./pages/UserGuide";
import UserManagement from "./pages/UserManagement";

import AuthAdminVerification from "./components/AuthAdminVerification";
import AuthUserVerification from "./components/AuthUserVerification";

import "./index.css";

import {
  editRecipeLoader,
  OneRecipeLoader,
  recipesLoader,
  usersLoader,
} from "./services/loaders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage />, loader: recipesLoader },
      { path: "recettes", element: <RecipesPage />, loader: recipesLoader },
      {
        path: "recettes/:id",
        element: <RecipePage />,
        loader: OneRecipeLoader,
      },
      { path: "étapes", element: <UserGuide /> },
      { path: "se-connecter", element: <Login /> },
      { path: "s-enregistrer", element: <Register /> },
      { path: "*", element: <Error404 /> },

      // routes protégées utilisateurs
      {
        path: "utilisateur",
        element: <AuthUserVerification />,
        children: [
          {
            path: ":id",
            element: <Profile />,
          },
          {
            path: "recettes/creation",
            element: <CreateRecipe />,
          },
          {
            path: "recettes/edition/:id",
            element: <EditRecipe />,
            loader: editRecipeLoader,
          },
        ],
      },

      // routes protégées admin
      {
        path: "admin",
        element: <AuthAdminVerification />,
        children: [
          {
            path: "",
            element: <Admin />,
          },

          {
            path: "utilisateurs/gestion",
            element: <UserManagement />,
            loader: usersLoader,
          },
        ],
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
