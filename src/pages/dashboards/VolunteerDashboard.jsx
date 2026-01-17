import { useState, useEffect } from "react";
import {
  HandRaisedIcon,
  ClockIcon,
  CalendarDaysIcon,
  AcademicCapIcon,
  UserGroupIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../hooks/useAuth";
import RoleGuard from "../../components/auth/RoleGuard";

const VolunteerDashboard = () => {
  const { user } = useAuth();
  const [volunteerStats, setVolunteerStats] = useState({
    totalHours: 0,
    activitiesJoined: 0,
    upcomingEvents: 0,
    skillsRating: 0,
  });

  const [upcomingActivities, setUpcomingActivities] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  // Mock data - replace with actual API calls
  useEffect(() => {
    setVolunteerStats({
      totalHours: 48,
      activitiesJoined: 12,
      upcomingEvents: 3,
      skillsRating: 4.8,
    });

    setUpcomingActivities([
      {
        id: 1,
        title: "Community Clean-up Drive",
        date: "2024-01-20",
        time: "09:00 AM",
        location: "Central Park",
        volunteers: 15,
        maxVolunteers: 20,
      },
      {
        id: 2,
        title: "Food Distribution",
        date: "2024-01-22",
        time: "02:00 PM",
        location: "Community Center",
        volunteers: 8,
        maxVolunteers: 12,
      },
      {
        id: 3,
        title: "Teaching Workshop",
        date: "2024-01-25",
        time: "10:00 AM",
        location: "Local School",
        volunteers: 5,
        maxVolunteers: 8,
      },
    ]);

    setRecentActivities([
      {
        id: 1,
        title: "Beach Cleanup",
        date: "2024-01-10",
        hours: 4,
        status: "completed",
      },
      {
        id: 2,
        title: "Fundraising Event",
        date: "2024-01-08",
        hours: 6,
        status: "completed",
      },
      {
        id: 3,
        title: "School Visit",
        date: "2024-01-05",
        hours: 3,
        status: "completed",
      },
    ]);
  }, []);

  const quickActions = [
    {
      title: "Browse Opportunities",
      description: "Find new volunteer activities",
      icon: HandRaisedIcon,
      href: "/volunteer/opportunities",
      color: "bg-primary-700",
    },
    {
      title: "My Schedule",
      description: "View your volunteer calendar",
      icon: CalendarDaysIcon,
      href: "/volunteer/schedule",
      color: "bg-green-500",
    },
    {
      title: "Skills & Training",
      description: "Develop new volunteering skills",
      icon: AcademicCapIcon,
      href: "/volunteer/training",
      color: "bg-purple-500",
    },
    {
      title: "Community",
      description: "Connect with other volunteers",
      icon: UserGroupIcon,
      href: "/volunteer/community",
      color: "bg-orange-500",
    },
  ];

  return (
    <RoleGuard allowedRoles={["volunteer"]}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {user?.profile?.firstName || "Volunteer"}!
            </h1>
            <p className="text-gray-600 mt-2">
              Thank you for your dedication to making our community better.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <ClockIcon className="h-8 w-8 text-primary-700" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {volunteerStats.totalHours}
                  </p>
                  <p className="text-gray-600">Hours Volunteered</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <HandRaisedIcon className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {volunteerStats.activitiesJoined}
                  </p>
                  <p className="text-gray-600">Activities Joined</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <CalendarDaysIcon className="h-8 w-8 text-purple-500" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {volunteerStats.upcomingEvents}
                  </p>
                  <p className="text-gray-600">Upcoming Events</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <AcademicCapIcon className="h-8 w-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {volunteerStats.skillsRating}
                  </p>
                  <p className="text-gray-600">Skills Rating</p>
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
                      className="flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {activity.title}
                        </p>
                        <p className="text-sm text-gray-600">{activity.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary-700">
                          {activity.hours}h
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                          {activity.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <a
                    href="/volunteer/history"
                    className="text-primary-700 hover:text-primary-800 text-sm font-medium"
                  >
                    View all activities →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Activities */}
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">
                  Upcoming Activities
                </h2>
                <p className="text-sm text-gray-600">
                  Activities you've signed up for
                </p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4">
                  {upcomingActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="border rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900">
                            {activity.title}
                          </h3>
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center text-sm text-gray-600">
                              <CalendarDaysIcon className="h-4 w-4 mr-2" />
                              {activity.date} at {activity.time}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPinIcon className="h-4 w-4 mr-2" />
                              {activity.location}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <UserGroupIcon className="h-4 w-4 mr-2" />
                              {activity.volunteers}/{activity.maxVolunteers}{" "}
                              volunteers signed up
                            </div>
                          </div>
                        </div>
                        <div className="ml-4">
                          <button className="btn-primary text-sm">
                            View Details
                          </button>
                        </div>
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

export default VolunteerDashboard;
