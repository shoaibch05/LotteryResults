import { memo } from 'react';

const StatCard = memo(({ title, value, icon, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    purple: 'bg-purple-50 text-purple-600'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
       
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  );
});

StatCard.displayName = 'StatCard';

const DashboardStats = memo(() => {
  // Mock data - replace with actual API calls
  const stats = [
    {
      title: 'Total Posts',
      value: '24',
      icon: '📝',
      color: 'blue'
    },
    {
      title: 'Subscribers',
      value: '1,234',
      icon: '👥',
      color: 'green'
    },
    {
      title: 'Categories',
      value: '6',
      change: '0%',
      icon: '📂',
      color: 'purple'
    },
    
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
});

DashboardStats.displayName = 'DashboardStats';

export default DashboardStats;

