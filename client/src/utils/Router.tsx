import { RouteObject, RouterProviderProps, createBrowserRouter, useNavigate } from "react-router-dom";
import { PAGES_COMPONENTS, PAGES } from "../routes";

const { news } = PAGES_COMPONENTS;

const pagesRoutes: RouteObject[] = PAGES.map((page) => {
    const pageRoute: RouteObject = {
        path: `/${page}`,
        element: PAGES_COMPONENTS[page]
    }
    return pageRoute;
});

const initRouter:RouteObject = {
    
}

const router = createBrowserRouter([
    {
        path: "/",
        element: news
    },
    ...pagesRoutes
],);

export {router}