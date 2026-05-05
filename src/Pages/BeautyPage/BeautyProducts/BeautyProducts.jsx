import React from 'react';
import { useLoaderData } from 'react-router-dom';
import BeautyProduct from '../BeautyProduct/BeautyProduct';

const BeautyProducts = () => {
    const beautyProducts = useLoaderData()
    return (
          <div className='container grid mx-auto grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 p-5'>
            {
              beautyProducts.map(beautyProduct => <BeautyProduct key={beautyProduct.id} beautyProduct={beautyProduct}></BeautyProduct>)
            }
        </div>
    );
};

export default BeautyProducts;