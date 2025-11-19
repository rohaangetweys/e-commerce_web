import { FiTrendingUp, FiDollarSign, FiShoppingCart, FiUsers } from 'react-icons/fi'

const salesData = [
    { id: 1, customer: 'John Doe', product: 'Wireless Headphones', date: '2024-01-15', amount: 79.99, status: 'Completed' },
    { id: 2, customer: 'Sarah Smith', product: 'Smart Watch', date: '2024-01-15', amount: 129.99, status: 'Completed' },
    { id: 3, customer: 'Mike Johnson', product: 'USB-C Charger', date: '2024-01-14', amount: 24.99, status: 'Completed' },
    { id: 4, customer: 'Emily Davis', product: 'Laptop Backpack', date: '2024-01-14', amount: 49.99, status: 'Pending' },
    { id: 5, customer: 'David Wilson', product: 'Wireless Mouse', date: '2024-01-13', amount: 29.99, status: 'Completed' },
]

const stats = [
    { title: 'Total Revenue', value: '$45,231.89', change: '+12.5%', icon: FiDollarSign, color: 'bg-green-500' },
    { title: 'Total Orders', value: '1,234', change: '+8.2%', icon: FiShoppingCart, color: 'bg-blue-500' },
    { title: 'Average Order', value: '$89.50', change: '+3.1%', icon: FiTrendingUp, color: 'bg-purple-500' },
    { title: 'Customers', value: '2,847', change: '+5.7%', icon: FiUsers, color: 'bg-orange-500' },
]

export default function SalesPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Sales Overview</h1>
                <div className="flex gap-2">
                    <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1ABA1A] focus:border-transparent">
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Last 90 days</option>
                    </select>
                    <button className="bg-[#1ABA1A] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                        Export Report
                    </button>
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
                                    <p className="text-sm text-green-600 font-medium mt-1">{stat.change}</p>
                                </div>
                                <div className={`${stat.color} p-3 rounded-full text-white`}>
                                    <Icon size={24} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">Recent Sales</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {salesData.map((sale) => (
                                <tr key={sale.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{sale.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.customer}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.product}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${sale.amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${sale.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {sale.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}