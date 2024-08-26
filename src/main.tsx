import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import AppLayout from "./AppLayout.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import VideoLayoutContextProvider from "./context/VideoLayoutContext.tsx";
import MenuBarContextProvider from "./context/MenuBarContext.tsx";
import SearchOverlayContextProvider from "./context/SearchOverlayContext.tsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";
import LoadingPage from "./pages/LoadingPage/LoadingPage.tsx";
import { ReactQueryDevtools } from "react-query/devtools";
import { MS_IN_DAY } from "./utils/constants.ts";

// ====================================
const Home = lazy(() => import("./pages/Home/Home.tsx"));
const AllGenersPage = lazy(() => import("./pages/Genres/AllGenersPage.tsx"));
const AllPlatformsPage = lazy(
  () => import("./pages/Platforms/AllPlatformsPage.tsx")
);
const GamePage = lazy(() => import("./pages/Game/GamePage.tsx"));
const LandingPage = lazy(
  () => import("./pages/Home/LandingPage/LandingPage.tsx")
);
const GenrePage = lazy(() => import("./pages/Home/GenrePage/GenrePage.tsx"));
const PlatformPage = lazy(
  () => import("./pages/Home/PlatformPage/PlatformPage.tsx")
);

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    element: (
      <Suspense fallback={<LoadingPage />}>
        <AppLayout />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          { path: "/", element: <LandingPage /> },
          {
            path: "/genre/:name",
            element: <GenrePage />,
          },
          {
            path: "/platform/:name",
            element: <PlatformPage />,
          },
        ],
      },
      {
        path: "/genres",
        element: <AllGenersPage />,
      },
      {
        path: "/platforms",
        element: <AllPlatformsPage />,
      },
      {
        path: "/game/:name",
        element: <GamePage />,
      },
    ],
  },
]);

// =======================================
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: MS_IN_DAY,
      useErrorBoundary: true,
    },
  },
});
// =======================================
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <VideoLayoutContextProvider>
        <MenuBarContextProvider>
          <SearchOverlayContextProvider>
            <RouterProvider router={router} />
          </SearchOverlayContextProvider>
        </MenuBarContextProvider>
      </VideoLayoutContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
