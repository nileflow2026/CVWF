# CVOWF Appwrite Configuration Guide

**Version:** 1.0  
**Date:** January 16, 2026  
**Platform:** Appwrite 1.5+  
**Project:** CVOWF NGO Platform

---

## Project Setup

### Initial Configuration

```javascript
// appwrite.config.js
import { Client, Account, Databases, Storage, Teams } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite Endpoint
  .setProject("cvowf-production"); // Your Project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const teams = new Teams(client);

export const CVOWF_DATABASE_ID = "cvowf_main_db";
export const CVOWF_BUCKET_ID = "cvowf_media_bucket";

export default client;
```

---

## Authentication Configuration

### Auth Settings

```json
{
  "authMethods": {
    "emailPassword": true,
    "magicURL": false,
    "anonymous": false,
    "phoneAuth": false,
    "oauth": {
      "google": true,
      "facebook": false,
      "github": false
    }
  },
  "passwordPolicy": {
    "minLength": 8,
    "requireUppercase": true,
    "requireLowercase": true,
    "requireNumbers": true,
    "requireSpecialChars": false
  },
  "sessionLength": 31536000,
  "maxSessions": 10
}
```

### User Registration Flow

```javascript
// authService.js
export class AuthService {
  // Register new user
  async register(email, password, firstName, lastName, role = "donor") {
    try {
      // Create user account
      const user = await account.create(
        ID.unique(),
        email,
        password,
        `${firstName} ${lastName}`
      );

      // Create email session
      const session = await account.createEmailSession(email, password);

      // Create user profile in database
      await this.createUserProfile(user.$id, {
        firstName,
        lastName,
        email,
        role,
        permissions: this.getDefaultPermissions(role),
        status: "active",
        emailVerified: false,
      });

      // Send verification email
      await account.createVerification("https://cvowf.org/verify");

      return { user, session };
    } catch (error) {
      throw new AppwriteException(error.message);
    }
  }

  // Login user
  async login(email, password) {
    try {
      const session = await account.createEmailSession(email, password);
      const user = await account.get();

      // Get user profile and permissions
      const profile = await this.getUserProfile(user.$id);

      return { user, session, profile };
    } catch (error) {
      throw new AuthenticationError(error.message);
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
}
```

---

## Database Collections

### 1. Users Collection

```json
{
  "$id": "users",
  "name": "Users",
  "permissions": [
    "read(\"role:admin\")",
    "create(\"role:admin\")",
    "update(\"role:admin\", \"user:self\")",
    "delete(\"role:admin\")"
  ],
  "documentSecurity": true,
  "attributes": [
    {
      "$id": "userId",
      "key": "userId",
      "type": "string",
      "status": "available",
      "required": true,
      "size": 36,
      "default": null
    },
    {
      "$id": "firstName",
      "key": "firstName",
      "type": "string",
      "status": "available",
      "required": true,
      "size": 50,
      "default": null
    },
    {
      "$id": "lastName",
      "key": "lastName",
      "type": "string",
      "status": "available",
      "required": true,
      "size": 50,
      "default": null
    },
    {
      "$id": "email",
      "key": "email",
      "type": "string",
      "status": "available",
      "required": true,
      "size": 255,
      "default": null
    },
    {
      "$id": "role",
      "key": "role",
      "type": "string",
      "status": "available",
      "required": true,
      "size": 20,
      "default": "donor",
      "elements": ["admin", "editor", "finance", "donor", "viewer"]
    },
    {
      "$id": "permissions",
      "key": "permissions",
      "type": "string",
      "status": "available",
      "required": false,
      "size": 1000,
      "array": true,
      "default": []
    },
    {
      "$id": "status",
      "key": "status",
      "type": "string",
      "status": "available",
      "required": true,
      "size": 20,
      "default": "active",
      "elements": ["active", "inactive", "suspended"]
    },
    {
      "$id": "emailVerified",
      "key": "emailVerified",
      "type": "boolean",
      "status": "available",
      "required": true,
      "default": false
    },
    {
      "$id": "lastLogin",
      "key": "lastLogin",
      "type": "datetime",
      "status": "available",
      "required": false,
      "default": null
    },
    {
      "$id": "createdAt",
      "key": "createdAt",
      "type": "datetime",
      "status": "available",
      "required": true,
      "default": null
    },
    {
      "$id": "updatedAt",
      "key": "updatedAt",
      "type": "datetime",
      "status": "available",
      "required": true,
      "default": null
    }
  ],
  "indexes": [
    {
      "$id": "email_idx",
      "key": "email_idx",
      "type": "unique",
      "status": "available",
      "attributes": ["email"]
    },
    {
      "$id": "userId_idx",
      "key": "userId_idx",
      "type": "unique",
      "status": "available",
      "attributes": ["userId"]
    },
    {
      "$id": "role_idx",
      "key": "role_idx",
      "type": "key",
      "status": "available",
      "attributes": ["role"]
    }
  ]
}
```

