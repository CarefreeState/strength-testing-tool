// 配置路由
import { createHashRouter, RouterProvider} from "react-router-dom";
import { lazy, Suspense } from "react";

const Layout = lazy(() => import("@/pages/Layout"))
const NotFound = lazy(() => import("@/pages/NotFound"))
const Combat = lazy(() => import("@/pages/Layout/Combat"))
const Domestic = lazy(() => import("@/pages/Layout/Search/Domestic"))
const Overseas = lazy(() => import("@/pages/Layout/Search/Overseas"))
const Robot = lazy(() => import("@/pages/Layout/Search/Robot"))
const LoadingAnimation = lazy(() => import("@/components/Loading/LoadingAnimation"))

const router = createHashRouter([
  {
    path: "/",
    element: <Suspense><Layout /></Suspense>,
    children: [
      {
        path: "/loading",
        element: <Suspense><LoadingAnimation /></Suspense>,
      },
      {
        path: "/combat",
        element: <Suspense><Combat /></Suspense>,
      },
      {
        index: true,
        element: <Suspense><Robot /></Suspense>,
      },
      {
        path: "/search",
        element: <Suspense><Robot /></Suspense>,
      },
      {
        path: "/search/robot",
        element: <Suspense><Robot /></Suspense>,
      },
      {
        path: "/search/domestic",
        element: <Suspense><Domestic /></Suspense>,
      },
      {
        path: "/search/overseas",
        element: <Suspense><Overseas /></Suspense>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);

const AppRouter = () => {
  return (
    <RouterProvider router={router} />
  );
}
export { router }

export default AppRouter
