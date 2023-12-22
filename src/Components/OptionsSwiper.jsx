import { SwiperSlide } from 'swiper/react';
// import stock_swiper_img1 from '../assets/stock_swiper_img1.png';
// import stock_swiper_img2 from '../assets/stock_swiper_img2.png';

import slide1_img from '../assets/slide1_img.png'
import slide2_img from '../assets/slide2_img.png'

import OptionsSwiperCard from './utils/reusables/StockSwiperCard';
import Swiperjs from './utils/reusables/Swiperjs';


const items = [
  '$0 commissions for stocks, ETFs, and options',
  'Intuitive tools and support for traders',
  'Discuss market trends with other investors',
];


const OptionsSwiper = () => {
  return (
    <>
      <Swiperjs>
        <SwiperSlide>
          <OptionsSwiperCard image={ slide1_img} items={items} />
        </SwiperSlide>
        <SwiperSlide>
          <OptionsSwiperCard image={ slide2_img} items={items} />
        </SwiperSlide>
      </Swiperjs>
    </>
  );
};

export default OptionsSwiper;
