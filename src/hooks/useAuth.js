import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";

// Create auth context
const AuthContext = createContext(null);

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is authenticated on app start
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.log("Not authenticated");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const {
        user: authUser,
        session,
        profile,
      } = await authService.login(email, password);
      const userWithProfile = { ...authUser, profile };
      setUser(userWithProfile);
      return userWithProfile;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const { user: authUser, session } = await authService.register(userData);
      const userWithProfile = await authService.getCurrentUser();
      setUser(userWithProfile);
      return userWithProfile;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (email) => {
    setError(null);
    try {
      return await authService.resetPassword(email);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Update password function
  const updatePassword = async (
    userId,
    secret,
    newPassword,
    confirmPassword
  ) => {
    setError(null);
    try {
      return await authService.updatePassword(
        userId,
        secret,
        newPassword,
        confirmPassword
      );
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Utility functions
  const hasRole = (role) => {
    if (!user?.profile) return false;
    return authService.hasRole(user.profile.role, role);
  };

  const hasPermission = (permission) => {
    if (!user?.profile) return false;
    return authService.hasPermission(user.profile.permissions, permission);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    resetPassword,
    updatePassword,
    hasRole,
    hasPermission,
    isAuthenticated: !!user,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
