import React, { useEffect } from 'react'
import HeroSection from '../../components/home/HeroSection'
import DealsSection from '../../components/home/DealsSection'
import PromotionSlider from '../../components/home/PromotionalBanner'
import Footer from '../../components/Footer'
import Categories from '../../components/home/Categories'
import Products from '../../components/shop/Products'
import PromoBanner from '../../components/home/PromoBanner'
import Milk from '../../components/home/Milk'
import GoogleReviews from '../../components/home/GoogleReviews'
import FruitsVegs from '../../components/fruitsandvegs/FruitsVegs'
import UpperSection from '../../components/uppersection/UpperSection'
import Test from "../../assets/Test.png";
import Sliders from '../../components/home/Sliders/Sliders'
import Banner from "../../assets/banners/banner.png"
import Banner1 from "../../assets/banners/bannernew.png"
import Banner2 from "../../assets/banners/bannernew3.png"
import Banner3 from "../../assets/banners/sambhaar-01.png"
import DeliveryInfo from '../../components/uppersection/DeliveryInfo'
import HowItWorks from '../../components/uppersection/HowItWorks'
import Reviews from '../../components/uppersection/Reviews'

const Home = () => {


    useEffect(() => {
      window.scrollTo(0, 0);
    }, []); 

  return (
    <div >
        <HeroSection />
        
        <Categories />
        {/* <PromotionSlider /> */}
    

        
        {/* <FruitsVegs/> */}
        {/* <OilsSlider/> */}
        <Sliders/>
        {/* <Milk/> */}
        {/* <Products /> */}

        {/* <GoogleReviews/> */}
        {/* <PromoBanner /> */}
        {/* <TestSwiper /> */}
        <DeliveryInfo/>
        <HowItWorks/>
        <Reviews/>
                <DealsSection />

         {/* <div className="px-4  md:px-10 md:flex  justify-center gap-10 items-center">
  <div className=" md:rounded-2xl rounded-lg  overflow-hidden mb-5 md:mb-0">
    <img src={Banner} alt="hello" />
  </div>

  <div className="md:rounded-2xl rounded-lg overflow-hidden mt-2 md:mt-0">
    <img src={Banner2} alt="hello" />
  </div>
</div> */}
<div className="overflow-hidden  md:px-28 px-4 py-5 md:py-14 mb-5 md:mb-0">
    <img src={Banner3} className=' rounded-2xl' alt="hello" />
  </div>
        <Footer />
    </div>
  )
}

export default Home