import React from 'react';
import Watch from '../Watch/Watch';
import { useLoaderData } from 'react-router-dom';

const Watches = () => {
    const watches = useLoaderData()
    return (
        <div className='container grid mx-auto grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 p-5'>
            {
              watches.map(watch => <Watch key={watch.id} watch={watch}></Watch>)
            }
        </div>
    );
};

export default Watches;