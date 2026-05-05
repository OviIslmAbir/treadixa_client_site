import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUsers, FaUserShield, FaEnvelope, FaUser } from "react-icons/fa";
import toast from "react-hot-toast";

const AllUsers = () => {
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://ecomerce-server-kohl.vercel.app/users');
            return res.json();
        }
    });

    const handleMakeAdmin = (user) => {
        fetch(`https://ecomerce-server-kohl.vercel.app/users/admin/${user._id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            if (data.modifiedCount > 0) {
                refetch(); 
                toast.success(`Now ${user.name} is a Admin 👑`, {
                    style: { border: '1px solid #6c4fb3', color: '#6c4fb3' }
                });
            }
        });
    };

    const handleDeleteUser = (user) => {
        if (window.confirm(`Are you sure to remove ${user.name} ?`)) {
            fetch(`https://ecomerce-server-kohl.vercel.app/users/${user._id}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch(); 
                    toast.success("User deleted successfully");
                }
            })
            .catch(error => toast.error("ডিলিট করতে সমস্যা হয়েছে!"));
        }
    };

    return (
        <div className="w-full p-3 md:p-10 bg-white md:bg-base-100 rounded-2xl shadow-sm min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 px-2">
                <h2 className="text-xl md:text-3xl font-bold text-gray-800">Users ({users.length})</h2>
                <div className="md:hidden">
                    <span className="badge bg-[#6c4fb3] text-white p-3">Admin Panel</span>
                </div>
            </div>
            
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto rounded-t-xl border">
                <table className="table w-full">
                    <thead className="bg-[#6c4fb3] text-white text-sm uppercase">
                        <tr>
                            <th className="py-4">#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id} className="hover:bg-gray-50 border-b">
                                <th>{index + 1}</th>
                                <td className="font-medium text-gray-700">{user.name}</td>
                                <td className="text-gray-600">{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? (
                                        <div className="flex items-center gap-1 text-green-600 font-bold">
                                            <FaUserShield /> Admin
                                        </div>
                                    ) : (
                                        <button 
                                            onClick={() => handleMakeAdmin(user)} 
                                            className="btn btn-sm bg-orange-400 hover:bg-orange-500 text-white border-none"
                                        >
                                            <FaUsers className="mr-1" /> Make Admin
                                        </button>
                                    )}
                                </td>
                                <td className="text-center">
                                    <button 
                                        onClick={() => handleDeleteUser(user)} 
                                        className="btn btn-ghost btn-sm text-red-500 hover:bg-red-50"
                                    >
                                        <FaTrashAlt className="text-lg" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card List  */}
            <div className="md:hidden space-y-4">
                {users.map((user, index) => (
                    <div key={user._id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm relative">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                                <div className="bg-gray-100 p-3 rounded-full text-[#6c4fb3]">
                                    <FaUser size={16} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-sm">{user.name}</h3>
                                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                        <FaEnvelope size={10} /> {user.email}
                                    </p>
                                </div>
                            </div>
                            <span className="text-[10px] bg-gray-100 px-2 py-1 rounded italic text-gray-400">#{index + 1}</span>
                        </div>

                        <div className="flex items-center justify-between border-t pt-3 mt-3">
                            <div>
                                {user.role === 'admin' ? (
                                    <span className="badge badge-success gap-1 text-white font-bold text-xs py-3">
                                        <FaUserShield /> ADMIN
                                    </span>
                                ) : (
                                    <button 
                                        onClick={() => handleMakeAdmin(user)}
                                        className="btn btn-xs bg-orange-100 text-orange-600 border-none hover:bg-orange-500 hover:text-white"
                                    >
                                        <FaUsers /> Make Admin
                                    </button>
                                )}
                            </div>
                            
                            <button 
                                onClick={() => handleDeleteUser(user)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <FaTrashAlt size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {users.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-gray-400 italic">No users found!</p>
                </div>
            )}
        </div>
    );
};

export default AllUsers;