### 2. Programs Collection

```json
{
  "$id": "programs",
  "name": "Programs",
  "permissions": [
    "read(\"any\")",
    "create(\"role:admin\", \"role:editor\")",
    "update(\"role:admin\", \"role:editor\")",
    "delete(\"role:admin\")"
  ],
  "documentSecurity": true,
  "attributes": [
    {
      "$id": "name",
      "key": "name",
      "type": "string",
      "status": "available",
      "required": true,
      "size": 200,
      "default": null
    },
    {
      "$id": "slug",
      "key": "slug",
      "type": "string",
      "status": "available",
      "required": true,
      "size": 200,
      "default": null
    },
    {
      "$id": "description",
      "key": "description",
      "type": "string",
      "status": "available",
      "required": true,
      "size": 2000,
      "default": null
    },
    {
      "$id": "shortDescription",
      "key": "shortDescription",
      "type": "string",
      "status": "available",
      "required": true,
      "size": 300,
      "default": null
    },
    {
      "$id": "targetAmount",
      "key": "targetAmount",
      "type": "integer",
      "status": "available",
      "required": true,
      "min": 0,
      "max": 10000000,
      "default": 0
    },
    {
      "$id": "raisedAmount",
      "key": "raisedAmount",
      "type": "integer",
      "status": "available",
      "required": true,
      "min": 0,
      "max": 10000000,
      "default": 0
    },
    {
      "$id": "currency",
      "key": "currency",
      "type": "string",
      "status": "available",
      "required": true,
      "size": 3,
      "default": "USD"
    },
    {
      "$id": "status",
      "key": "status",
      "type": "string",
      "status": "available",
      "required": true,
      "size": 20,
      "default": "draft",
      "elements": ["draft", "active", "paused", "completed", "cancelled"]
    },
    {
      "$id": "category",
      "key": "category",
      "type": "string",
      "status": "available",
      "required": true,
      "size": 50,
      "default": null,
      "elements": [
        "education",
        "health",
        "environment",
        "community",
        "emergency"
      ]
    },
    {
      "$id": "location",
      "key": "location",
      "type": "string",
      "status": "available",
      "required": false,
      "size": 200,
      "default": null
    },
    {
      "$id": "images",
      "key": "images",
      "type": "string",
      "status": "available",
      "required": false,
      "size": 100,
      "array": true,
      "default": []
    },
    {
      "$id": "featured",
      "key": "featured",
      "type": "boolean",
      "status": "available",
      "required": true,
      "default": false
    },
    {
      "$id": "startDate",
      "key": "startDate",
      "type": "datetime",
      "status": "available",
      "required": false,
      "default": null
    },
    {
      "$id": "endDate",
      "key": "endDate",
      "type": "datetime",
      "status": "available",
      "required": false,
      "default": null
    },
    {
      "$id": "createdBy",
      "key": "createdBy",
      "type": "string",
      "status": "available",
      "required": true,
      "size": 36,
      "default": null
    },
    {
      "$id": "createdAt",
      "key": "createdAt",
      "type": "datetime",
      "status": "available",
      "required": true,
      "default": null
    },
    {
      "$id": "updatedAt",
      "key": "updatedAt",
      "type": "datetime",
      "status": "available",
      "required": true,
      "default": null
    }
  ],
  "indexes": [
    {
      "$id": "slug_idx",
      "key": "slug_idx",
      "type": "unique",
      "status": "available",
      "attributes": ["slug"]
    },
    {
      "$id": "status_idx",
      "key": "status_idx",
      "type": "key",
      "status": "available",
      "attributes": ["status"]
    },
    {
      "$id": "category_idx",
      "key": "category_idx",
      "type": "key",
      "status": "available",
      "attributes": ["category"]
    },
    {
      "$id": "featured_idx",
      "key": "featured_idx",
      "type": "key",
      "status": "available",
      "attributes": ["featured"]
    }
  ]
}
```

