import React, { useContext, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { FaEnvelope, FaKey, FaHome, FaGoogle } from 'react-icons/fa';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Components/AuthProvider/AuthProvider';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import DynamicTitle from '../../Components/DynamicTitle/DynamicTitle';

const SignIn = () => {
    const { login, googleLogin, resetPassword } = useContext(AuthContext); 
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const userEmail = watch("email");

    const onSubmit = data => {
        login(data.email, data.password)
            .then(result => {
                toast.success('Welcome back! Login Successful.', {
                    duration: 3000,
                    style: { border: '1px solid #6c4fb3', padding: '16px', color: '#6c4fb3', fontWeight: 'bold' }
                });
                navigate(from, { replace: true });
            })
            .catch(error => {
                toast.error('Invalid Email or Password!', {
                    style: { border: '1px solid #ff4b2b', padding: '16px', color: '#ff4b2b' }
                });
            });
    };

    const handleForgetPassword = () => {
        if (!userEmail) {
            toast.error('Please enter your email address first!', {
                style: { border: '1px solid #ff4b2b', padding: '16px', color: '#ff4b2b' }
            });
            return;
        }
        resetPassword(userEmail)
            .then(() => {
                toast.success('Password reset email sent! Check your inbox.', {
                    duration: 5000,
                    style: { border: '1px solid #6c4fb3', padding: '16px', color: '#6c4fb3' }
                });
            })
            .catch(error => {
                toast.error('Could not send reset email. Try again.');
                console.error(error);
            });
    };

    const handleGoogleSignIn = () => {
        googleLogin()
            .then(result => {
                const user = result.user;
                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                    role: 'user' 
                };

                fetch('https://ecomerce-server-kohl.vercel.app/users', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(userInfo)
                })
                .then(res => res.json())
                .then(() => {
                    toast.success('Google Login Successful! 🚀');
                    navigate(from, { replace: true });
                });
            })
            .catch(error => {
                toast.error('Google Sign-In failed!');
                console.error(error);
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="hero min-h-screen bg-base-200 py-10 font-sans">
            <DynamicTitle/>

            <div className="hero-content flex-col lg:flex-row gap-10 max-w-7xl w-full">

                <div className="w-full lg:w-3/5 flex justify-center items-center">
                    <DotLottieReact
                        src="https://lottie.host/1fb4df19-353d-49da-9c96-e477c61663d6/KkC9XqqFFk.lottie"
                        loop
                        autoplay
                        className="w-full h-[400px] md:h-[500px] lg:h-[600px]"
                    />
                </div>

                <div className="card shrink-0 w-full lg:w-2/5 shadow-2xl bg-base-100 border border-gray-100">
                    <div className="card-body p-8 w-full text-start"> 
                        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800 italic uppercase tracking-tighter">Please Login</h2>
                        
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                            <div className="form-control w-full mb-4">
                                <label className="label">
                                    <span className="label-text font-bold text-gray-700">Email Address</span>
                                </label>
                                <div className="input input-bordered w-full flex items-center gap-3 bg-white border-gray-300 focus-within:border-[#6c4fb3]">
                                    <FaEnvelope className="text-gray-400" />
                                    <input 
                                        type="email" 
                                        className="grow text-black outline-none" 
                                        placeholder="Enter Email" 
                                        {...register("email", { required: "Email is required" })}
                                    />
                                </div>
                                {errors.email && <span className="text-error text-xs mt-1">{errors.email.message}</span>}
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold text-gray-700">Password</span>
                                </label>
                                <div className="input input-bordered w-full flex items-center gap-3 bg-white border-gray-300 focus-within:border-[#6c4fb3]">
                                    <FaKey className="text-gray-400" />
                                    <input 
                                        type={showPassword ? 'text' : 'password'} 
                                        className="grow text-black outline-none" 
                                        placeholder="Enter password" 
                                        {...register("password", { required: "Password is required" })}
                                    />
                                    <button type="button" onClick={togglePasswordVisibility} className="text-gray-500">
                                        {showPassword ? <BsFillEyeFill className="text-xl" /> : <BsFillEyeSlashFill className="text-xl" />}
                                    </button>
                                </div>
                                {errors.password && <span className="text-error text-xs mt-1">{errors.password.message}</span>}
                            </div>

                            <div className="flex justify-end mt-2 mb-4">
                                <button type="button" onClick={handleForgetPassword} className="text-xs font-bold text-[#6c4fb3] hover:underline">
                                    Forgot Password?
                                </button>
                            </div>

                            <div className="form-control w-full mt-2">
                                <button type="submit" className="btn bg-[#6c4fb3] hover:bg-[#5a3f99] w-full text-white text-lg border-none shadow-lg transition-all duration-300 font-bold uppercase">
                                    Sign In
                                </button>
                            </div>

                            <p className="mt-6 text-center text-sm text-gray-600 font-medium">
                                Don't Have An Account? 
                                <Link to="/signUp" className="text-error font-extrabold ml-1 hover:underline">Sign Up Now</Link>
                            </p>
                        </form>

                        <div className="divider mt-8 text-[10px] font-bold opacity-70 uppercase tracking-widest text-gray-400">OR LOGIN WITH</div>
                        
                        <div className="w-full flex flex-col gap-3">
                            <button onClick={handleGoogleSignIn} className="btn btn-outline border-gray-300 hover:bg-gray-100 hover:text-gray-800 text-gray-600 w-full gap-3 font-bold transition-all">
                                <FaGoogle className="text-red-500" /> Continue with Google
                            </button>

                            <Link to="/" className="btn bg-gray-800 hover:bg-black text-white w-full gap-2 font-bold shadow-md border-none">
                                <FaHome /> Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;