import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import cn from "classnames";
import Menu from "./Menu";
import HeaderMobile from "./HeaderMobile";
import Basket from "./Basket";
import s from "./Header.module.scss";
import logoViolet from "../../assets/img/logoViolet.png";
import { useSelector } from "react-redux";
import { basketSelector } from "../../store/basketSlice";

const Header = () => {
  const [mobile, setMobile] = useState(null);
  const [small, setSmall] = useState(false);

  const borderBasket = useSelector(basketSelector);
  const countVioletsInBasket = Object.keys(borderBasket).length;
  const handleScrollY = useCallback((e) => {
    if (window.scrollY > 49) {
      setSmall(true);
    } else {
      setSmall(false);
    }
  }, []);

  const resizeScreen = useCallback((e) => {
    if (window.innerWidth <= 549) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollY);
    return () => {
      window.removeEventListener("scroll", handleScrollY);
    };
  }, [handleScrollY]);

  useLayoutEffect(() => {
    if (window.innerWidth <= 549) {
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
    <div className={cn(s.root, { [s.small]: small })}>
      <div className={s.container}>
        <div className={s.subContainer}>
          {!mobile ? (
            <>
              <div className={cn(s.mainWrap, { [s.small]: small })}>
                <div className={s.nav}>
                  <Menu />
                </div>
                <div className={s.basketWrap}>
                  <Basket
                    count={countVioletsInBasket && countVioletsInBasket}
                  />
                </div>
              </div>
              <div className={s.containerLogo}>
                <div className={s.logoRow}>
                  <img src={logoViolet} alt="logo" />
                  <p>г. Дзержинск</p>
                  <p>+7 908 235 36 47</p>
                  <p>zhukova__elena@bk.ru</p>
                </div>
              </div>
            </>
          ) : (
            <HeaderMobile />
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