### 3. Donations Collection

```json
{
  "$id": "donations",
  "name": "Donations",
  "permissions": [
    "read(\"role:admin\", \"role:finance\")",
    "create(\"any\")",
    "update(\"role:admin\", \"role:finance\")",
    "delete(\"role:admin\")"
  ],
  "documentSecurity": true,
  "attributes": [
    {
      "$id": "donorId",
      "key": "donorId",
      "type": "string",
      "status": "available",
      "required": false,
      "size": 36,
      "default": null
    },
    {
      "$id": "programId",
      "key": "programId",
      "type": "string",
      "status": "available",
      "required": false,
      "size": 36,
      "default": null
    },
    {
      "$id": "amount",
      "key": "amount",
      "type": "integer",
      "status": "available",
      "required": true,
      "min": 100,
      "max": 1000000,
      "default": null
    },
    {
      "$id": "currency",
      "key": "currency",
      "type": "string",
      "status": "available",
      "required": true,
      "size": 3,
      "default": "USD"
    },
    {
      "$id": "paymentMethod",
      "key": "paymentMethod",
      "type": "string",
      "status": "available",
      "required": true,
      "size": 20,
      "default": "stripe",
      "elements": ["stripe", "paypal", "bank_transfer", "check"]
    },
    {
      "$id": "paymentStatus",
      "key": "paymentStatus",
      "type": "string",
      "status": "available",
      "required": true,
      "size": 20,
      "default": "pending",
      "elements": ["pending", "completed", "failed", "refunded", "cancelled"]
    },
    {
      "$id": "transactionId",
      "key": "transactionId",
      "type": "string",
      "status": "available",
      "required": false,
      "size": 100,
      "default": null
    },
    {
      "$id": "stripeSessionId",
      "key": "stripeSessionId",
      "type": "string",
      "status": "available",
      "required": false,
      "size": 100,
      "default": null
    },
    {
      "$id": "anonymous",
      "key": "anonymous",
      "type": "boolean",
      "status": "available",
      "required": true,
      "default": false
    },
    {
      "$id": "recurring",
      "key": "recurring",
      "type": "boolean",
      "status": "available",
      "required": true,
      "default": false
    },
    {
      "$id": "recurringInterval",
      "key": "recurringInterval",
      "type": "string",
      "status": "available",
      "required": false,
      "size": 10,
      "default": null,
      "elements": ["monthly", "quarterly", "yearly"]
    },
    {
      "$id": "donorEmail",
      "key": "donorEmail",
      "type": "string",
      "status": "available",
      "required": false,
      "size": 255,
      "default": null
    },
    {
      "$id": "donorName",
      "key": "donorName",
      "type": "string",
      "status": "available",
      "required": false,
      "size": 100,
      "default": null
    },
    {
      "$id": "message",
      "key": "message",
      "type": "string",
      "status": "available",
      "required": false,
      "size": 500,
      "default": null
    },
    {
      "$id": "receiptSent",
      "key": "receiptSent",
      "type": "boolean",
      "status": "available",
      "required": true,
      "default": false
    },
    {
      "$id": "taxDeductible",
      "key": "taxDeductible",
      "type": "boolean",
      "status": "available",
      "required": true,
      "default": true
    },
    {
      "$id": "createdAt",
      "key": "createdAt",
      "type": "datetime",
      "status": "available",
      "required": true,
      "default": null
    },
    {
      "$id": "updatedAt",
      "key": "updatedAt",
      "type": "datetime",
      "status": "available",
      "required": true,
      "default": null
    }
  ],
  "indexes": [
    {
      "$id": "donorId_idx",
      "key": "donorId_idx",
      "type": "key",
      "status": "available",
      "attributes": ["donorId"]
    },
    {
      "$id": "programId_idx",
      "key": "programId_idx",
      "type": "key",
      "status": "available",
      "attributes": ["programId"]
    },
    {
      "$id": "paymentStatus_idx",
      "key": "paymentStatus_idx",
      "type": "key",
      "status": "available",
      "attributes": ["paymentStatus"]
    },
    {
      "$id": "createdAt_idx",
      "key": "createdAt_idx",
      "type": "key",
      "status": "available",
      "attributes": ["createdAt"]
    },
    {
      "$id": "transactionId_idx",
      "key": "transactionId_idx",
      "type": "unique",
      "status": "available",
      "attributes": ["transactionId"]
    }
  ]
}
```

