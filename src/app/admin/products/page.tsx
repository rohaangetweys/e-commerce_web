import { FiSearch, FiEdit2, FiTrash2, FiPlusCircle, FiImage } from 'react-icons/fi'
import Image from 'next/image'

const products = [
    {
        id: 1,
        name: 'Wireless Bluetooth Headphones',
        category: 'Electronics',
        price: 79.99,
        stock: 45,
        status: 'Active',
        image: '/category1.png'
    },
    {
        id: 2,
        name: 'Smart Fitness Watch',
        category: 'Electronics',
        price: 129.99,
        stock: 23,
        status: 'Active',
        image: '/category2.png'
    },
    {
        id: 3,
        name: 'USB-C Fast Charger',
        category: 'Accessories',
        price: 24.99,
        stock: 0,
        status: 'Out of Stock',
        image: '/category3.png'
    },
    {
        id: 4,
        name: 'Laptop Backpack',
        category: 'Accessories',
        price: 49.99,
        stock: 12,
        status: 'Active',
        image: '/category4.png'
    },
]

export default function ProductsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Products Management</h1>
                <button className="flex items-center gap-2 bg-[#1ABA1A] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                    <FiPlusCircle size={20} />
                    Add Product
                </button>
            </div>

            <div className="flex gap-4">
                <div className="flex-1 relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ABA1A] focus:border-transparent"
                    />
                </div>
                <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1ABA1A] focus:border-transparent">
                    <option>All Categories</option>
                    <option>Electronics</option>
                    <option>Accessories</option>
                    <option>Clothing</option>
                </select>
                <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1ABA1A] focus:border-transparent">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Out of Stock</option>
                    <option>Draft</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="relative h-48 bg-gray-100">
                            {product.image ? (
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <FiImage size={32} className="text-gray-400" />
                                </div>
                            )}
                            <div className="absolute top-3 right-3">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${product.status === 'Active' ? 'bg-green-100 text-green-800' :
                                        product.status === 'Out of Stock' ? 'bg-red-100 text-red-800' :
                                            'bg-gray-100 text-gray-800'
                                    }`}>
                                    {product.status}
                                </span>
                            </div>
                        </div>

                        <div className="p-4">
                            <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">{product.name}</h3>
                            <p className="text-sm text-gray-500 mb-2">{product.category}</p>

                            <div className="flex items-center justify-between mb-3">
                                <span className="text-lg font-bold text-gray-800">${product.price}</span>
                                <span className={`text-sm ${product.stock > 10 ? 'text-green-600' :
                                        product.stock > 0 ? 'text-orange-600' :
                                            'text-red-600'
                                    }`}>
                                    Stock: {product.stock}
                                </span>
                            </div>

                            <div className="flex gap-2">
                                <button className="flex-1 flex items-center justify-center gap-1 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                                    <FiEdit2 size={16} />
                                    Edit
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-1 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-colors">
                                    <FiTrash2 size={16} />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}