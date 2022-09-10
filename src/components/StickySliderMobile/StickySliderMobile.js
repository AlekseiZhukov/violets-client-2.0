import React from "react";
import { useFetchVioletsForSliderQuery } from "../../api/violetsAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay, EffectFade } from "swiper";
import "swiper/scss";
import "swiper/scss/effect-fade";
import "swiper/scss/pagination";
import "swiper/scss/navigation";
import css from "./StickySliderMobile.module.scss";
import "./swiper-castom-StickySliderMobile.scss";

SwiperCore.use([Navigation, Autoplay, EffectFade]);

const StickySliderMobile = () => {
  const { data, error, isLoading } = useFetchVioletsForSliderQuery();
  console.log("StickySlider data: ", data);

  return (
    <div className={css.wrapperSection}>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
        effect="fade"
        navigation
        loop
      >
        {data &&
          data.map((item) => (
            <SwiperSlide key={item._id}>
              <div
                style={{
                  backgroundImage: `url('/images/le-samocvety.jpeg')`,
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

export default StickySliderMobile;