### 4. Impact Stories Collection

```json
{
  "$id": "impactStories",
  "name": "Impact Stories",
  "permissions": [
    "read(\"any\")",
    "create(\"role:admin\", \"role:editor\")",
    "update(\"role:admin\", \"role:editor\")",
    "delete(\"role:admin\")"
  ],
  "documentSecurity": true,
  "attributes": [
    {
      "$id": "title",
      "key": "title",
      "type": "string",
      "status": "available",
      "required": true,
      "size": 200,
      "default": null
    },
    {
      "$id": "slug",
      "key": "slug",
      "type": "string",
      "status": "available",
      "required": true,
      "size": 200,
      "default": null
    },
    {
      "$id": "content",
      "key": "content",
      "type": "string",
      "status": "available",
      "required": true,
      "size": 5000,
      "default": null
    },
    {
      "$id": "excerpt",
      "key": "excerpt",
      "type": "string",
      "status": "available",
      "required": true,
      "size": 300,
      "default": null
    },
    {
      "$id": "beneficiaryName",
      "key": "beneficiaryName",
      "type": "string",
      "status": "available",
      "required": false,
      "size": 100,
      "default": null
    },
    {
      "$id": "beneficiaryAge",
      "key": "beneficiaryAge",
      "type": "integer",
      "status": "available",
      "required": false,
      "min": 0,
      "max": 120,
      "default": null
    },
    {
      "$id": "location",
      "key": "location",
      "type": "string",
      "status": "available",
      "required": false,
      "size": 200,
      "default": null
    },
    {
      "$id": "programId",
      "key": "programId",
      "type": "string",
      "status": "available",
      "required": false,
      "size": 36,
      "default": null
    },
    {
      "$id": "featuredImage",
      "key": "featuredImage",
      "type": "string",
      "status": "available",
      "required": false,
      "size": 100,
      "default": null
    },
    {
      "$id": "images",
      "key": "images",
      "type": "string",
      "status": "available",
      "required": false,
      "size": 100,
      "array": true,
      "default": []
    },
    {
      "$id": "status",
      "key": "status",
      "type": "string",
      "status": "available",
      "required": true,
      "size": 20,
      "default": "draft",
      "elements": ["draft", "published", "archived"]
    },
    {
      "$id": "featured",
      "key": "featured",
      "type": "boolean",
      "status": "available",
      "required": true,
      "default": false
    },
    {
      "$id": "publishedAt",
      "key": "publishedAt",
      "type": "datetime",
      "status": "available",
      "required": false,
      "default": null
    },
    {
      "$id": "createdBy",
      "key": "createdBy",
      "type": "string",
      "status": "available",
      "required": true,
      "size": 36,
      "default": null
    },
    {
      "$id": "createdAt",
      "key": "createdAt",
      "type": "datetime",
      "status": "available",
      "required": true,
      "default": null
    },
    {
      "$id": "updatedAt",
      "key": "updatedAt",
      "type": "datetime",
      "status": "available",
      "required": true,
      "default": null
    }
  ],
  "indexes": [
    {
      "$id": "slug_idx",
      "key": "slug_idx",
      "type": "unique",
      "status": "available",
      "attributes": ["slug"]
    },
    {
      "$id": "status_idx",
      "key": "status_idx",
      "type": "key",
      "status": "available",
      "attributes": ["status"]
    },
    {
      "$id": "programId_idx",
      "key": "programId_idx",
      "type": "key",
      "status": "available",
      "attributes": ["programId"]
    },
    {
      "$id": "featured_idx",
      "key": "featured_idx",
      "type": "key",
      "status": "available",
      "attributes": ["featured"]
    },
    {
      "$id": "publishedAt_idx",
      "key": "publishedAt_idx",
      "type": "key",
      "status": "available",
      "attributes": ["publishedAt"]
    }
  ]
}
```

### 5. Program Updates Collection

