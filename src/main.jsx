import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  HomePage,
  GeneratePage,
  AboutPage,
  LoginPage,
  SignUpPage,
  ProfilePage,
  ResourcesPage,
  PricingPage,
  // CommunityPage,
  JobPage,
} from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AuthRedirectRoute from "./components/AuthRedirectRoute.jsx";
import AuthProvider from "./context/AuthContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/generate",
        element: (
          <ProtectedRoute>
            <GeneratePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/resources",
        element: <ResourcesPage />,
      },
      {
        path: "/pricing",
        element: <PricingPage />,
      },
      {
        path: "/jobs",
        element: (
          <AuthRedirectRoute>
            <JobPage />
          </AuthRedirectRoute>
        ),
      },
      // {
      //   path: "/community",
      //   element: (
      //     <AuthRedirectRoute>
      //       <CommunityPage />
      //     </AuthRedirectRoute>
      //   ),
      // },
      {
        path: "/login",
        element: (
          <AuthRedirectRoute>
            <LoginPage />
          </AuthRedirectRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthRedirectRoute>
            <SignUpPage />
          </AuthRedirectRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
