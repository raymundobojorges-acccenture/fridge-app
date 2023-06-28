import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ErrorPage from "./error-page";
import AvailableIngredients from "./routes/availableIngredients";
import UnavailableIngredients from "./routes/unavailableIngredients";

import Root, {action as rootAction, loader as rootLoader} from "./routes/root";
import {getIngredients as ingredientLoader} from "./ingredients";
import Index from "./routes/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { index: true, element: <Index /> },
      {
        path: "availables",
        element: <AvailableIngredients />,
        loader: ingredientLoader
      },
      {
        path: "unavailables",
        element: <UnavailableIngredients />,
        loader: ingredientLoader
      },
    ],
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);