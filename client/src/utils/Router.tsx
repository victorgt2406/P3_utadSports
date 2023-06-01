import { RouteObject, createBrowserRouter } from "react-router-dom";
import { PAGES_COMPONENTS, PAGES } from "../routes";

const { news, viewActivity, ResultsActivity } = PAGES_COMPONENTS;
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
const activityScoreRoute: RouteObject = {
  path: "/results/:id",
  element: ResultsActivity 
};

const router = createBrowserRouter([
  {
    path: "/",
    element: news
  },
  ...pagesRoutes,
  activityDetailRoute,
  activityScoreRoute 
]);

export { router };
