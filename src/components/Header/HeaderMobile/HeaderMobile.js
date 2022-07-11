import React, { useState } from "react";
import Menu from "../Menu";
import cn from "classnames";
import s from "./HeaderMobile.module.scss";

const HeaderMobile = () => {
  const [mobileMenuActive, setMobileMenuActive] = useState(false);

  const onChangeMenuState = () => {
    setMobileMenuActive((prevState) => !prevState);
  };
  const handleClickLink = () => {
    setMobileMenuActive(false);
  };
  return (
    <div className={s.mobileNav}>
      <div className={s.mobileNavBand} />
      <div
        className={cn(s.menuButton, { [s.active]: mobileMenuActive })}
        onClick={onChangeMenuState}
      >
        <span />
      </div>
      <div className={cn(s.navItems, { [s.active]: mobileMenuActive })}>
        <Menu handleClickLink={handleClickLink} />
      </div>
    </div>
  );
};
export default HeaderMobile;
