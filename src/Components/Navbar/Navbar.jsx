import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiSearch, FiHeart, FiX } from "react-icons/fi";
import { IoBagOutline, IoHomeOutline, IoPersonOutline } from "react-icons/io5";
import { GiHamburgerMenu, GiShoppingBag, GiLipstick } from "react-icons/gi";
import { MdOutlineElectricBolt,  MdOutlineAssignment } from "react-icons/md";
import { BiSolidWatch } from "react-icons/bi";
import { ImFire } from "react-icons/im";
import { useCart } from '../Hooks/CartContext';
import useAdmin from '../Hooks/useAdmin';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { FaShoppingCart,FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const navigate = useNavigate(); 


    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            const searchText = e.target.value;
            if (searchText) {
                navigate(`/search?query=${searchText}`); 
                setIsSearchOpen(false); 
            }
        }
    };

    const navLinkStyles = ({ isActive }) => 
        `flex items-center text-[16px] gap-3 px-3 py-1.5 uppercase cursor-pointer rounded-full transition-all duration-300 ${
            isActive ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'
        }`;

    const bottomNavStyles = ({ isActive }) => 
        `flex flex-col items-center justify-center transition-all duration-300 ${
            isActive ? 'text-[#6c4fb3]' : 'text-gray-500'
        }`;

    const {cart} = useCart()

    return (
        <div className='container mx-auto my-2 md:pb-20 pb-5 lg:pb-0'> 
        {isSearchOpen && (
                <div className="lg:hidden fixed inset-0 bg-white z-[60] p-4 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">Search Products</span>
                        <FiX className="text-2xl cursor-pointer" onClick={() => setIsSearchOpen(false)} />
                    </div>
                    <div className="relative w-full h-[50px]">
                        <input
                            autoFocus
                            onKeyDown={handleSearch} 
                            type="search"
                            placeholder="Search for products..."
                            className="w-full h-full bg-[#e5e5e5] rounded-[5px] pl-4 pr-12 outline-none"
                        />
                        <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-[25px]" />
                    </div>
                </div>
            )}
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="drawer drawer-start lg:hidden w-10">
                        <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            <label htmlFor="my-drawer-5" className="drawer-button">
                                <GiHamburgerMenu className='text-[25px]' />
                            </label>
                        </div>
                        <div className="drawer-side z-50">
                            <label htmlFor="my-drawer-5" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu bg-base-200 min-h-full w-80 p-4">
                                <div className="">
                                    <div className="mb-10">
                                        <Link to="/" className="flex items-center gap-2 text-2xl font-bold ">
                                            Trendixa BD
                                        </Link>
                                    </div>
                                    <div className="flex-grow space-y-2 overflow-y-auto">
                                        <div>
                                            <div className="collapse-title flex items-center gap-3 font-bold text-gray-700 uppercase tracking-wider text-sm p-2 min-h-0">
                                                <MdOutlineElectricBolt className="text-xl text-blue-500" /> 
                                                <NavLink to="/electronics" className={({isActive}) => isActive ? "text-purple-600 block py-1" : "block py-1"}>Gadgets & Electronics</NavLink>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="collapse-title flex items-center gap-3 font-bold text-gray-700 uppercase tracking-wider text-sm p-2 min-h-0">
                                                <GiShoppingBag className="text-xl text-pink-400" /> <NavLink to="/bags" className={({isActive}) => isActive ? "text-purple-600 block" : "block"}>Bags & Accessories</NavLink>
                                            </div>
                                        </div>
                                        <NavLink to="/beauty" className={({isActive}) => `flex items-center gap-3 font-bold uppercase tracking-wider text-sm p-2 rounded-md ${isActive ? 'bg-purple-100 text-purple-600' : 'text-gray-700'}`}>
                                            <GiLipstick className="text-xl text-orange-400" /> BEAUTY & Skincare
                                        </NavLink>
                                        <NavLink to="/watch" className={({isActive}) => `flex items-center gap-3 font-bold uppercase tracking-wider text-sm p-2 rounded-md ${isActive ? 'bg-purple-100 text-purple-600' : 'text-gray-700'}`}>
                                            <BiSolidWatch className="text-xl text-brown-400" /> Trendy Watch
                                        </NavLink>
                                    </div>
                                    <div className="pt-5 border-t mt-4">
                                       {user ? (<li><button onClick={() => logOut()}className="btn w-full bg-[#6c4fb3] hover:bg-[#5a4196] text-white border-none rounded-lg px-6">Logout</button></li>) : (
                                                 <Link className="btn btn-sm  bg-[#6c4fb3] hover:bg-[#5a4196] text-white border-none rounded-lg" to='/signIn'>
                                                    Sign In
                                                 </Link>
                                            )}
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:left-0 lg:translate-x-0">
                        <Link to='/' className='text-3xl md:text-4xl whitespace-nowrap font-bold '>Trendixa BD</Link>
                    </div>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <label className="relative w-[600px] h-[50px]">
                    <input
                        onKeyDown={handleSearch} 
                        type="search"
                        placeholder="Search for products..."
                        className="w-full h-full bg-[#e5e5e5] rounded-[5px] pl-4 pr-12 outline-none"
                    />
                        <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-[25px] cursor-pointer" />
                    </label>
                </div>

                <div className="navbar-end gap-1 md:gap-3">
                       <Link to="/cart" className="relative group p-2.5 bg-gray-50 hover:bg-purple-50 rounded-full transition-all duration-300 border border-gray-100 shadow-sm">
                                    <FaShoppingCart className="text-xl text-gray-700 group-hover:text-[#6c4fb3] transition-colors" />
                                    
                                    {cart?.length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#E91E63] to-[#ff4081] text-white text-[10px] font-extrabold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm animate-bounce">
                                            {cart.length}
                                        </span>
                                    )}
                        </Link>

