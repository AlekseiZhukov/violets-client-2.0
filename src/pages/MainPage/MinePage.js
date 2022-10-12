import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import VioletCards from "../../components/VioletCards";
import BenefitsViolets from "../../components/BenefitsViolets";
import StickySlider from "../../components/StickySlider";
import StickySliderMobile from "../../components/StickySliderMobile";
import { ReactComponent as Before } from "../../assets/img/before.svg";
import s from "./MinePage.module.scss";
import FeedbackForm from "../../components/FeedbackForm";

const MinePage = () => {
  const [mobile, setMobile] = useState(null);
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

  useEffect(() => {
    window.addEventListener("resize", resizeScreen);
    return () => {
      window.removeEventListener("resize", resizeScreen);
    };
  }, []);
  return (
    <div className={s.root}>
      {mobile ? <StickySliderMobile /> : <StickySlider />}
      <a href="#violets">Приступить к пакупке</a>
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
        <a name="violets">
          <h1>Доступно к продаже:</h1>
        </a>
        <VioletCards />
      </section>

      <BenefitsViolets />

      <FeedbackForm />
    </div>
  );
};
export default MinePage;
