import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='bg-[#7E53AC] text-white w-full'>
            <footer className="container mx-auto p-10 flex flex-col md:flex-row flex-wrap justify-between items-center md:items-start text-center md:text-left gap-10">
                
                <aside className="max-w-xs">
                    <div>
                        <Link to='/' className='text-4xl md:text-5xl font-bold'>Trendixa BD</Link>
                        <p className='text-[16px] md:text-[18px] mt-2 opacity-90 italic'>
                            Where trend meets choice
                        </p>
                    </div>
                </aside>
                
                <nav className="flex flex-col gap-2">
                    <h6 className="footer-title text-white text-[20px] font-bold mb-2 opacity-100">Information</h6>
                    <Link to="/about" className="link link-hover">About us</Link>
                    <Link to="/contact" className="link link-hover">Contact us</Link>
                    <Link to="/terms" className="link link-hover">Terms & Conditions</Link>
                </nav>

                <nav className="flex flex-col gap-2">
                    <h6 className="footer-title text-white text-[20px] font-bold mb-2 opacity-100">My Account</h6>
                    <Link to="/signIn" className="link link-hover">Login</Link>
                    <Link to="/my-order" className="link link-hover">Order History</Link>
                    <Link to="/company" className="link link-hover">Company</Link>
                </nav>

                <nav className="flex flex-col gap-2">
                    <h6 className="footer-title text-white text-[20px] font-bold mb-2 opacity-100">Why Choose Us</h6>
                    <Link to="/help" className="link link-hover">Help Center</Link>
                    <Link to="/service" className="link link-hover">Customer Service</Link>
                    <Link to="/guide" className="link link-hover">Shopping Guide</Link>
                </nav>
            </footer>


            <div className="border-t border-white/20 py-8 px-4 bg-black/5">
                <div className="container mx-auto flex flex-col items-center justify-center space-y-4">
                    

                    <div className="text-center">
                        <p className="text-sm opacity-80">© {new Date().getFullYear()} All rights reserved by</p>
                        <h2 className="text-2xl md:text-xl font-black tracking-wider text-white mt-1">
                            Trendixa BD
                        </h2>
                    </div>


                    <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-sm pb-15 md:pb-2">
                        <span className="opacity-70">Website Designed by:</span>
                        <Link to="https://www.facebook.com/profile.php?id=100080089372110" className="font-bold  tracking-wide bg-white/10 px-3 py-1 rounded-full">
                            Ovi Islam Abir
                        </Link>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Footer;