import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {


    return (
            <div className=" md:w-full h-[40vh] md:h-[60vh] lg:h-[75vh]">
                <img 
                    className="w-full h-full object-cover rounded-2xl shadow-xl " 
                    src="banner.jpg" 
                    alt="Trendixa BD Banner" 
                />
            </div>

    );
};

export default Banner;