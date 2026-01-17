import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

// Component to route users to appropriate dashboard based on their role
const RoleDashboard = () => {
  const { user, loading, isAuthenticated } = useAuth();

  // Show loading while determining user role
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-sm text-gray-600">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // Route based on user role
  const userRole = user?.profile?.role;

  switch (userRole) {
    case "admin":
      return <Navigate to="/admin/dashboard" replace />;

    case "volunteer":
      return <Navigate to="/volunteer/dashboard" replace />;

    case "donor":
    default:
      return <Navigate to="/donor/dashboard" replace />;
  }
};

export default RoleDashboard;
