import { useAuth } from "../../hooks/useAuth";

// Component for conditional rendering based on roles and permissions
const RoleGuard = ({
  children,
  allowedRoles = [],
  allowedPermissions = [],
  fallback = null,
  requireAll = false,
}) => {
  const { user, hasRole, hasPermission } = useAuth();

  if (!user) {
    return fallback;
  }

  // Check role requirements
  let hasRequiredRole = true;
  if (allowedRoles.length > 0) {
    if (requireAll) {
      hasRequiredRole = allowedRoles.every((role) => hasRole(role));
    } else {
      hasRequiredRole = allowedRoles.some((role) => hasRole(role));
    }
  }

  // Check permission requirements
  let hasRequiredPermission = true;
  if (allowedPermissions.length > 0) {
    if (requireAll) {
      hasRequiredPermission = allowedPermissions.every((permission) =>
        hasPermission(permission)
      );
    } else {
      hasRequiredPermission = allowedPermissions.some((permission) =>
        hasPermission(permission)
      );
    }
  }

  // Render children if user has required access
  if (hasRequiredRole && hasRequiredPermission) {
    return children;
  }

  // Render fallback or nothing
  return fallback;
};

export default RoleGuard;

// Convenience components for common role checks
export const AdminOnly = ({ children, fallback = null }) => (
  <RoleGuard allowedRoles={["admin"]} fallback={fallback}>
    {children}
  </RoleGuard>
);

export const DonorOnly = ({ children, fallback = null }) => (
  <RoleGuard allowedRoles={["donor"]} fallback={fallback}>
    {children}
  </RoleGuard>
);

export const VolunteerOnly = ({ children, fallback = null }) => (
  <RoleGuard allowedRoles={["volunteer"]} fallback={fallback}>
    {children}
  </RoleGuard>
);

export const DonorOrVolunteer = ({ children, fallback = null }) => (
  <RoleGuard allowedRoles={["donor", "volunteer"]} fallback={fallback}>
    {children}
  </RoleGuard>
);

export const AuthenticatedOnly = ({ children, fallback = null }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : fallback;
};
