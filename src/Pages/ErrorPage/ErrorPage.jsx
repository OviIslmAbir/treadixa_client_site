import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft } from "react-icons/fi";

const ErrorPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-5 text-center">
            <div className="w-full max-w-lg md:max-w-xl">
                <DotLottieReact
                    src="https://lottie.host/09f74332-261e-4020-8206-fa0e214612e0/UAnrEIpSJa.lottie"
                    loop
                    autoplay
                />
            </div>

            <div className="mt-8 space-y-4">
                <h1 className="text-4xl md:text-6xl font-black text-[#6c4fb3]">
                    ওহ হো!
                </h1>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                    আপনি ভুল পথে চলে এসেছেন!
                </h2>
                <p className="text-gray-500 max-w-md mx-auto">
                    দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি খুঁজে পাওয়া যায়নি অথবা ডিলিট করা হয়েছে।
                </p>
            </div>

            <div className="mt-10 flex flex-col md:flex-row gap-4">
                <button 
                    onClick={() => window.history.back()} 
                    className="btn btn-outline border-[#6c4fb3] text-[#6c4fb3] hover:bg-[#6c4fb3] hover:border-[#6c4fb3] hover:text-white rounded-full px-8 gap-2"
                >
                    <FiArrowLeft className="text-lg" /> পিছনে ফিরে যান
                </button>

                <Link 
                    to="/" 
                    className="btn bg-[#6c4fb3] hover:bg-[#5a4196] text-white border-none rounded-full px-8 gap-2 shadow-lg shadow-purple-200"
                >
                    <FiHome className="text-lg" /> হোম পেজে যান
                </Link>
            </div>

            <div className="mt-20">
                <p className="text-gray-400 text-sm">
                    সহায়তার প্রয়োজন? <Link to="/contact" className="text-[#6c4fb3] font-medium underline">আমাদের সাথে যোগাযোগ করুন</Link>
                </p>
            </div>
        </div>
    );
};

export default ErrorPage;