import { Client, Account, Databases, ID } from "appwrite";

// Appwrite configuration
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite Endpoint
  .setProject("cvowf-production"); // Your Project ID

export const account = new Account(client);
export const databases = new Databases(client);

export const CVOWF_DATABASE_ID = "cvowf_main_db";

// Custom error classes
export class AuthenticationError extends Error {
  constructor(message, code = null) {
    super(message);
    this.name = "AuthenticationError";
    this.code = code;
  }
}

export class ValidationError extends Error {
  constructor(message, field = null) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

// Authentication service
export class AuthService {
  // User roles and default permissions
  static ROLES = {
    ADMIN: "admin",
    DONOR: "donor",
    VOLUNTEER: "volunteer",
    VIEWER: "viewer",
  };

  static getDefaultPermissions(role) {
    const permissionMap = {
      [this.ROLES.ADMIN]: ["admin", "create", "update", "delete", "read"],
      [this.ROLES.DONOR]: ["donate", "read_own_profile", "update_own_profile"],
      [this.ROLES.VOLUNTEER]: [
        "volunteer",
        "read_programs",
        "update_own_profile",
      ],
      [this.ROLES.VIEWER]: ["read_public"],
    };
    return permissionMap[role] || permissionMap[this.ROLES.VIEWER];
  }

  // Register new user
  async register(userData) {
    const {
      email,
      password,
      firstName,
      lastName,
      role = this.ROLES.DONOR,
      phone = "",
    } = userData;

    try {
      // Validate input
      this.validateRegistrationData(userData);

      // Create user account
      const user = await account.create(
        ID.unique(),
        email,
        password,
        `${firstName} ${lastName}`
      );

      // Create email session automatically after registration
      const session = await account.createEmailSession(email, password);

      // Create user profile in database
      await this.createUserProfile(user.$id, {
        firstName,
        lastName,
        email,
        phone,
        role,
        permissions: this.getDefaultPermissions(role),
        status: "active",
        emailVerified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // Send verification email
      try {
        await account.createVerification(
          `${window.location.origin}/auth/verify`
        );
      } catch (error) {
        console.warn("Could not send verification email:", error.message);
        // Don't fail registration if email verification fails
      }

      return { user, session, needsVerification: true };
    } catch (error) {
      throw new AuthenticationError(this.parseAppwriteError(error));
    }
  }

  // Login user
  async login(email, password) {
    try {
      // Validate input
      if (!email || !password) {
        throw new ValidationError("Email and password are required");
      }

      const session = await account.createEmailSession(email, password);
      const user = await account.get();

      // Get user profile and permissions
      const profile = await this.getUserProfile(user.$id);

      return { user, session, profile };
    } catch (error) {
      throw new AuthenticationError(this.parseAppwriteError(error));
    }
  }

  // Logout user
  async logout() {
    try {
      await account.deleteSession("current");
    } catch (error) {
      throw new AuthenticationError("Failed to logout");
    }
  }

  // Get current user with profile
  async getCurrentUser() {
    try {
      const user = await account.get();
      const profile = await this.getUserProfile(user.$id);
      return { ...user, profile };
    } catch (error) {
      return null;
    }
  }

  // Reset password
  async resetPassword(email) {
    try {
      if (!email) {
        throw new ValidationError("Email is required");
      }

      await account.createRecovery(
        email,
        `${window.location.origin}/auth/reset-password`
      );

      return {
        success: true,
        message: "Password reset email sent successfully",
      };
    } catch (error) {
      throw new AuthenticationError(this.parseAppwriteError(error));
    }
  }

  // Complete password reset
  async updatePassword(userId, secret, newPassword, confirmPassword) {
    try {
      if (newPassword !== confirmPassword) {
        throw new ValidationError("Passwords do not match");
      }

      if (newPassword.length < 8) {
        throw new ValidationError(
          "Password must be at least 8 characters long"
        );
      }

      await account.updateRecovery(
        userId,
        secret,
        newPassword,
        confirmPassword
      );

      return { success: true, message: "Password updated successfully" };
    } catch (error) {
      throw new AuthenticationError(this.parseAppwriteError(error));
    }
  }

  // Create user profile in database
  async createUserProfile(userId, profileData) {
    try {
      await databases.createDocument(
        CVOWF_DATABASE_ID,
        "users", // Collection ID
        userId,
        profileData
      );
    } catch (error) {
      throw new AuthenticationError("Failed to create user profile");
    }
  }

  // Get user profile from database
  async getUserProfile(userId) {
    try {
      const profile = await databases.getDocument(
        CVOWF_DATABASE_ID,
        "users",
        userId
      );
      return profile;
    } catch (error) {
      return null;
    }
  }

  // Validate registration data
  validateRegistrationData(userData) {
    const { email, password, firstName, lastName, role } = userData;

    if (!email || !password || !firstName || !lastName) {
      throw new ValidationError("All required fields must be filled");
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ValidationError("Please enter a valid email address");
    }

    // Password validation
    if (password.length < 8) {
      throw new ValidationError("Password must be at least 8 characters long");
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      throw new ValidationError(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      );
    }

    // Name validation
    if (firstName.trim().length < 2) {
      throw new ValidationError(
        "First name must be at least 2 characters long"
      );
    }

    if (lastName.trim().length < 2) {
      throw new ValidationError("Last name must be at least 2 characters long");
    }

    // Role validation
    if (role && !Object.values(this.ROLES).includes(role)) {
      throw new ValidationError("Invalid role specified");
    }
  }

  // Parse Appwrite errors into user-friendly messages
  parseAppwriteError(error) {
    if (error.code === 409) {
      return "An account with this email already exists";
    }
    if (error.code === 401) {
      return "Invalid email or password";
    }
    if (error.code === 400) {
      if (error.message.includes("password")) {
        return "Password does not meet security requirements";
      }
      if (error.message.includes("email")) {
        return "Please enter a valid email address";
      }
    }
    return error.message || "An unexpected error occurred";
  }

  // Check if user has specific permission
  hasPermission(userPermissions, requiredPermission) {
    if (!Array.isArray(userPermissions)) return false;
    return (
      userPermissions.includes(requiredPermission) ||
      userPermissions.includes("admin")
    );
  }

  // Check if user has specific role
  hasRole(userRole, requiredRole) {
    return userRole === requiredRole || userRole === this.ROLES.ADMIN;
  }
}

// Export singleton instance
export const authService = new AuthService();
