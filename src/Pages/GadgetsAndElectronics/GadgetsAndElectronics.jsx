import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import GadgetAndElectronic from '../GadgetAndElectromic/GadgetAndElectronic';

const GadgetsAndElectronics = () => {
    const electronics = useLoaderData()
    return (
        <div className='container grid mx-auto grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 p-5'>

            {
                electronics.map(electronic  => <GadgetAndElectronic electronic={electronic} key={electronic.id}></GadgetAndElectronic>)
            }
            
        </div>
    );
};

export default GadgetsAndElectronics;