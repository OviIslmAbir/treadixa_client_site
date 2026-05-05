import React from 'react';
import { FiX } from "react-icons/fi";
import { useCart } from '../../Components/Hooks/CartContext';
import { IoBagOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
const CartPage = () => {
    const { cart, removeFromCart, totalPrice, deliveryCharge } = useCart();
    const finalAmount = totalPrice + deliveryCharge;
    const navigate = useNavigate();
    return (
        <div className="container mx-auto p-4 md:p-6 min-h-screen bg-gray-50 mb-20 lg:mb-0">
            <h1 className="text-2xl font-bold mb-2">YOUR CART</h1>
            <p className="mb-6">There are <span className="text-red-500 font-bold">{cart.length}</span> products in your cart</p>

            <div className="flex flex-col lg:flex-row gap-8">
                
                {/* --- Left Side: Product List --- */}
                <div className="flex-grow">
                    {/* Desktop Table View (Hidden on Mobile) */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left border-separate border-spacing-y-4">
                            <thead className="bg-gray-200 text-gray-700">
                                <tr>
                                    <th className="p-4 rounded-l-xl">Product</th>
                                    <th className="p-4">Unit Price</th>
                                    <th className="p-4">Quantity</th>
                                    <th className="p-4">Subtotal</th>
                                    <th className="p-4 rounded-r-xl text-center">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map(item => (
                                    <tr key={item.id} className="bg-white shadow-sm rounded-xl">
                                        <td className="p-4 flex items-center gap-4">
                                            <img src={item.image} alt="" className="w-16 h-16 object-contain border rounded-lg" />
                                            <div>
                                                <h3 className="font-semibold">{item.name}</h3>
                                                <div className="flex text-yellow-400 text-xs">★★★★☆</div>
                                            </div>
                                        </td>
                                        <td className="p-4 font-medium">{item.discount_price || item.price} TK</td>
                                        <td className="p-4 font-bold">{item.quantity}</td>
                                        <td className="p-4 font-bold text-gray-700">{(item.discount_price || item.price) * item.quantity} TK</td>
                                        <td className="p-4 text-center">
                                            <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                                <FiX size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View (Hidden on Desktop) */}
                    <div className="md:hidden space-y-4">
                        {cart.map(item => (
                            <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm flex gap-4 relative">
                                <button 
                                    onClick={() => removeFromCart(item.id)} 
                                    className="absolute top-2 right-2 text-gray-400 p-1"
                                >
                                    <FiX size={18} />
                                </button>
                                
                                <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0 border">
                                    <img src={item.image} alt="" className="w-full h-full object-contain" />
                                </div>
                                
                                <div className="flex-grow flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-sm leading-tight pr-5">{item.name}</h3>
                                        <p className="text-pink-600 font-bold text-sm mt-1">
                                            {item.discount_price || item.price} TK
                                        </p>
                                    </div>
                                    
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                                        <span className="font-bold text-gray-800 text-sm">
                                            Total: {(item.discount_price || item.price) * item.quantity} TK
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Right Side: Cart Totals --- */}
                <div className="w-full lg:w-80 bg-white p-6 rounded-2xl shadow-sm h-fit">
                    <h2 className="text-lg font-bold mb-4 border-b pb-2 uppercase italic">Cart Totals</h2>
                    <div className="space-y-4 text-sm font-medium">
                        <div className="flex justify-between uppercase">
                            <span>Subtotal</span>
                            <p>{totalPrice.toFixed(2)} TK</p>
                        </div>
                        <div className="flex justify-between uppercase">
                            <span>Delivery:</span>
                            <span className="text-gray-500">{deliveryCharge} TK</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold border-t pt-4 uppercase">
                            <span>Total</span>
                            <span className="text-pink-600">{finalAmount.toFixed(2)} TK</span>
                        </div>
                    </div>
                    <button onClick={() => navigate('/checkout')} className="w-full bg-[#E91E63] text-white py-4 rounded-xl mt-6 font-bold flex items-center justify-center gap-2 hover:bg-[#d81b60] active:scale-95 transition-all shadow-lg">
                        <IoBagOutline /> PROCEED TO CHECKOUT
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;