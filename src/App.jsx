// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Context providers
import { AuthProvider } from "./context/AuthContext";
import { RoleProvider } from "./context/RoleContext";
import { SEOProvider } from "./context/SeoContext";
// Route components
import PublicRoutes from "./routes/PublicRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import SEO from "./components/SEO";

// Lazy load admin login page
const AdminLogin = lazy(() =>
  import(/* webpackChunkName: "admin-login" */ "./Pages/admin/Login")
);

// Better loading component
const LoadingFallback = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <RoleProvider>
        <SEOProvider>
          <Router>
            <SEO title="Home" description="Welcome" />
            <SpeedInsights />
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Admin login - must come before admin routes */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Admin panel routes - must come before public routes */}
                <Route path="/admin/*" element={<AdminRoutes />} />

                {/* Public routes - catch-all must come last */}
                <Route path="/*" element={<PublicRoutes />} />
              </Routes>
            </Suspense>
          </Router>
        </SEOProvider>
      </RoleProvider>
    </AuthProvider>
  );
}

export default App;
