import { createBrowserRouter, Navigate } from "react-router-dom";
import { SearchPage } from "../components/Search/Search";
import { Dashboard } from "../components/Dashboard/Dashboard";
import { APP_ROUTE_PATHS } from "./route-path";
import { App } from "../App";

export const router = createBrowserRouter([
  {
    element: <App />,
  },
  {
    path: APP_ROUTE_PATHS.SEARCH,
    element: <SearchPage />,
  },
  {
    path: APP_ROUTE_PATHS.DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <Navigate to={APP_ROUTE_PATHS.SEARCH} replace />,
  },
]);
