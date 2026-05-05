import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaPlus, FaUsers, FaBox, FaHome, FaList, FaChartPie, FaCog, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Components/AuthProvider/AuthProvider';

const Dashboard = () => {
    const { user, logOut } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const path = location.pathname.split("/").pop();
        const formattedTitle = path === "dashboard" ? "Admin Home" : 
                               path.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        document.title = `${formattedTitle} | Trendixa Admin`;
        setIsSidebarOpen(false); 
    }, [location]);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success("Logged out successfully!");
                navigate("/");
            })
            .catch(error => console.error(error));
    };

    const menuItems = (
        <>
            <p className="text-[10px] uppercase tracking-[2px] text-white/50 font-bold mb-4 ml-2">Main Menu</p>
            

            <li>
                <NavLink  to="/dashboard/all-orders" className={({ isActive }) => `  flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? 'bg-white text-[#6c4fb3] font-bold shadow-lg' : 'hover:bg-white/10 opacity-80'}`} >
                    <FaList className="text-sm"/> All Orders
                </NavLink>
            </li>

            <li>
                <NavLink to="/dashboard/add-product" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? 'bg-white text-[#6c4fb3] font-bold shadow-lg' : 'hover:bg-white/10 opacity-80'}`}>
                    <FaPlus className="text-sm"/> Add Product
                </NavLink>
            </li>


            <li>
                <NavLink to="/dashboard/manage-items" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? 'bg-white text-[#6c4fb3] font-bold shadow-lg' : 'hover:bg-white/10 opacity-80'}`}>
                    <FaBox className="text-sm"/> Manage Items
                </NavLink>
            </li>


            <li>
                <NavLink to="/dashboard/all-users" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? 'bg-white text-[#6c4fb3] font-bold shadow-lg' : 'hover:bg-white/10 opacity-80'}`}>
                    <FaUsers className="text-sm"/> All Users
                </NavLink>
            </li>
            
            <div className="divider bg-white/10 h-[1px] my-8"></div>
            
            <p className="text-[10px] uppercase tracking-[2px] text-white/50 font-bold mb-4 ml-2">Quick Links</p>
            <li>
                <NavLink to="/" className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-xl transition-all opacity-80">
                    <FaHome className="text-sm"/> Back to Home
                </NavLink>
            </li>
            <li>
                <button onClick={handleLogOut} className="flex items-center gap-3 p-3 hover:bg-red-500 rounded-xl transition-all opacity-80 w-full text-start">
                    <FaSignOutAlt className="text-sm"/> Logout
                </button>
            </li>
        </>
    );

    return (
        <div className="flex bg-[#F8F9FA] min-h-screen font-sans relative">
            

            <div className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                <div className="absolute inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)}></div>
                <div className={`absolute left-0 top-0 h-full w-72 bg-[#6c4fb3] p-6 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-xl font-black italic text-white">Trendixa Admin</h2>
                        <button onClick={() => setIsSidebarOpen(false)} className="text-white text-2xl"><FaTimes /></button>
                    </div>
                    <ul className="space-y-2 text-white">{menuItems}</ul>
                </div>
            </div>


            <div className="w-72 bg-[#6c4fb3] text-white p-6 shadow-2xl sticky top-0 h-screen hidden lg:block">
                <div className="flex items-center gap-3 mb-12">
                    <div className="bg-white p-2 rounded-lg"><FaChartPie className="text-[#6c4fb3] text-xl" /></div>
                    <h2 className="text-2xl font-black italic tracking-tight text-white">Trendixa <span className="text-yellow-400">Admin</span></h2>
                </div>
                <nav><ul className="space-y-2 text-start">{menuItems}</ul></nav>
            </div>


            <div className="flex-1 overflow-y-auto">
                <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md p-4 md:p-5 flex justify-between items-center shadow-sm border-b border-gray-100 lg:m-5 lg:rounded-3xl">
                    <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-[#6c4fb3] text-2xl p-2"><FaBars /></button>
                    <div className="hidden md:block">
                        <h3 className="text-lg font-bold text-gray-800 tracking-tighter uppercase">Admin Panel</h3>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-end hidden sm:block">
                            <p className="text-sm font-bold text-gray-800">{user?.displayName || "Admin"}</p>
                            <p className="text-[10px] text-gray-500">{user?.email}</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-[#6c4fb3]">
                             {user?.photoURL ? <img src={user.photoURL} className="w-full h-full object-cover" /> : <div className="bg-[#6c4fb3] text-white h-full flex items-center justify-center font-bold">A</div>}
                        </div>
                    </div>
                </div>

                <div className="p-5 lg:p-10">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;