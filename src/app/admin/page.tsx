import { FiUsers, FiShoppingBag, FiDollarSign, FiTrendingUp, FiPlusCircle, FiBarChart2 } from 'react-icons/fi'

const stats = [
    { title: 'Total Users', value: '2,847', icon: FiUsers, color: 'bg-blue-500' },
    { title: 'Total Products', value: '1,234', icon: FiShoppingBag, color: 'bg-green-500' },
    { title: 'Total Sales', value: '$45,231', icon: FiDollarSign, color: 'bg-purple-500' },
    { title: 'Revenue Growth', value: '+12.5%', icon: FiTrendingUp, color: 'bg-orange-500' },
]

const recentActivities = [
    { user: 'John Doe', action: 'placed a new order', time: '2 min ago' },
    { user: 'Sarah Smith', action: 'registered new account', time: '5 min ago' },
    { user: 'Mike Johnson', action: 'purchased product', time: '10 min ago' },
    { user: 'Emily Davis', action: 'left a product review', time: '15 min ago' },
]

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <div className="text-sm text-gray-500">
                    Welcome back, Admin
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                    <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} p-3 rounded-full text-white`}>
                                    <Icon size={24} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h2>
                    <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                            <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
                                <div className="w-2 h-2 bg-[#1ABA1A] rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-800">
                                        <span className="font-semibold">{activity.user}</span> {activity.action}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-4 border border-gray-200 rounded-lg text-center hover:border-[#1ABA1A] hover:bg-green-50 transition-colors">
                            <FiPlusCircle size={24} className="mx-auto mb-2 text-[#1ABA1A]" />
                            <span className="text-sm font-medium text-gray-700">Add Product</span>
                        </button>
                        <button className="p-4 border border-gray-200 rounded-lg text-center hover:border-[#1ABA1A] hover:bg-green-50 transition-colors">
                            <FiUsers size={24} className="mx-auto mb-2 text-[#1ABA1A]" />
                            <span className="text-sm font-medium text-gray-700">Manage Users</span>
                        </button>
                        <button className="p-4 border border-gray-200 rounded-lg text-center hover:border-[#1ABA1A] hover:bg-green-50 transition-colors">
                            <FiDollarSign size={24} className="mx-auto mb-2 text-[#1ABA1A]" />
                            <span className="text-sm font-medium text-gray-700">View Sales</span>
                        </button>
                        <button className="p-4 border border-gray-200 rounded-lg text-center hover:border-[#1ABA1A] hover:bg-green-50 transition-colors">
                            <FiBarChart2 size={24} className="mx-auto mb-2 text-[#1ABA1A]" />
                            <span className="text-sm font-medium text-gray-700">Analytics</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}