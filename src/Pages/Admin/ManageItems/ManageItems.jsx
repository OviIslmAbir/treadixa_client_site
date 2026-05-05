import React, { useEffect, useState } from 'react';
import { FaTrashAlt, FaEdit, FaFilter } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const ManageItems = () => {
    const [products, setProducts] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]); 
    const [selectedCategory, setSelectedCategory] = useState('all');

    // ডাটা লোড করা
    useEffect(() => {
        fetch('https://ecomerce-server-kohl.vercel.app/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setDisplayProducts(data);
            })
            .catch(err => {
                console.error(err);
                toast.error("Failed to load products!");
            });
    }, []);


    const handleFilter = (category) => {
        setSelectedCategory(category);
        if (category === 'all') {
            setDisplayProducts(products);
        } else {
            const filtered = products.filter(p => p.category === category);
            setDisplayProducts(filtered);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            fetch(`https://ecomerce-server-kohl.vercel.app/products/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success("Product deleted!");
                        const remaining = products.filter(p => p._id !== id);
                        setProducts(remaining);
                        setDisplayProducts(remaining.filter(p => selectedCategory === 'all' || p.category === selectedCategory));
                    }
                });
        }
    };


    const categories = ['all', ...new Set(products.map(p => p.category))];

    return (
        <div className="p-2 md:p-6 bg-gray-50 min-h-screen font-sans">
            <div className="max-w-6xl mx-auto bg-white p-4 md:p-8 rounded-[32px] shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Manage Inventory ({displayProducts.length})
                    </h2>

                    {/* Category Filter Buttons */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => handleFilter(cat)}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-all ${selectedCategory === cat
                                        ? 'bg-[#7E53AC] text-white'
                                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Desktop View */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="py-4">Product</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayProducts.map((item) => (
                                <tr key={item._id} className="border-b last:border-none hover:bg-gray-50 transition-colors">
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <img src={item.image1 || item.image} className="w-12 h-12 rounded-xl object-cover bg-gray-100" alt="" />
                                            <span className="font-semibold text-gray-700 line-clamp-1">{item.name}</span>
                                        </div>
                                    </td>
                                    <td><span className="badge badge-ghost capitalize">{item.category}</span></td>
                                    <td className="font-bold text-[#7E53AC]">{item.price} TK</td>
                                    <td className="flex justify-center gap-2 py-4">
                                        <Link to={`/dashboard/editProduct/${item._id}`} className="btn btn-square btn-sm bg-blue-50 text-blue-600 border-none hover:bg-blue-600 hover:text-white">
                                            <FaEdit size={16} />
                                        </Link>
                                        <button onClick={() => handleDelete(item._id)} className="btn btn-square btn-sm bg-red-50 text-red-500 border-none hover:bg-red-600 hover:text-white">
                                            <FaTrashAlt size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile View */}
                <div className="md:hidden grid grid-cols-1 gap-4">
                    {displayProducts.map((item) => (
                        <div key={item._id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img src={item.image1 || item.image} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                                <div>
                                    <h3 className="font-bold text-sm text-gray-800 line-clamp-1">{item.name}</h3>
                                    <p className="text-[#7E53AC] font-bold text-xs">{item.price} TK</p>
                                    <p className="text-[10px] text-gray-400 uppercase mt-1">{item.category}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Link to={`/dashboard/editProduct/${item._id}`} className="p-2 bg-blue-50 rounded-full text-blue-600">
                                    <FaEdit size={14} />
                                </Link>
                                <button onClick={() => handleDelete(item._id)} className="p-2 bg-red-50 rounded-full text-red-500">
                                    <FaTrashAlt size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {displayProducts.length === 0 && (
                    <div className="text-center py-20 text-gray-400 italic">
                        No products found in this category!
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageItems;