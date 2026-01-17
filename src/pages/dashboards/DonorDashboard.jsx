import { useState, useEffect } from 'react';
import { 
  HeartIcon, 
  ChartBarIcon, 
  GiftIcon,
  DocumentTextIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';
import RoleGuard from '../../components/auth/RoleGuard';

const DonorDashboard = () => {
  const { user } = useAuth();
  const [donationStats, setDonationStats] = useState({
    totalDonated: 0,
    donationsCount: 0,
    impactScore: 0,
    lastDonation: null
  });

  const [recentDonations, setRecentDonations] = useState([]);
  const [impactStories, setImpactStories] = useState([]);

  // Mock data - replace with actual API calls
  useEffect(() => {
    setDonationStats({
      totalDonated: 1250,
      donationsCount: 8,
      impactScore: 92,
      lastDonation: '2024-01-15'
    });

    setRecentDonations([
      { id: 1, program: 'Clean Water Initiative', amount: 150, date: '2024-01-15', status: 'completed' },
      { id: 2, program: 'Education Fund', amount: 200, date: '2024-01-10', status: 'completed' },
      { id: 3, program: 'Healthcare Support', amount: 100, date: '2024-01-05', status: 'completed' }
    ]);

    setImpactStories([
      {
        id: 1,
        title: 'Sarah's Story: Access to Clean Water',
        description: 'Thanks to donors like you, Sarah now has access to clean water in her village.',
        image: '/images/impact-1.jpg',
        program: 'Clean Water Initiative'
      },
      {
        id: 2,
        title: 'Education Changes Lives',
        description: '15 children received scholarships this month through your generous donations.',
        image: '/images/impact-2.jpg',
        program: 'Education Fund'
      }
    ]);
  }, []);

  const quickActions = [
    {
      title: 'Make a Donation',
      description: 'Support our current programs',
      icon: HeartIcon,
      href: '/donate',
      color: 'bg-red-500'
    },
    {
      title: 'View Impact Reports',
      description: 'See how your donations help',
      icon: ChartBarIcon,
      href: '/donor/impact',
      color: 'bg-primary-700'
    },
    {
      title: 'Donation History',
      description: 'Review your past contributions',
      icon: DocumentTextIcon,
      href: '/donor/history',
      color: 'bg-green-500'
    },
    {
      title: 'Monthly Giving',
      description: 'Set up recurring donations',
      icon: GiftIcon,
      href: '/donor/recurring',
      color: 'bg-purple-500'
    }
  ];

  return (
    <RoleGuard allowedRoles={['donor']}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Thank you, {user?.profile?.firstName || 'Donor'}!
            </h1>
            <p className="text-gray-600 mt-2">
              Your generosity is making a real difference in people's lives.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <HeartIcon className="h-8 w-8 text-red-500" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">${donationStats.totalDonated.toLocaleString()}</p>
                  <p className="text-gray-600">Total Donated</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <GiftIcon className="h-8 w-8 text-primary-700" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{donationStats.donationsCount}</p>
                  <p className="text-gray-600">Donations Made</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <StarIcon className="h-8 w-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{donationStats.impactScore}</p>
                  <p className="text-gray-600">Impact Score</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <ChartBarIcon className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">156</p>
                  <p className="text-gray-600">Lives Impacted</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
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
                          <h3 className="font-medium text-gray-900">{action.title}</h3>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Recent Donations */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Recent Donations</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentDonations.map((donation) => (
                    <div key={donation.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">{donation.program}</p>
                        <p className="text-sm text-gray-600">{donation.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">${donation.amount}</p>
                        <p className="text-xs text-gray-500 capitalize">{donation.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <a
                    href="/donor/history"
                    className="text-primary-700 hover:text-primary-800 text-sm font-medium"
                  >
                    View all donations →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Impact Stories */}
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Your Impact Stories</h2>
                <p className="text-sm text-gray-600">See the real difference your donations are making</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {impactStories.map((story) => (
                    <div key={story.id} className="border rounded-lg overflow-hidden">
                      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                        <div className="flex items-center justify-center text-gray-400">
                          <ChartBarIcon className="h-12 w-12" />
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-2">{story.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{story.description}</p>
                        <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                          {story.program}
                        </span>
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

export default DonorDashboard;