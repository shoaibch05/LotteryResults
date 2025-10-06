import { memo } from 'react';
import { Link } from 'react-router-dom';

const RecentPosts = memo(() => {
  // Mock data - replace with actual API calls
  const recentPosts = [
    {
      id: 1,
      title: 'Powerball Results - January 15, 2024',
      category: 'Powerball',
      status: 'published',
      date: '2024-01-15',
    },
    {
      id: 2,
      title: 'Mega Millions Jackpot Reaches $500M',
      category: 'Mega Millions',
      status: 'published',
      date: '2024-01-14',
      
    },
    {
      id: 3,
      title: 'Take 5 Evening Draw Results',
      category: 'Take 5',
      status: 'draft',
      date: '2024-01-13',
      
    },
    {
      id: 4,
      title: 'Pick 10 Winning Numbers Analysis',
      category: 'Pick 10',
      status: 'published',
      date: '2024-01-12',
      
    },
    {
      id: 5,
      title: 'Lotto Results - Midday Draw',
      category: 'Lotto',
      status: 'published',
      date: '2024-01-11',
    
    }
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      archived: 'bg-gray-100 text-gray-800'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status]}`}>
        {status}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent Posts</h3>
          <Link
            to="/admin/posts"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View all
          </Link>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {recentPosts.map((post) => (
          <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {post.title}
                  </h4>
                  {getStatusBadge(post.status)}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <span className="mr-1">📂</span>
                    {post.category}
                  </span>
                  <span className="flex items-center">
                    <span className="mr-1">📅</span>
                    {formatDate(post.date)}
                  </span>
           
                </div>
              </div>
              <div className="ml-4 flex-shrink-0">
                <Link
                  to={`/admin/posts/edit/${post.id}`}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {recentPosts.length === 0 && (
        <div className="p-6 text-center text-gray-500">
          <p>No posts found. Create your first post to get started.</p>
        </div>
      )}
    </div>
  );
});

RecentPosts.displayName = 'RecentPosts';

export default RecentPosts;

