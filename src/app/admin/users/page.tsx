import { FiSearch, FiEdit2, FiTrash2, FiUserPlus } from 'react-icons/fi'

const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', joinDate: '2024-01-15' },
    { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', status: 'Active', joinDate: '2024-01-10' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'Inactive', joinDate: '2024-01-08' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', status: 'Active', joinDate: '2024-01-05' },
    { id: 5, name: 'David Wilson', email: 'david@example.com', status: 'Active', joinDate: '2024-01-02' },
]

export default function UsersPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Users Management</h1>
                <button className="flex items-center gap-2 bg-[#1ABA1A] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                    <FiUserPlus size={20} />
                    Add User
                </button>
            </div>

            <div className="flex gap-4">
                <div className="flex-1 relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ABA1A] focus:border-transparent"
                    />
                </div>
                <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1ABA1A] focus:border-transparent">
                    <option>Admin</option>
                    <option>Moderator</option>
                    <option>Customer</option>
                </select>
                <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1ABA1A] focus:border-transparent">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Inactive</option>
                </select>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.joinDate}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex gap-2">
                                            <button className="text-blue-600 hover:text-blue-900">
                                                <FiEdit2 size={18} />
                                            </button>
                                            <button className="text-red-600 hover:text-red-900">
                                                <FiTrash2 size={18} />
                                            </button>
                                        </div>
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