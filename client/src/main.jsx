import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import CommentCaMarche from "./pages/CommentCaMarche";

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
        path: "/RecipePage/",
      },
      {
        element: <CommentCaMarche />,
        path: "/CommentCaMarche",
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
