import React, { useEffect, useLayoutEffect, useState } from "react";
import Menu from "./Menu";
import HeaderMobile from "./HeaderMobile";

import s from "./Header.module.scss";
import logoViolet from "../../assets/img/logoViolet.png";

const Header = () => {
  const [mobile, setMobile] = useState(null);

  const resizeScreen = (e) => {
    if (e.target.innerWidth <= 549) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };

  useLayoutEffect(() => {
    if (window.screen.width <= 549) {
      setMobile(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resizeScreen);
    return () => {
      window.removeEventListener("resize", resizeScreen);
    };
  }, []);

  return (
    <div className={s.root}>
      <div className={s.container}>
        {!mobile ? (
          <div className={s.nav}>
            <Menu />
          </div>
        ) : (
          <HeaderMobile />
        )}

        <div className={s.logoRow}>
          <img src={logoViolet} alt="logo" />
          <p>+7 908 235 36 47</p>
          <p>zhukova__elena@bk.ru</p>
        </div>
      </div>
    </div>
  );
};
export default Header;
