import React, { useEffect, useState } from 'react';
import { FaTrashAlt, FaPhoneAlt, FaMapMarkerAlt, FaTruck, FaCheckDouble, FaBoxOpen, FaClipboardList, FaClock, FaCheck } from 'react-icons/fa';
import toast from 'react-hot-toast'; 

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('All');

    const fetchOrders = () => {
        fetch('https://ecomerce-server-kohl.vercel.app/all-orders')
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(err => console.error("Error:", err));
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleUpdateStatus = (id, newStatus) => {
        fetch(`https://ecomerce-server-kohl.vercel.app/orders/${id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0) {
                toast.success(`অর্ডারটি এখন ${newStatus}!`);
                fetchOrders();
            }
        });
    };

    const handleDeleteOrder = (id) => {
        fetch(`https://ecomerce-server-kohl.vercel.app/orders/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0) {
                toast.error("Order Deleted!");
                fetchOrders(); 
            }
        });
    };

    const getCount = (status) => orders.filter(o => o.status?.toLowerCase() === status.toLowerCase()).length;

    const filteredOrders = activeTab === 'All' 
        ? orders 
        : orders.filter(order => order.status?.toLowerCase() === activeTab.toLowerCase());

    const tabs = ['All', 'Pending', 'Processing', 'Delivered'];

    return (
        <div className="bg-[#F8F9FD] min-h-screen p-4 md:p-10">
            <div className="max-w-7xl mx-auto">
                
                <h2 className="text-3xl font-black text-[#7E53AC] mb-8 uppercase tracking-tighter">Order Management</h2>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 text-gray-800">
                    <div className="bg-white p-6 rounded-[24px] shadow-sm border-l-8 border-purple-500">
                        <div className="flex justify-between items-center text-purple-500 mb-2 font-black uppercase text-[10px]">Total <FaClipboardList size={18} /></div>
                        <h3 className="text-3xl font-black">{orders.length}</h3>
                    </div>
                    <div className="bg-white p-6 rounded-[24px] shadow-sm border-l-8 border-yellow-400">
                        <div className="flex justify-between items-center text-yellow-500 mb-2 font-black uppercase text-[10px]">Pending <FaClock size={18} /></div>
                        <h3 className="text-3xl font-black">{getCount('pending')}</h3>
                    </div>
                    <div className="bg-white p-6 rounded-[24px] shadow-sm border-l-8 border-blue-500">
                        <div className="flex justify-between items-center text-blue-500 mb-2 font-black uppercase text-[10px]">Processing <FaTruck size={18} /></div>
                        <h3 className="text-3xl font-black">{getCount('processing')}</h3>
                    </div>
                    <div className="bg-white p-6 rounded-[24px] shadow-sm border-l-8 border-green-500">
                        <div className="flex justify-between items-center text-green-500 mb-2 font-black uppercase text-[10px]">Delivered <FaCheck size={18} /></div>
                        <h3 className="text-3xl font-black">{getCount('delivered')}</h3>
                    </div>
                </div>

                {/* Filter Tabs */}
<div className="flex mb-8 overflow-x-auto scrollbar-hide">
    <div className="flex bg-white p-1.5 rounded-2xl  flex-nowrap min-w-max md:min-w-0">
        {tabs.map(tab => (
            <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 text-sm md:text-base font-black transition-all whitespace-nowrap ${
                    activeTab === tab 
                    ? 'bg-[#7E53AC] text-white rounded-xl shadow-lg' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
            >
                {tab}
            </button>
        ))}
    </div>
</div>

                {/* PC Table View */}
                <div className="hidden md:block bg-white rounded-[32px] shadow-xl overflow-hidden border border-gray-100">
                    <table className="table w-full">
                        <thead className="bg-[#FAF9FF]">
                            <tr className="text-[#7E53AC] uppercase text-[11px] tracking-widest border-none">
                                <th className="py-6 px-8">Ordered Products</th>
                                <th>Customer & Address</th>
                                <th>Status</th>
                                <th className="text-center">Quick Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {filteredOrders.map(order => (
                                <tr key={order._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-all">
                                    {/* প্রোডাক্ট ডিটেইলস - বড় করে */}
                                    <td className="py-6 px-8 min-w-[300px]">
                                        <div className="space-y-3">
                                            {(order.items || order.cartItems)?.map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-4 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                                                    <img src={item.image || item.img} alt="" className="w-14 h-14 object-cover rounded-xl bg-white shadow-sm" />
                                                    <div>
                                                        <p className="font-black text-gray-800 text-[14px] leading-tight">{item.name}</p>
                                                        <p className="text-[12px] font-bold text-blue-600 mt-1">Quantity: {item.quantity}</p>
                                                        <p className="text-[11px] text-gray-400 font-bold">{item.price} TK</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="max-w-[300px]">
                                        <div className="font-black text-lg text-gray-800">{order.customerName}</div>
                                        <div className="text-blue-500 font-bold mb-2 flex items-center gap-1"><FaPhoneAlt size={12}/> {order.phone}</div>
                                        <div className="bg-purple-50 p-3 rounded-xl text-gray-600 text-xs font-semibold leading-relaxed border border-purple-100">
                                            <FaMapMarkerAlt className="inline mr-1 text-purple-400" /> {order.address}
                                        </div>
                                        <div className="mt-2 font-black text-pink-600 text-base">Total: {order.totalAmount} TK</div>
                                    </td>
                                    <td>
                                        <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase shadow-sm ${
                                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 
                                            order.status === 'Processing' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="text-center px-4">
                                        <div className="flex flex-col gap-2 items-center">
                                            {order.status === 'pending' && (
                                                <div className="flex gap-2">
                                                    <button onClick={() => handleUpdateStatus(order._id, 'Processing')} className="btn btn-sm bg-blue-500 text-white border-none rounded-xl px-4 hover:scale-105">Processing</button>
                                                    <button onClick={() => handleUpdateStatus(order._id, 'Delivered')} className="btn btn-sm bg-green-500 text-white border-none rounded-xl px-4 hover:scale-105">Deliver</button>
                                                </div>
                                            )}
                                            {order.status === 'Processing' && (
                                                <button onClick={() => handleUpdateStatus(order._id, 'Delivered')} className="btn btn-sm bg-green-500 text-white border-none rounded-xl w-full hover:scale-105 font-black">Mark Delivered</button>
                                            )}
                                            <button onClick={() => window.confirm("Delete?") && handleDeleteOrder(order._id)} className="text-red-400 hover:text-red-600 transition-colors font-bold text-xs mt-2 flex items-center gap-1"><FaTrashAlt /> Delete Order</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* ৪. Mobile View */}
                <div className="md:hidden space-y-6">
                    {filteredOrders.map(order => (
                        <div key={order._id} className="bg-white p-6 rounded-[32px] shadow-md border relative overflow-hidden">
                             <div className={`absolute left-0 top-0 h-full w-2 ${order.status === 'pending' ? 'bg-yellow-400' : order.status === 'Processing' ? 'bg-blue-400' : 'bg-green-500'}`}></div>
                             <div className="flex justify-between items-start mb-4">
                                <h3 className="font-black text-xl text-gray-800">{order.customerName}</h3>
                                <span className="font-black text-pink-600">{order.totalAmount} TK</span>
                             </div>
                             
                             <div className="space-y-2 mb-6">
                                {(order.items || order.cartItems)?.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl border">
                                        <img src={item.image || item.img} className="w-12 h-12 rounded-lg object-cover" alt="" />
                                        <p className="font-black text-xs flex-1 leading-tight">{item.name} <span className="text-blue-500 block">Qty: {item.quantity}</span></p>
                                    </div>
                                ))}
                             </div>

                             <div className="text-xs font-bold text-gray-500 mb-6 bg-blue-50/50 p-4 rounded-2xl border border-dashed border-blue-200">
                                <p className="text-blue-600 mb-1 font-black flex items-center gap-1"><FaPhoneAlt size={10}/> {order.phone}</p>
                                {order.address}
                             </div>

                             <div className="flex gap-2">
                                {order.status === 'pending' && (
                                    <>
                                        <button onClick={() => handleUpdateStatus(order._id, 'Processing')} className="flex-1 py-3 bg-blue-500 text-white rounded-2xl font-black text-xs shadow-lg">Process</button>
                                        <button onClick={() => handleUpdateStatus(order._id, 'Delivered')} className="flex-1 py-3 bg-green-500 text-white rounded-2xl font-black text-xs shadow-lg">Deliver</button>
                                    </>
                                )}
                                {order.status === 'Processing' && (
                                    <button onClick={() => handleUpdateStatus(order._id, 'Delivered')} className="flex-1 py-3 bg-green-500 text-white rounded-2xl font-black text-xs shadow-lg">Mark Delivered</button>
                                )}
                                <button onClick={() => handleDeleteOrder(order._id)} className="p-3 bg-red-50 text-red-500 rounded-2xl"><FaTrashAlt /></button>
                             </div>
                        </div>
                    ))}
                </div>

                {filteredOrders.length === 0 && (
                    <div className="text-center py-24 bg-white rounded-[40px] mt-6">
                        <FaBoxOpen className="mx-auto text-gray-100 mb-4" size={80} />
                        <h3 className="text-gray-300 font-black text-xl">Empty {activeTab} List</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllOrders;