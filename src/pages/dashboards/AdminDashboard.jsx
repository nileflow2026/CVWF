import { useState, useEffect } from "react";
import {
  UserGroupIcon,
  BanknotesIcon,
  ChartBarIcon,
  CogIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../hooks/useAuth";
import RoleGuard from "../../components/auth/RoleGuard";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDonations: 0,
    activePrograms: 0,
    pendingApprovals: 0,
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    setStats({
      totalUsers: 1247,
      totalDonations: 125890,
      activePrograms: 8,
      pendingApprovals: 5,
    });
  }, []);

  const quickActions = [
    {
      title: "User Management",
      description: "Manage users, roles, and permissions",
      icon: UserGroupIcon,
      href: "/admin/users",
      color: "bg-primary-700",
    },
    {
      title: "Financial Reports",
      description: "View donations and financial analytics",
      icon: BanknotesIcon,
      href: "/admin/finance",
      color: "bg-green-500",
    },
    {
      title: "Program Management",
      description: "Create and manage NGO programs",
      icon: ChartBarIcon,
      href: "/admin/programs",
      color: "bg-purple-500",
    },
    {
      title: "System Settings",
      description: "Configure platform settings",
      icon: CogIcon,
      href: "/admin/settings",
      color: "bg-gray-500",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "user",
      message: "New donor registered: John Smith",
      time: "2 hours ago",
      status: "success",
    },
    {
      id: 2,
      type: "donation",
      message: "Large donation received: $5,000",
      time: "4 hours ago",
      status: "success",
    },
    {
      id: 3,
      type: "program",
      message: 'Program "Clean Water" requires review',
      time: "6 hours ago",
      status: "warning",
    },
    {
      id: 4,
      type: "system",
      message: "Monthly backup completed",
      time: "8 hours ago",
      status: "success",
    },
  ];

  return (
    <RoleGuard allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name || "Admin"}
            </h1>
            <p className="text-gray-600 mt-2">
              Here's what's happening with your NGO platform today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <UserGroupIcon className="h-8 w-8 text-primary-700" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalUsers.toLocaleString()}
                  </p>
                  <p className="text-gray-600">Total Users</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <BanknotesIcon className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    ${stats.totalDonations.toLocaleString()}
                  </p>
                  <p className="text-gray-600">Total Donations</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <ChartBarIcon className="h-8 w-8 text-purple-500" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.activePrograms}
                  </p>
                  <p className="text-gray-600">Active Programs</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <ExclamationTriangleIcon className="h-8 w-8 text-orange-500" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.pendingApprovals}
                  </p>
                  <p className="text-gray-600">Pending Approvals</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">
                  Quick Actions
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4">
                  {quickActions.map((action, index) => {
                    const IconComponent = action.icon;
                    return (
                      <a
                        key={index}
                        href={action.href}
                        className="flex items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <div className={`p-2 rounded-lg ${action.color}`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium text-gray-900">
                            {action.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {action.description}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">
                  Recent Activities
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3"
                    >
                      <div className="flex-shrink-0">
                        {activity.status === "success" ? (
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        ) : (
                          <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-900">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
};

export default AdminDashboard;