{user ? (
    <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-[#6c4fb3]">
            <div className="w-10 rounded-full flex items-center justify-center bg-gray-100 overflow-hidden border border-gray-200">
                {user?.photoURL ? (
                    <img 
                        src={user.photoURL} 
                        alt="User" 
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <FaUserCircle className="text-3xl text-gray-400" />
                )}
            </div>
        </label>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[20] p-2 shadow-lg bg-base-100 rounded-xl w-52 border border-gray-100">
            <li className="px-4 py-2 font-bold text-[#6c4fb3] border-bottom mb-2">
                {user?.displayName || "User"}
            </li>
            
            {isAdmin && (
                <li className="bg-purple-50 rounded-lg">
                    <Link to="/dashboard/all-orders" className="font-bold text-[#6c4fb3]">
                        Admin Dashboard
                    </Link>
                </li>
            )}
            
            <li><Link to="/my-order">My Orders</Link></li>
            <li><button onClick={() => logOut()} className="text-red-500 font-medium">Logout</button></li>
        </ul>
    </div>
) : (
    <Link className="hidden lg:flex btn bg-[#6c4fb3] hover:bg-[#5a4196] text-white border-none rounded-lg px-6" to='/signIn'>
        Sign In
    </Link>
)}
            </div>
            </div>

            {/* --- Desktop Category Bar --- */}
            <div className="hidden lg:flex items-center gap-6 py-3 mt-2 justify-around">
                <nav className="flex items-center gap-2 text-[13px] font-bold text-gray-700">
                    <NavLink to="/electronics" className={navLinkStyles}>
                        <MdOutlineElectricBolt className="text-lg text-pink-400" />Gadgets & Electronics
                    </NavLink>

                    <NavLink to="/bags" className={navLinkStyles}>
                        <GiShoppingBag className="text-lg text-red-400" /> Bags & Accessories
                    </NavLink>

                    <NavLink to="/beauty" className={navLinkStyles}>
                        <GiLipstick className="text-lg text-orange-400" /> Beauty & Skincare
                    </NavLink>
                    
                    <NavLink to="/watch" className={navLinkStyles}>
                        <BiSolidWatch className="text-lg text-brown-400" /> Trendy Watch
                    </NavLink>
                </nav>
            </div>

            {/* --- Mobile Bottom Navigation  --- */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-6 flex justify-between items-center z-50">
                <NavLink to="/" className={bottomNavStyles}>
                    <IoHomeOutline className="text-[22px]" />
                    <span className="text-[11px] font-medium mt-1">Home</span>
                </NavLink>
                
                <div onClick={() => setIsSearchOpen(true)} className="flex flex-col items-center justify-center text-gray-500 cursor-pointer">
                    <FiSearch className="text-[22px]" />
                    <span className="text-[11px] font-medium mt-1">Search</span>
                </div>
                
                <NavLink to="/my-order" className={bottomNavStyles}>
                    <MdOutlineAssignment className="text-[22px]" />
                    <span className="text-[11px] font-medium mt-1">Orders</span>
                </NavLink>
                
            </div>
        </div>
    );
};

export default Navbar;