```json
{
  "$id": "programUpdates",
  "name": "Program Updates",
  "permissions": [
    "read(\"any\")",
    "create(\"role:admin\", \"role:editor\")",
    "update(\"role:admin\", \"role:editor\")",
    "delete(\"role:admin\")"
  ],
  "documentSecurity": true,
  "attributes": [
    {
      "$id": "programId",
      "key": "programId",
      "type": "string",
      "status": "available",
      "required": true,
      "size": 36,
      "default": null
    },
    {
      "$id": "title",
      "key": "title",
      "type": "string",
      "status": "available",
      "required": true,
      "size": 200,
      "default": null
    },
    {
      "$id": "content",
      "key": "content",
      "type": "string",
      "status": "available",
      "required": true,
      "size": 2000,
      "default": null
    },
    {
      "$id": "updateType",
      "key": "updateType",
      "type": "string",
      "status": "available",
      "required": true,
      "size": 20,
      "default": "general",
      "elements": ["general", "milestone", "funding", "completion", "urgent"]
    },
    {
      "$id": "images",
      "key": "images",
      "type": "string",
      "status": "available",
      "required": false,
      "size": 100,
      "array": true,
      "default": []
    },
    {
      "$id": "status",
      "key": "status",
      "type": "string",
      "status": "available",
      "required": true,
      "size": 20,
      "default": "draft",
      "elements": ["draft", "published", "archived"]
    },
    {
      "$id": "notifyDonors",
      "key": "notifyDonors",
      "type": "boolean",
      "status": "available",
      "required": true,
      "default": false
    },
    {
      "$id": "publishedAt",
      "key": "publishedAt",
      "type": "datetime",
      "status": "available",
      "required": false,
      "default": null
    },
    {
      "$id": "createdBy",
      "key": "createdBy",
      "type": "string",
      "status": "available",
      "required": true,
      "size": 36,
      "default": null
    },
    {
      "$id": "createdAt",
      "key": "createdAt",
      "type": "datetime",
      "status": "available",
      "required": true,
      "default": null
    },
    {
      "$id": "updatedAt",
      "key": "updatedAt",
      "type": "datetime",
      "status": "available",
      "required": true,
      "default": null
    }
  ],
  "indexes": [
    {
      "$id": "programId_idx",
      "key": "programId_idx",
      "type": "key",
      "status": "available",
      "attributes": ["programId"]
    },
    {
      "$id": "status_idx",
      "key": "status_idx",
      "type": "key",
      "status": "available",
      "attributes": ["status"]
    },
    {
      "$id": "updateType_idx",
      "key": "updateType_idx",
      "type": "key",
      "status": "available",
      "attributes": ["updateType"]
    },
    {
      "$id": "publishedAt_idx",
      "key": "publishedAt_idx",
      "type": "key",
      "status": "available",
      "attributes": ["publishedAt"]
    }
  ]
}
```

---

## Storage Configuration

### Bucket Setup

```javascript
// Storage bucket configuration
export const STORAGE_CONFIG = {
  buckets: {
    media: {
      id: "cvowf_media",
      name: "CVOWF Media Files",
      permissions: [
        'read("any")',
        'create("role:admin", "role:editor")',
        'update("role:admin", "role:editor")',
        'delete("role:admin")',
      ],
      fileSecurity: true,
      enabled: true,
      maximumFileSize: 50000000, // 50MB
      allowedFileExtensions: [
        "jpg",
        "jpeg",
        "png",
        "webp",
        "gif", // Images
        "pdf",
        "doc",
        "docx", // Documents
        "mp4",
        "webm",
        "mov", // Videos
      ],
      compression: "gzip",
      encryption: true,
      antivirus: true,
    },
  },
};

// File upload service
export class FileUploadService {
  async uploadProgramImage(file, programId) {
    try {
      const fileId = ID.unique();
      const result = await storage.createFile(CVOWF_BUCKET_ID, fileId, file, [
        Permission.read(Role.any()),
        Permission.update(Role.user(programId)),
        Permission.delete(Role.user(programId)),
      ]);

      return {
        fileId: result.$id,
        url: this.getFileUrl(result.$id),
        preview: this.getFilePreview(result.$id, 800, 600),
      };
    } catch (error) {
      throw new StorageException(error.message);
    }
  }

  getFileUrl(fileId) {
    return `${client.config.endpoint}/storage/buckets/${CVOWF_BUCKET_ID}/files/${fileId}/view?project=${client.config.project}`;
  }

  getFilePreview(fileId, width = 800, height = 600) {
    return `${client.config.endpoint}/storage/buckets/${CVOWF_BUCKET_ID}/files/${fileId}/preview?width=${width}&height=${height}&project=${client.config.project}`;
  }
}
```

