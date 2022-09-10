import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import s from "./MinePage.module.scss";
import VioletCards from "../../components/VioletCards";
import { useDispatch, useSelector } from "react-redux";
import BenefitsViolets from "../../components/BenefitsViolets";
import StickySlider from "../../components/StickySlider";
import StickySliderMobile from "../../components/StickySliderMobile";

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
      <h3>
        Чтобы в этот мир добавить
        <br /> Хоть немного красоты -<br /> У меня цветут фиалки,
        <br /> Это - лучшие цветы!
      </h3>
      <BenefitsViolets />
      <VioletCards />

      <h1>Отзывы</h1>
      <h1>Форма обратной связи</h1>
      <h1>Контакты</h1>
    </div>
  );
};
export default MinePage;
