import React from 'react';
import { Link } from 'react-router-dom';

const Bag = ({bag}) => {
    const { _id, name, price, discount_price, image, discount_percentage } = bag;

    return (
        <Link to={`/bags/${_id}`}>
        <div className="card bg-base-100 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 group relative">
            
            <div className="absolute top-2 right-2 z-10">
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-sm shadow-sm">
                    {discount_percentage} OFF
                </span>
            </div>

            <figure className="px-2 pt-2">
                <img
                    src={image}
                    alt={name}
                    className="rounded-xl h-40 w-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
            </figure>

            {/* Content Section */}
            <div className="card-body p-4 gap-1">
                {/* Product Name */}
                <h2 className="text-[14px] font-bold text-gray-800 line-clamp-1 group-hover:text-[#6c4fb3] transition-colors">
                    {name}
                </h2>

                {/* Pricing Section */}
                <div className="flex flex-col mt-1">
                    <span className="text-[16px] text-gray-400 line-through">
                        {price}TK
                    </span>
                    <span className="text-lg font-bold text-gray-900 leading-tight">
                        {discount_price}TK
                    </span>
                </div>

                <div className="card-actions mt-3">
                    <button className=" btn btn-sm w-full bg-[#6c4fb3] text-white text-xs capitalize border-none shadow-sm hover:shadow-md">
                       বিস্তারিত দেখুন
                    </button>
                </div>
            </div>
        </div>
        
        </Link>
    );
};

export default Bag;