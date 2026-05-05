import React, { useContext, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { FaUser, FaEnvelope, FaKey, FaHome, FaGoogle } from 'react-icons/fa';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Components/AuthProvider/AuthProvider';
import toast from 'react-hot-toast'; 
import DynamicTitle from '../../Components/DynamicTitle/DynamicTitle';

const SignUp = () => {
    const { createUser, updateUserProfile, googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);


    const onSubmit = data => {
        const { name, email, password, photo } = data;

        createUser(email, password)
            .then(result => {
                updateUserProfile(name, photo)
                    .then(() => {
                        const userInfo = {
                            name: name,
                            email: email,
                            photo: photo || "https://i.ibb.co/0nbS77y/user.png",
                            role: 'user' 
                        };
                        

                        fetch('https://ecomerce-server-kohl.vercel.app/users', {
                            method: 'POST',
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify(userInfo)
                        })
                        .then(res => res.json())
                        .then(data => {
                            if (data.insertedId) {
                                reset();
                                toast.success("Account Created Successfully! 🎉");
                                navigate('/');
                            }
                        })
                    })
            })
            .catch(error => {
                toast.error(error.message);
            });
    };


    const handleGoogleSignUp = () => {
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
                    toast.success("Google Sign-Up Successful! 🚀");
                    navigate('/');
                });
            })
            .catch(error => {
                toast.error("Google Sign-Up failed!");
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="hero min-h-screen bg-base-200 py-10 font-sans text-start">
                        <DynamicTitle/>
            <div className="hero-content flex-col lg:flex-row-reverse gap-10 max-w-7xl w-full">
                
                {/* Lottie Animation */}
                <div className="w-full lg:w-3/5 flex justify-center items-center">
                    <DotLottieReact
                        src="https://lottie.host/1fb4df19-353d-49da-9c96-e477c61663d6/KkC9XqqFFk.lottie"
                        loop autoplay
                        className="w-full h-[400px] md:h-[500px] lg:h-[600px]"
                    />
                </div>

                {/* Form Side */}
                <div className="card shrink-0 w-full lg:w-2/5 shadow-2xl bg-base-100">
                    <div className="card-body p-8 w-full">
                        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 italic uppercase">Create Account</h2>
                        
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                            <div className="form-control w-full mb-4">
                                <label className="label">
                                    <span className="label-text font-semibold text-black">Full Name</span>
                                </label>
                                <div className="input input-bordered w-full flex items-center gap-3">
                                    <FaUser className="text-gray-400" />
                                    <input {...register("name", { required: "Name is required" })} type="text" className="grow text-black" placeholder="Your Name" />
                                </div>
                                {errors.name && <span className="text-error text-xs mt-1">{errors.name.message}</span>}
                            </div>

                            <div className="form-control w-full mb-4">
                                <label className="label">
                                    <span className="label-text font-semibold text-black">Email</span>
                                </label>
                                <div className="input input-bordered w-full flex items-center gap-3">
                                    <FaEnvelope className="text-gray-400" />
                                    <input {...register("email", { required: "Email is required" })} type="email" className="grow text-black" placeholder="email@example.com" />
                                </div>
                                {errors.email && <span className="text-error text-xs mt-1">{errors.email.message}</span>}
                            </div>

                            <div className="form-control w-full mb-6">
                                <label className="label">
                                    <span className="label-text font-semibold text-black">Password</span>
                                </label>
                                <div className="input input-bordered w-full flex items-center gap-3">
                                    <FaKey className="text-gray-400" />
                                    <input 
                                        {...register("password", { required: "Password is required", minLength: 6 })}
                                        type={showPassword ? 'text' : 'password'} 
                                        className="grow text-black" 
                                        placeholder="Min 6 characters" 
                                    />
                                    <button type="button" onClick={togglePasswordVisibility}>
                                        {showPassword ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                                    </button>
                                </div>
                                {errors.password && <span className="text-error text-xs mt-1">{errors.password.message || "Min 6 characters required"}</span>}
                            </div>

                            <button className="btn bg-[#6c4fb3] hover:bg-[#5a4196] border-none w-full text-white text-lg font-bold">
                                SIGN UP
                            </button>

                            <p className="mt-6 text-center text-sm text-gray-600">
                                Already Have An Account? 
                                <Link to="/signIn" className="text-error font-bold ml-1 hover:underline">Sign In</Link>
                            </p>
                        </form>

                        <div className="divider mt-6 opacity-50 text-[10px] font-bold">OR SIGN UP WITH</div>
                        
                        <div className="flex flex-col gap-3">
                            {/* Google Sign Up Button */}
                            <button 
                                onClick={handleGoogleSignUp}
                                className="btn btn-outline border-gray-300 hover:bg-gray-100 w-full gap-2 font-bold"
                            >
                                <FaGoogle className="text-red-500" /> Google
                            </button>

                            <Link to="/" className="btn bg-gray-800 text-white border-none w-full gap-2">
                                <FaHome /> Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;