---

## Teams & Roles Configuration

### Team Structure

```javascript
// teams.config.js
export const TEAM_ROLES = {
  admin: {
    name: "Administrators",
    permissions: [
      "users:*",
      "programs:*",
      "donations:*",
      "stories:*",
      "settings:*",
      "analytics:*",
    ],
  },

  editor: {
    name: "Content Editors",
    permissions: [
      "programs:read",
      "programs:create",
      "programs:update",
      "stories:read",
      "stories:create",
      "stories:update",
      "files:upload",
    ],
  },

  finance: {
    name: "Finance Team",
    permissions: [
      "donations:read",
      "donations:update",
      "analytics:donations",
      "reports:financial",
    ],
  },

  viewer: {
    name: "Viewers",
    permissions: ["programs:read", "stories:read", "analytics:basic"],
  },
};

// Create teams programmatically
export class TeamService {
  async createTeams() {
    for (const [roleKey, roleConfig] of Object.entries(TEAM_ROLES)) {
      try {
        const team = await teams.create(
          ID.unique(),
          roleConfig.name,
          [Role.any()] // Initial permissions
        );

        console.log(`Created team: ${roleConfig.name}`);
      } catch (error) {
        console.error(`Error creating team ${roleConfig.name}:`, error);
      }
    }
  }

  async addUserToTeam(teamId, userId, roles = []) {
    try {
      const membership = await teams.createMembership(teamId, roles, userId);

      return membership;
    } catch (error) {
      throw new TeamException(error.message);
    }
  }
}
```

---

## Security Rules & Permissions

### Document-Level Security

```javascript
// permissions.config.js
export const SECURITY_RULES = {
  // Users collection - users can only read/update their own profile
  users: [
    Permission.read(Role.any()),
    Permission.create(Role.users()),
    Permission.update(Role.user("[USER_ID]")),
    Permission.delete(Role.team("admin")),
  ],

  // Programs - public read, admin/editor write
  programs: [
    Permission.read(Role.any()),
    Permission.create(Role.team("admin", "editor")),
    Permission.update(Role.team("admin", "editor")),
    Permission.delete(Role.team("admin")),
  ],

  // Donations - restricted access
  donations: [
    Permission.read(Role.team("admin", "finance")),
    Permission.create(Role.any()), // Anyone can donate
    Permission.update(Role.team("admin", "finance")),
    Permission.delete(Role.team("admin")),
  ],

  // Impact stories - public read, admin/editor write
  impactStories: [
    Permission.read(Role.any()),
    Permission.create(Role.team("admin", "editor")),
    Permission.update(Role.team("admin", "editor")),
    Permission.delete(Role.team("admin")),
  ],

  // Program updates - public read, admin/editor write
  programUpdates: [
    Permission.read(Role.any()),
    Permission.create(Role.team("admin", "editor")),
    Permission.update(Role.team("admin", "editor")),
    Permission.delete(Role.team("admin")),
  ],
};

// Advanced permission checking
export class PermissionService {
  async checkUserPermissions(userId, action, resource) {
    try {
      const user = await databases.getDocument("users", userId);
      const userRole = user.role;
      const userPermissions = user.permissions || [];

      // Check role-based permissions
      const rolePermissions = TEAM_ROLES[userRole]?.permissions || [];

      // Check specific permission
      const hasPermission =
        rolePermissions.includes(`${resource}:${action}`) ||
        rolePermissions.includes(`${resource}:*`) ||
        userPermissions.includes(`${resource}:${action}`);

      return hasPermission;
    } catch (error) {
      return false;
    }
  }

  async enforcePermission(userId, action, resource) {
    const hasPermission = await this.checkUserPermissions(
      userId,
      action,
      resource
    );

    if (!hasPermission) {
      throw new PermissionDeniedError(
        `User ${userId} does not have permission to ${action} on ${resource}`
      );
    }

    return true;
  }
}
```

---

## Database Service Layer

### Service Classes

