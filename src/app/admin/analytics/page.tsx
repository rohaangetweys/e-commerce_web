import { FiEye, FiShoppingCart, FiDollarSign, FiUser } from 'react-icons/fi'

const analyticsData = {
    overview: [
        { label: 'Page Views', value: '45.2K', change: '+12.5%' },
        { label: 'Unique Visitors', value: '23.1K', change: '+8.2%' },
        { label: 'Conversion Rate', value: '3.2%', change: '+2.1%' },
        { label: 'Bounce Rate', value: '42.3%', change: '-1.5%' },
    ],
    topProducts: [
        { name: 'Wireless Headphones', sales: 234, revenue: 18720 },
        { name: 'Smart Watch', sales: 189, revenue: 24561 },
        { name: 'USB-C Charger', sales: 156, revenue: 3898 },
        { name: 'Laptop Backpack', sales: 98, revenue: 4899 },
    ]
}

export default function AnalyticsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
                <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1ABA1A] focus:border-transparent">
                    <option>Last 30 days</option>
                    <option>Last 7 days</option>
                    <option>Last 90 days</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {analyticsData.overview.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                                <p className={`text-sm font-medium mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {stat.change}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                <FiEye size={24} className="text-gray-600" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Products</h2>
                    <div className="space-y-4">
                        {analyticsData.topProducts.map((product, index) => (
                            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-800">{product.name}</p>
                                    <p className="text-sm text-gray-500">{product.sales} sales</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-gray-800">${product.revenue.toLocaleString()}</p>
                                    <p className="text-sm text-green-600">+12.5%</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Traffic Sources</h2>
                    <div className="space-y-4">
                        {[
                            { source: 'Organic Search', percentage: 45, color: 'bg-[#1ABA1A]' },
                            { source: 'Direct', percentage: 25, color: 'bg-blue-500' },
                            { source: 'Social Media', percentage: 15, color: 'bg-purple-500' },
                            { source: 'Email', percentage: 10, color: 'bg-orange-500' },
                            { source: 'Referral', percentage: 5, color: 'bg-gray-500' },
                        ].map((item, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-700">{item.source}</span>
                                    <span className="text-gray-500">{item.percentage}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${item.color}`}
                                        style={{ width: `${item.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}