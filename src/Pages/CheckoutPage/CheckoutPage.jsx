import React from 'react';
import { useCart } from '../../Components/Hooks/CartContext';
import { FiX } from "react-icons/fi";
import toast from 'react-hot-toast'; 
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
    const { cart, removeFromCart, totalPrice, deliveryCharge, setDeliveryCharge, clearCart } = useCart();
    const navigate = useNavigate();
    const finalAmount = totalPrice + deliveryCharge;

    const handleLocationChange = (e) => {
        const value = e.target.value;
        if (value === "inside") setDeliveryCharge(80);
        else if (value === "outside") setDeliveryCharge(120);
        else setDeliveryCharge(0);
    };

    const handleConfirmOrder = (e) => {
        e.preventDefault();
        
        const form = e.target;
        const name = form.name.value;
        const address = form.address.value;
        const phone = form.phone.value;



        if (!deliveryCharge) {
            return toast.error("দয়া করে ডেলিভারি এরিয়া সিলেক্ট করুন!");
        }

        const orderInfo = {
            customerName: name,
            address: address,
            phone: phone,
            items: cart, 
            totalAmount: finalAmount,
            status: 'pending', 
            orderDate: new Date().toLocaleString()
        };

        fetch('https://ecomerce-server-kohl.vercel.app/orders', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(orderInfo)
        })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {

                toast.success(`ধন্যবাদ ${name}! অর্ডার কনফার্ম হয়েছে। 🎉`, {
                    id: 'order-success' 
                });


                clearCart(); 

                form.reset(); 
                navigate('/'); 
            }
        })
        .catch(err => {
            console.error(err);
            toast.error("দুঃখিত, অর্ডারটি সম্পন্ন করা যায়নি।");
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-10 font-sans">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                

                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                    <div className="bg-[#7E53AC] text-white text-center py-3 rounded-t-xl mb-6 font-bold uppercase">
                        Order Details
                    </div>
                    
                   <form onSubmit={handleConfirmOrder} className="space-y-4 text-start">
    <div>
        <label className="block text-sm font-bold text-gray-700 mb-1 text-start">আপনার নাম</label>
        <input 
            name="name" 
            type="text" 
            placeholder="আপনার পূর্ণ নাম লিখুন" 
            className="input input-bordered w-full bg-white text-black" 
            required 
        />
    </div>
    
    <div>
        <label className="block text-sm font-bold text-gray-700 mb-1 text-start">সম্পূর্ণ ঠিকানা</label>
        <input 
            name="address" 
            type="text" 
            placeholder="গ্রাম/রোড, থানা, জেলা লিখুন" 
            className="input input-bordered w-full bg-white text-black" 
            required 
        />
    </div>
    
    <div>
        <label className="block text-sm font-bold text-gray-700 mb-1 text-start">মোবাইল নম্বর</label>
        <input 
            name="phone" 
            type="text" 
            placeholder="০১৭XXXXXXXX" 
            className="input input-bordered w-full bg-white text-black" 
            required 
        />
    </div>
    
    <div>
        <label className="block text-sm font-bold text-gray-700 mb-1 text-start">ডেলিভারি এরিয়া</label>
        <select 
            onChange={handleLocationChange} 
            className="select select-bordered w-full bg-white text-black" 
            required
        >
            <option value="">--- এলাকা নির্বাচন করুন ---</option>
            <option value="inside">ঢাকার ভিতরে (৮০ টাকা)</option>
            <option value="outside">ঢাকার বাইরে (১২০ টাকা)</option>
        </select>
    </div>
    
    <button 
        type="submit" 
        className="w-full bg-[#7E53AC] hover:bg-[#6b4594] text-white font-black py-4 rounded-xl text-xl mt-6 uppercase"
    >
        অর্ডার কনফার্ম করুন
    </button>
</form>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 h-fit">
                    <h2 className="text-xl font-bold mb-6 border-b pb-2 uppercase text-start">Your Order</h2>
                    
                    <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
                        {cart.map(item => (
                            <div key={item.id} className="flex items-center gap-4 border-b pb-4 relative">
                                <div className="w-16 h-16 bg-gray-50 rounded-lg border p-1 shrink-0">
                                    <img src={item.image} alt="" className="w-full h-full object-contain" />
                                </div>
                                <div className="flex-grow text-start text-black">
                                    <h3 className="font-bold text-sm">{item.name}</h3>
                                    <p className="text-[#E91E63] font-bold">৳ {(item.discount_price || item.price)} x {item.quantity}</p>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="absolute top-0 right-0 text-gray-400">
                                    <FiX size={18} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 space-y-3 font-bold text-gray-700 uppercase text-sm">
                        <div className="flex justify-between border-b pb-2">
                            <span>Subtotal:</span>
                            <span className="text-black">{totalPrice.toFixed(2)} TK</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span>Delivery:</span>
                            <span className="text-[#E91E63]">{deliveryCharge.toFixed(2)} TK</span>
                        </div>
                        <div className="flex justify-between text-xl font-extrabold pt-2 text-gray-900">
                            <span>Total:</span>
                            <span className="text-black">{finalAmount.toFixed(2)} TK</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;