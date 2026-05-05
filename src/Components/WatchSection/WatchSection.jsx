import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import Watch from '../../Pages/WatchPage/Watch/Watch';

const WatchSection = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
       fetch('https://ecomerce-server-kohl.vercel.app/products?category=wellness')
            .then(res => res.json())
            .then(actualData => {
                setData(actualData); 
            });
    }, []);

    return (
        <div className='container mx-auto py-4 px-1 md:px-4 bg-white rounded-xl md:rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-50 mb-5'>
            
            {/* Header Section */}
            <div className="flex justify-between items-center mb-3 px-2">
                <div className="relative">
                    <h1 className="text-sm md:text-2xl font-bold uppercase tracking-tight text-gray-800">
                        Premium Watches
                    </h1>
                </div>

                <Link to="/watch">
                    <button className="py-1.5 px-3 md:px-6 md:py-2 text-[10px] md:text-sm bg-[#7E53AC] border-none shadow-md rounded-full font-bold text-white transition-all hover:bg-[#6a4296]">
                        VIEW ALL
                    </button>
                </Link>
            </div>
            
            {/* Gradient Line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-[#7E53AC] to-[#E91E63] rounded-full mb-4"></div>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1.5 md:gap-4 px-1'>
                {
                    data.slice(0, 10).map(watch => (
                        <Watch 
                            watch={watch} 
                            key={watch.id} 
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default WatchSection;