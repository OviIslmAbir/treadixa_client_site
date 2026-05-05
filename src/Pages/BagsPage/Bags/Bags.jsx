import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Bag from '../Bag/bag';

const Bags = () => {
    const bags = useLoaderData()
    return (
        <div className='container grid mx-auto grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 p-5'>
            {
              bags.map(bag => <Bag key={bag.id} bag={bag}></Bag>)
            }
        </div>
    );
};

export default Bags;