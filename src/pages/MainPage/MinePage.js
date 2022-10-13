import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import VioletCards from "../../components/VioletCards";
import BenefitsViolets from "../../components/BenefitsViolets";
import StickySlider from "../../components/StickySlider";
import StickySliderMobile from "../../components/StickySliderMobile";
import { ReactComponent as Before } from "../../assets/img/before.svg";
import s from "./MinePage.module.scss";
import FeedbackForm from "../../components/FeedbackForm";
import ButtonToUp from "../../components/ButtonToUp";

const MinePage = () => {
  const [mobile, setMobile] = useState(null);
  const [showUp, setShowUp] = useState(false);
  const violetsTitle = useRef(null);
  const resizeScreen = useCallback((e) => {
    if (window.innerWidth <= 949) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, []);
  useLayoutEffect(() => {
    if (window.innerWidth <= 949) {
      setMobile(true);
    }
  }, [resizeScreen]);

  const showButtonUp = useCallback(() => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > window.innerWidth) {
      setShowUp(true);
    }
    if (scrolled <= window.innerWidth) {
      setShowUp(false);
    }
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", showButtonUp);
    return () => {
      window.removeEventListener("scroll", showButtonUp);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resizeScreen);
    return () => {
      window.removeEventListener("resize", resizeScreen);
    };
  }, []);

  return (
    <div className={s.root}>
      <div style={{ textAlign: "center" }}>
        <button
          className={s.buttonToBuy}
          onClick={() => {
            violetsTitle.current.scrollIntoView({
              block: "start",
              behavior: "smooth",
            });
          }}
        >
          купить фиалку
        </button>
        {mobile ? <StickySliderMobile /> : <StickySlider />}
      </div>

      <div className={s.versesBlock}>
        <div className={s.wrapSvg}>
          <Before />
        </div>

        <p className={s.wrapPoetry}>
          Чтоб в мир добавить красоты,
          <br />
          У меня цветут фиалки,
          <br /> Это - лучшие цветы !
        </p>
      </div>
      <section className={s.sectionViolets}>
        <h1 id="violets" ref={violetsTitle}>
          Доступно к продаже:
        </h1>

        <VioletCards />
      </section>

      <BenefitsViolets />

      <FeedbackForm />
      {mobile && showUp && <ButtonToUp />}
    </div>
  );
};
export default MinePage;
