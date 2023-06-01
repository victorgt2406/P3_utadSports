import { RouteObject, createBrowserRouter } from "react-router-dom";
import { PAGES_COMPONENTS, PAGES } from "../routes";

const { news, viewActivity } = PAGES_COMPONENTS;
const pagesRoutes: RouteObject[] = PAGES.map((page) => {
  const pageRoute: RouteObject = {
    path: `/${page}`,
    element: PAGES_COMPONENTS[page]
  };
  return pageRoute;
});

const activityDetailRoute: RouteObject = {
  path: "/activity/:id",
  element: viewActivity 
};

const router = createBrowserRouter([
  {
    path: "/",
    element: news
  },
  ...pagesRoutes,
  activityDetailRoute, // Add the results activity route to the router configuration
]);

export { router };
