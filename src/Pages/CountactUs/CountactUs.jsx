import React from 'react';
import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";

const ContactUs = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="bg-[#7E53AC] py-20 md:py-32 text-white text-center px-5">
                <h1 className="text-4xl md:text-6xl font-black mb-6">যোগাযোগ করুন</h1>
                <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto font-light leading-relaxed">
                    Trendixa BD-এর সাথে আপনার অভিজ্ঞতাকে আরও উন্নত করতে আমরা সবসময় আছি আপনার পাশে। 
                    যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন।
                </p>
            </div>

            <div className="container mx-auto px-6 -mt-12 md:-mt-20 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
                    
                    <div className="bg-white p-10 rounded-[35px] shadow-xl hover:shadow-2xl transition-all duration-300 border-b-4 border-transparent hover:border-[#7E53AC] flex flex-col items-center text-center group">
                        <div className="p-5 bg-purple-50 text-[#7E53AC] rounded-full text-3xl mb-6 group-hover:scale-110 transition-transform">
                            <FiPhone />
                        </div>
                        <h4 className="font-black text-xl text-gray-800 mb-3 tracking-wide">সরাসরি কল</h4>
                        <p className="text-gray-500 font-medium">01568318671</p>
                    </div>

                    <div className="bg-white p-10 rounded-[35px] shadow-xl hover:shadow-2xl transition-all duration-300 border-b-4 border-transparent hover:border-blue-500 flex flex-col items-center text-center group">
                        <div className="p-5 bg-blue-50 text-blue-600 rounded-full text-3xl mb-6 group-hover:scale-110 transition-transform">
                            <FiMail />
                        </div>
                        <h4 className="font-black text-xl text-gray-800 mb-3 tracking-wide">ইমেইল করুন</h4>
                        <p className="text-gray-500 font-medium">trendixabd@gmail.com</p>
                    </div>


                </div>

                <div className="mt-20 text-center space-y-4">
                    <p className="text-gray-400 font-medium italic">"আপনার আস্থাই আমাদের মূল শক্তি"</p>
                    <div className="h-1 w-20 bg-[#7E53AC] mx-auto rounded-full opacity-50"></div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;