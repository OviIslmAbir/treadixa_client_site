import React, { useEffect, useState } from 'react';
import { useCart } from '../../Components/Hooks/CartContext'; 

const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://ecomerce-server-kohl.vercel.app/all-orders') 
            .then(res => res.json())
            .then(data => {
                setMyOrders(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="min-h-screen flex justify-center items-center font-bold">অপেক্ষা করুন ...</div>;
    }

    return (
        <div className="container mx-auto p-4 md:p-10 min-h-screen">
            <h2 className="text-3xl font-black mb-8 text-start border-l-8 border-[#7E53AC] pl-4 uppercase">
                My Orders History
            </h2>

            {myOrders.length === 0 ? (
                <div className="bg-white p-10 rounded-2xl shadow-sm text-center">
                    <p className="text-gray-400 italic text-xl">আপনি এখনো কোনো অর্ডার করেননি!</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
                    <table className="table w-full text-start">
                        <thead className="bg-gray-50">
                            <tr className="text-[#7E53AC] font-black uppercase text-sm">
                                <th className="py-5">Order ID & Date</th>
                                <th>Items</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myOrders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50 transition-colors border-b">
                                    <td className="py-4">
                                        <div className="font-bold text-gray-800">#{order._id.slice(-6).toUpperCase()}</div>
                                        <div className="text-xs text-gray-400">{order.orderDate}</div>
                                    </td>
                                    <td>
                                        <div className="flex flex-col gap-1">
                                            {order.items?.map((item, index) => (
                                                <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded w-fit">
                                                    {item.name} (x{item.quantity})
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="font-black text-lg text-gray-800">
                                        {order.totalAmount} TK
                                    </td>
                                    <td>
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase ${
                                            order.status === 'pending' 
                                            ? 'bg-yellow-100 text-yellow-600' 
                                            : 'bg-green-100 text-green-600'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyOrders;