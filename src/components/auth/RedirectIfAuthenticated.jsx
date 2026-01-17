import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

// Component to redirect authenticated users away from auth pages
const RedirectIfAuthenticated = ({ children, redirectTo = "/dashboard" }) => {
  const { isAuthenticated, loading, user } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect authenticated users to dashboard or role-specific page
  if (isAuthenticated) {
    // Role-based redirection
    if (user?.profile?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user?.profile?.role === "volunteer") {
      return <Navigate to="/volunteer/dashboard" replace />;
    } else {
      return <Navigate to={redirectTo} replace />;
    }
  }

  // Render auth pages for non-authenticated users
  return children;
};

export default RedirectIfAuthenticated;
