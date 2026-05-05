import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Banner from '../../Components/Banner/Banner';
import FeaturedCategory from '../../Components/FeaturedCategory/FeaturedCategory';
import GadgetsSection from '../../Components/GadgetsSection/GadgetsSection';
import BagsSection from '../../Components/Bags/BagsSection';
import BeautySection from '../../Components/BeautySection/BeautySection';
import WatchSection from '../../Components/WatchSection/WatchSection';

const Home = () => {
    return (
        <div className='container mx-auto px-3'>
            <Banner></Banner>
            <FeaturedCategory></FeaturedCategory>
            <GadgetsSection></GadgetsSection>
            <BeautySection></BeautySection>
            <WatchSection></WatchSection>
            <BagsSection></BagsSection>
        </div>
    );
};

export default Home;