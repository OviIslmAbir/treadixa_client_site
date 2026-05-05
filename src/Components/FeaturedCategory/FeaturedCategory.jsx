import React from 'react';
import { Link } from 'react-router-dom';
import { GiShoppingBag, GiLipstick } from "react-icons/gi";
import { MdOutlineElectricBolt } from "react-icons/md";
import { BiSolidWatch } from "react-icons/bi";

const FeaturedCategory = () => {
    const categories = [
        { id: 2, name: 'Gadgets & Electronics', icon: <MdOutlineElectricBolt className="text-3xl md:text-4xl text-pink-500" />, bgColor: 'bg-pink-50', link: '/electronics' },
        { id: 3, name: 'Bags & Accessories', icon: <GiShoppingBag className="text-3xl md:text-4xl text-red-500" />, bgColor: 'bg-red-50', link: '/bags' },
        { id: 4, name: 'Beauty & Skincare', icon: <GiLipstick className="text-3xl md:text-4xl text-orange-500" />, bgColor: 'bg-orange-50', link: '/beauty' },
        { id: 5, name: 'Trendy Watch', icon: <BiSolidWatch className="text-3xl md:text-4xl text-green-600" />, bgColor: 'bg-green-50', link: '/watch' },
    ];

    return (
        <div className="container mx-auto px-4 py-10">
            {/* Title Section */}
            <h2 className="text-lg md:text-xl font-bold mb-8 uppercase tracking-wide text-gray-800 border-l-4 border-[#6c4fb3] pl-3">
                Featured Categories
            </h2>
            
            {/* Grid Layout */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center justify-center">
                {categories.map((cat) => (
                    <Link 
                        key={cat.id} 
                        to={cat.link} 
                        className="flex flex-col items-center group cursor-pointer"
                    >
                        {/* Circle Background*/}
                        <div className={`w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center shadow-sm border border-white transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-xl ${cat.bgColor}`}>
                            <div className="transition-transform duration-300 group-hover:rotate-12">
                                {cat.icon}
                            </div>
                        </div>
                        
                        {/* Name */}
                        <span className="mt-4 font-bold text-xs md:text-sm text-gray-700 group-hover:text-[#6c4fb3] transition-colors text-center px-2">
                            {cat.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default FeaturedCategory;