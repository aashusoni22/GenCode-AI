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
        element: (
          <ProtectedRoute authentication={false}>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/generate",
        element: (
          <ProtectedRoute authentication={false}>
            <GeneratePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute authentication>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/about",
        element: (
          <ProtectedRoute authentication={false}>
            <AboutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/resources",
        element: (
          <ProtectedRoute authentication={false}>
            <ResourcesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/pricing",
        element: (
          <ProtectedRoute authentication={false}>
            <PricingPage />
          </ProtectedRoute>
        ),
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