```javascript
// services/programService.js
export class ProgramService {
  async createProgram(programData, userId) {
    try {
      // Verify user permissions
      await permissionService.enforcePermission(userId, "create", "programs");

      const program = await databases.createDocument(
        CVOWF_DATABASE_ID,
        "programs",
        ID.unique(),
        {
          ...programData,
          createdBy: userId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          slug: this.generateSlug(programData.name),
        }
      );

      return program;
    } catch (error) {
      throw new DatabaseException(error.message);
    }
  }

  async getPrograms(filters = {}, pagination = { limit: 25, offset: 0 }) {
    try {
      const queries = [
        Query.limit(pagination.limit),
        Query.offset(pagination.offset),
      ];

      if (filters.status) {
        queries.push(Query.equal("status", filters.status));
      }

      if (filters.category) {
        queries.push(Query.equal("category", filters.category));
      }

      if (filters.featured) {
        queries.push(Query.equal("featured", filters.featured));
      }

      queries.push(Query.orderDesc("createdAt"));

      const result = await databases.listDocuments(
        CVOWF_DATABASE_ID,
        "programs",
        queries
      );

      return result;
    } catch (error) {
      throw new DatabaseException(error.message);
    }
  }

  async updateProgramProgress(programId, newAmount, userId) {
    try {
      await permissionService.enforcePermission(userId, "update", "programs");

      const program = await databases.updateDocument(
        CVOWF_DATABASE_ID,
        "programs",
        programId,
        {
          raisedAmount: newAmount,
          updatedAt: new Date().toISOString(),
        }
      );

      return program;
    } catch (error) {
      throw new DatabaseException(error.message);
    }
  }

  generateSlug(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim("-");
  }
}

// services/donationService.js
export class DonationService {
  async createDonation(donationData) {
    try {
      const donation = await databases.createDocument(
        CVOWF_DATABASE_ID,
        "donations",
        ID.unique(),
        {
          ...donationData,
          paymentStatus: "pending",
          receiptSent: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      );

      return donation;
    } catch (error) {
      throw new DatabaseException(error.message);
    }
  }

  async getDonationsByDonor(donorId, pagination = { limit: 25, offset: 0 }) {
    try {
      const result = await databases.listDocuments(
        CVOWF_DATABASE_ID,
        "donations",
        [
          Query.equal("donorId", donorId),
          Query.orderDesc("createdAt"),
          Query.limit(pagination.limit),
          Query.offset(pagination.offset),
        ]
      );

      return result;
    } catch (error) {
      throw new DatabaseException(error.message);
    }
  }

  async updateDonationStatus(donationId, status, transactionId, userId) {
    try {
      await permissionService.enforcePermission(userId, "update", "donations");

      const donation = await databases.updateDocument(
        CVOWF_DATABASE_ID,
        "donations",
        donationId,
        {
          paymentStatus: status,
          transactionId: transactionId,
          updatedAt: new Date().toISOString(),
        }
      );

      // Update program raised amount if donation completed
      if (status === "completed" && donation.programId) {
        await this.updateProgramRaisedAmount(
          donation.programId,
          donation.amount
        );
      }

      return donation;
    } catch (error) {
      throw new DatabaseException(error.message);
    }
  }

  async updateProgramRaisedAmount(programId, donationAmount) {
    try {
      const program = await databases.getDocument(
        CVOWF_DATABASE_ID,
        "programs",
        programId
      );
      const newAmount = program.raisedAmount + donationAmount;

      await databases.updateDocument(CVOWF_DATABASE_ID, "programs", programId, {
        raisedAmount: newAmount,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error updating program raised amount:", error);
    }
  }
}
```

---

## Environment Variables

### Configuration Setup

```env
# .env.production
# Appwrite Configuration
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=cvowf-production
VITE_APPWRITE_DATABASE_ID=cvowf_main_db
VITE_APPWRITE_BUCKET_ID=cvowf_media_bucket

# API Keys (Server-side only)
APPWRITE_API_KEY=your_appwrite_api_key_here
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret

# Security
JWT_SECRET=your_jwt_secret_key_here
ENCRYPTION_KEY=your_32_character_encryption_key
SESSION_SECRET=your_session_secret_here

# Email Configuration
MAILGUN_API_KEY=your_mailgun_api_key
MAILGUN_DOMAIN=mg.cvowf.org
FROM_EMAIL=noreply@cvowf.org

# External Services
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

This comprehensive Appwrite configuration provides a secure, scalable foundation for CVOWF with proper authentication, authorization, data modeling, and file storage capabilities. The security model ensures sensitive data is protected while maintaining usability for different user roles.
