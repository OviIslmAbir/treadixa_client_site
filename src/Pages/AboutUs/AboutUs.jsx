import React from 'react';
import { FiTarget, FiAward, FiShield, FiTrendingUp } from "react-icons/fi";

const About = () => {
    return (
        <div className="bg-white text-gray-800">
            <div className="relative py-20 md:py-32 bg-[#7E53AC] text-white text-center px-5 overflow-hidden">
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-7xl font-black mb-6 animate-fade-in">
                        Trendixa <span className="text-yellow-400">BD</span>
                    </h1>
                    <p className="text-lg md:text-2xl opacity-90 leading-relaxed font-light italic">
                        "যেখানে ট্রেন্ড আর আভিজাত্য এক বিন্দুতে মিলে যায়"
                    </p>
                </div>
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute -top-10 -left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                </div>
            </div>

            <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-[#7E53AC]">
                            আমাদের পথচলা...
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Trendixa BD শুধুমাত্র একটি ই-কমার্স প্ল্যাটফর্ম নয়; এটি একটি আস্থার নাম। আমরা বিশ্বাস করি, শপিং মানে কেবল পণ্য কেনা নয়, বরং একটি চমৎকার অভিজ্ঞতা। ২০২৩ সাল থেকে আমরা চেষ্টা করছি বাংলাদেশের প্রতিটি মানুষের হাতে সেরা মানের গাজেট, ফ্যাশন এবং ডেইলি লাইফস্টাইল পণ্য পৌঁছে দিতে।
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            আমাদের লক্ষ্য খুব সাধারণ—আপনার প্রতিদিনের জীবনকে আরও সহজ এবং ট্রেন্ডি করে তোলা। সেরা পণ্যের নিশ্চয়তা আর দ্রুততম ডেলিভারি দিয়ে আমরা জয় করতে চাই আপনার মন।
                        </p>
                    </div>
                    <div className="relative">
                        <img 
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
                            alt="Our Team" 
                            className="rounded-3xl shadow-2xl transition-transform duration-500 hover:rotate-2"
                        />
                        <div className="absolute -bottom-6 -right-6 bg-yellow-400 p-8 rounded-2xl hidden md:block">
                            <span className="text-4xl font-black block">১০০%</span>
                            <span className="font-bold text-sm uppercase">জেনুইন প্রোডাক্ট</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-gray-400 mb-2">কেন আমরা আলাদা?</h3>
                        <div className="h-1.5 w-24 bg-[#7E53AC] mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <FiTarget />, title: "আমাদের লক্ষ্য", desc: "সেরা মানের পণ্য সাশ্রয়ী মূল্যে সবার কাছে পৌঁছে দেওয়া।" },
                            { icon: <FiAward />, title: "সেরা মান", desc: "আমরা কোয়ালিটির ব্যাপারে কোনো আপোষ করি না।" },
                            { icon: <FiShield />, title: "নিরাপদ শপিং", desc: "আপনার পেমেন্ট এবং তথ্য আমাদের কাছে ১০০% নিরাপদ।" },
                            { icon: <FiTrendingUp />, title: "সর্বাধুনিক কালেকশন", desc: "সবসময় লেটেস্ট সব ট্রেন্ডি কালেকশন থাকছে আমাদের কাছে।" }
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border-b-4 border-transparent hover:border-[#7E53AC]">
                                <div className="text-4xl text-[#7E53AC] mb-6">{item.icon}</div>
                                <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-20 text-center">
                <div className="bg-[#7E53AC] p-10 md:p-20 rounded-[40px] text-white">
                    <h2 className="text-3xl md:text-5xl font-black mb-6">আমাদের পরিবারের সদস্য হতে চান?</h2>
                    <p className="text-lg md:text-xl opacity-80 mb-10 max-w-2xl mx-auto font-light">
                        আপনার বিশ্বস্ততার সাথেই আমাদের এগিয়ে চলা। আজই শুরু হোক আপনার শপিং অভিজ্ঞতা!
                    </p>
                    <button className="bg-white text-[#7E53AC] px-10 py-4 rounded-full font-black text-lg hover:scale-105 transition-transform shadow-xl">
                        শপিং শুরু করুন
                    </button>
                </div>
            </div>
        </div>
    );
};

export default About;