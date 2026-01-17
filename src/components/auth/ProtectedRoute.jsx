import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = ({
  children,
  requiredRole = null,
  requiredPermissions = [],
  redirectTo = "/auth/login",
}) => {
  const { user, loading, isAuthenticated, hasRole, hasPermission } = useAuth();
  const location = useLocation();

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

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check role requirements
  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-red-500 mb-4">
              <svg
                className="h-12 w-12 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">
              Access Denied
            </h1>
            <p className="text-gray-600 mb-6">
              You don't have permission to access this page. Please contact an
              administrator if you believe this is an error.
            </p>
            <button
              onClick={() => window.history.back()}
              className="btn-secondary"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Check permission requirements
  if (requiredPermissions.length > 0) {
    const hasRequiredPermissions = requiredPermissions.some((permission) =>
      hasPermission(permission)
    );

    if (!hasRequiredPermissions) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="text-red-500 mb-4">
                <svg
                  className="h-12 w-12 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
                  />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900 mb-2">
                Insufficient Permissions
              </h1>
              <p className="text-gray-600 mb-6">
                You don't have the required permissions to access this resource.
              </p>
              <button
                onClick={() => window.history.back()}
                className="btn-secondary"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  // Render the protected content
  return children;
};

export default ProtectedRoute;
