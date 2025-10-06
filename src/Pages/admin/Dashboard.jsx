import { memo } from 'react';
import DashboardStats from '../../components/admin/dashboard/DashboardStats';
import RecentPosts from '../../components/admin/dashboard/RecentPosts';
import { Link } from 'react-router-dom';

const Dashboard = memo(() => {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome to your lottery admin panel. Here's an overview of your site.
        </p>
      </div>
      {console.log("Rendering Dashboard")}

      {/* Stats cards */}
      <DashboardStats />

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent posts */}
        <div className="lg:col-span-2">
          <RecentPosts />
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              to="/admin/posts/create"
              className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <span className="text-xl mr-3">📝</span>
              <span className="font-medium">Create New Post</span>
            </Link>
            <Link
              to="/admin/users"
              className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <span className="text-xl mr-3">👥</span>
              <span className="font-medium">Manage Users</span>
            </Link>
            <Link
              to="/admin/seo"
              className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <span className="text-xl mr-3">🔍</span>
              <span className="font-medium">SEO Settings</span>
            </Link>
            <Link
              to="/admin/settings"
              className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <span className="text-xl mr-3">⚙️</span>
              <span className="font-medium">Site Settings</span>
            </Link>
          </div>
        </div>

        {/* System status */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database</span>
              <span className="flex items-center text-green-600">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Online
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Sitemap</span>
              <span className="flex items-center text-green-600">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Updated
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;

