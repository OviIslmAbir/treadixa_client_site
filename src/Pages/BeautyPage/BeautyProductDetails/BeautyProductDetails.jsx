import React, { useState, useContext, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { FaStar, FaRegStar, FaMinus, FaPlus, FaShoppingCart, FaCheckCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useCart } from '../../../Components/Hooks/CartContext';
import { AuthContext } from '../../../Components/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';

const BeautyProductDetails = () => {
    const singleGadget = useLoaderData();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { user } = useContext(AuthContext);
    
    const [quantity, setQuantity] = useState(1);
    const [currentImg, setCurrentImg] = useState(0);

    useEffect(() => {
        if (singleGadget?.name) {
            document.title = `Trendixa | ${singleGadget.name}`;
        }
    }, [singleGadget]);

    if (!singleGadget || !singleGadget._id) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-[#7E53AC]"></span>
            </div>
        );
    }

    const { name, price, discount_price, image1, image2, image3, specifications, description, discount_percentage, rating, total_sell, brand } = singleGadget;

    const productImages = [
        image1 || singleGadget.image, 
        image2 || singleGadget.image, 
        image3 || singleGadget.image
    ];

    const handleAuthCheck = () => {
        if (!user) {
            toast.error("অর্ডার করতে আগে লগইন করুন!");
            navigate('/signIn');
            return false;
        }
        return true;
    };

    const handleOrderNow = () => {

            addToCart(singleGadget, quantity, true); 
            navigate('/checkout');
    
    };

    const handleAddToCart = () => {

            addToCart(singleGadget, quantity);
        
    };

    return (
        <div className="min-h-screen bg-[#F3F3F3] p-4 md:p-10 flex justify-center items-center font-sans text-gray-800">
            <div className="max-w-6xl w-full bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-12">
                    {/* Left: Image Slider Section */}
                    <div className="flex flex-col gap-4">
                        <div className="relative group overflow-hidden bg-white rounded-2xl border border-gray-100 flex justify-center items-center h-[350px]">
                            <span className="absolute top-4 left-4 bg-[#21B9FF] text-white text-[10px] font-bold px-2 py-1 rounded-full z-10">
                                {discount_percentage || '0'} OFF
                            </span>
                            
                            <div className="w-full h-full overflow-hidden flex justify-center items-center p-5">
                                <img 
                                    src={productImages[currentImg]} 
                                    alt={name} 
                                    className="w-full h-full object-contain transition-transform duration-700 ease-in-out group-hover:scale-110 cursor-zoom-in"
                                />
                            </div>

                            <button onClick={() => setCurrentImg(currentImg === 0 ? productImages.length - 1 : currentImg - 1)} className="absolute left-2 p-2 bg-white/80 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                                <FaChevronLeft size={12} />
                            </button>
                            <button onClick={() => setCurrentImg(currentImg === productImages.length - 1 ? 0 : currentImg + 1)} className="absolute right-2 p-2 bg-white/80 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                                <FaChevronRight size={12} />
                            </button>
                        </div>
                        
                        <div className="flex gap-2 justify-center">
                            {productImages.map((img, idx) => (
                                <div key={idx} onClick={() => setCurrentImg(idx)} className={`w-14 h-14 border-2 rounded-lg p-1 cursor-pointer transition-all ${currentImg === idx ? 'border-[#7E53AC]' : 'border-transparent bg-gray-50'}`}>
                                    <img src={img} className="w-full h-full object-contain" alt="thumbnail" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Details Section */}
                    <div className="flex flex-col space-y-4 text-start">
                        <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
                        <div className="flex items-center gap-4 text-sm">
                            <span className="text-gray-400">Brand: {brand}</span>
                            <div className="flex text-yellow-400">
                                <FaStar /><FaStar /><FaStar /><FaStar /><FaRegStar className="text-gray-300" />
                            </div>
                            <span className="text-gray-400">({rating || 5.0})</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-lg text-gray-400 line-through">{price} TK</span>
                            <span className="text-xl font-bold text-[#E91E63]">{discount_price || price} TK</span>
                        </div>

                        <div className="badge bg-[#EAF9E7] text-[#30AD5E] border-none font-bold text-[12px] px-3 py-3 w-fit">
                            Total Sold: {total_sell || 0}
                        </div>

                        <p className="text-gray-500 text-sm leading-relaxed max-w-md italic">
                            {description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-6">
                            <div className="join bg-[#F3F3F3] rounded-full overflow-hidden border-none shadow-sm">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="btn btn-ghost btn-sm join-item px-4"><FaMinus size={10}/></button>
                                <div className="w-10 flex items-center justify-center font-bold text-sm">{quantity}</div>
                                <button onClick={() => setQuantity(quantity + 1)} className="btn btn-ghost btn-sm join-item px-4"><FaPlus size={10}/></button>
                            </div>

                            <button onClick={handleAddToCart} className="btn bg-[#E91E63] hover:bg-[#D81B60] text-white border-none rounded-full px-8 text-sm font-bold shadow-md">
                                <FaShoppingCart className="mr-2" /> কার্টে যোগ করুন
                            </button>

                            <button onClick={handleOrderNow} className="btn bg-[#7E53AC] hover:bg-[#6b4594] text-white border-none rounded-full px-8 text-sm font-bold shadow-md">
                                অর্ডার করুন
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Tabs */}
<div className="bg-[#F9F7FF] p-8 md:p-12 mt-4 rounded-b-[32px]">
    {/* DaisyUI Tabs Boxed */}
    <div className="tabs tabs-boxed bg-transparent gap-4 mb-8 flex justify-start">
        
        {/* Specification*/}
        <input 
            type="radio" 
            name="bag_tabs" 
            className="tab h-10 !rounded-full transition-all checked:!bg-[#7E53AC] checked:!text-white border border-gray-100 bg-white px-8 font-semibold text-gray-500" 
            aria-label="Specifications" 
            defaultChecked 
        />
        <div className="tab-content pt-10 text-start w-full">
            <h3 className='text-2xl font-bold mb-8 text-gray-800 border-b pb-3'>Product Specifications:</h3>
                        <h2 className='text-2xl font-bold mb-5'>{name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {specifications && Object.keys(specifications).length > 0 ? (
                    Object.entries(specifications)
                        .filter(([key, value]) => key && value && key.trim() !== "" && value.trim() !== "")
                        .map(([key, value], index) => (
                            <div 
                                key={index} 
                                className="flex items-start gap-3 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all h-full"
                            >
                                <div className="mt-1 bg-[#EFFFF4] p-1.5 rounded-full shrink-0">
                                    <FaCheckCircle className="text-[#30AD5E]" size={16} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[#7E53AC] font-bold text-sm uppercase tracking-wider">
                                        {key.replace(/_/g, ' ')}
                                    </span>
                                    <p className="text-gray-700 font-semibold text-[15px] mt-0.5 leading-snug">
                                        {value}
                                    </p>
                                </div>
                            </div>
                        ))
                ) : (
                    <p className="text-gray-400 italic">No specifications available.</p>
                )}
            </div>
        </div>

        {/*  Description */}
        <input 
            type="radio" 
            name="bag_tabs" 
            className="tab h-10 !rounded-full transition-all checked:!bg-[#7E53AC] checked:!text-white border border-gray-200 bg-white px-8 font-semibold text-gray-500" 
            aria-label="Description" 
        />
        <div className="tab-content pt-10 text-start w-full">
            <h2 className='text-2xl font-bold mb-5'>{name}</h2>
            <p className='text-gray-600 text-[16px] leading-7 whitespace-pre-line'>{description}</p>
        </div>

    </div>
</div>
            </div>
        </div>
    );
};

export default BeautyProductDetails;