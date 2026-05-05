import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import ScrollToTop from '../Components/ScrollToTop/ScrollToTop';
import { FaWhatsapp, FaPhoneAlt,FaTruck, FaHeadset, FaShoppingBag, FaStar  } from 'react-icons/fa'; 
import DynamicTitle from '../Components/DynamicTitle/DynamicTitle';
import Marquee from "react-fast-marquee";
const Roots = () => {
    return (
        <div className="flex flex-col min-h-screen relative">
            <ScrollToTop /> 

            <DynamicTitle /> 
<div className="bg-[#7E53AC] py-3 shadow-lg border-b border-white/10">
            <Marquee 
                gradient={false} 
                speed={50} 
                pauseOnHover={true}
                className="text-white"
            >

                <div className="flex items-center gap-3 mx-10">
                    <span className="bg-yellow-400 text-[#7E53AC] px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-tighter">Welcome</span>
                    <span className="text-sm font-medium tracking-wide">Trendixa BD অফিশিয়াল ওয়েবসাইট এ আপনাকে স্বাগতম</span>
                </div>


                <div className="flex items-center gap-3 mx-10">
                    <FaTruck className="text-yellow-400 text-lg" />
                    <span className="text-sm font-medium">সারাদেশে ৭২ ঘণ্টার মধ্যে নিশ্চিত ক্যাশ অন ডেলিভারি</span>
                </div>


                <div className="flex items-center gap-3 mx-10">
                    <FaShoppingBag className="text-yellow-400 text-lg" />
                    <span className="text-sm font-medium">প্রয়োজনীয় ট্রেন্ডিং পণ্য সামগ্রী খুচরা ও পাইকারী বিক্রেতা</span>
                </div>


                <div className="flex items-center gap-3 mx-10">
                    <div className="flex items-center gap-2 bg-white/20 px-4 py-1 rounded-full border border-white/30">
                        <FaHeadset className="text-yellow-400" />
                        <span className="text-sm font-black">হটলাইনঃ 01568318671</span>
                    </div>
                </div>


                <div className="flex items-center gap-3 mx-10">
                    <FaStar className="text-yellow-400 animate-pulse" />
                    <span className="text-sm font-medium">অর্ডার করুন ২৪ ঘন্টা সপ্তাহের সাত দিন</span>
                </div>
            </Marquee>
        </div>
            <Navbar />

            <div className="flex-grow">
                <Outlet />
            </div>
            <Footer />


            <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 flex flex-col gap-3 md:gap-4 z-50">
                

                <a 
                    href="tel:01568318671" 
                    className="bg-blue-600 text-white p-3 md:p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center border-2 border-white"
                    title="Call Now"
                >
                    <FaPhoneAlt className="text-xl md:text-2xl" />
                </a>


                <a 
                    href="https://wa.me/8801568318671" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#25D366] text-white p-2 md:p-3 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center border-2 border-white"
                    title="Message on WhatsApp"
                >
                    <FaWhatsapp className="text-3xl md:text-4xl" />
                </a>
                
            </div>
        </div>
    );
};

export default Roots;