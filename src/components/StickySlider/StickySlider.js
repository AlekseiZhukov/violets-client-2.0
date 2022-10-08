import React from "react";
import { useFetchVioletsForSliderQuery } from "../../api/violetsAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Zoom,
  Navigation,
  Pagination,
  A11y,
  EffectCoverflow,
  Autoplay,
} from "swiper";
import "swiper/scss";
import "swiper/scss/pagination";
import css from "./StickySlider.module.scss";
import "./swiper-castom.scss";
import Preloader from "../Preloader";

SwiperCore.use([Navigation, Pagination, A11y, EffectCoverflow, Autoplay, Zoom]);

const StickySlider = () => {
  const { data, error, isLoading } = useFetchVioletsForSliderQuery();

  if (isLoading) {
    return <Preloader />;
  }
  return (
    <div className={css.wrapperSection}>
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="coverflow"
        centeredSlides
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        spaceBetween={60}
        slidesPerView={3}
        initialSlide={2}
        loop
        pagination={{ clickable: true }}
        /*onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}*/
      >
        {data &&
          data.map((item) => (
            <SwiperSlide key={item._id}>
              <div
                style={{
                  backgroundImage: `url('/images/le-samocvety.jpeg`,
                  backgroundPosition: "50% 50%",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                className={css.slideSticky}
              >
                <h3>{item.nameViolet}</h3>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default StickySlider;
