import React, { useEffect } from "react";
import { Outlet, useMatch } from "react-router-dom";
import Header from "../Header";
import s from "./Layout.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { isTouchSelector, touch } from "../../store/appInitSlice";
import Footer from "../Footer";
import background from "./../../assets/img/background1.png";

const Layout = () => {
  const match = useMatch("/admin");
  const touchSelector = useSelector(isTouchSelector);
  const dispatch = useDispatch();
  const setTouchTrue = () => {
    if (!touchSelector.isTouch) {
      dispatch(touch(true));
    }
  };
  const setTouchFalse = () => {
    dispatch(touch(false));
  };
  const setTouchFalseDebounce = () => {
    if (touchSelector.isTouch) {
      setTimeout(setTouchFalse, 500);
    }
  };
  const style = {
    backgroundImage: `url(${background}`,
    backgroundPosition: "50% 50%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  useEffect(() => {
    window.addEventListener("touchstart", setTouchTrue);
    window.addEventListener("mouseover", setTouchFalseDebounce);
    return () => {
      window.removeEventListener("touchstart", setTouchTrue);
      window.removeEventListener("mouseover", setTouchFalseDebounce);
    };
  }, [touchSelector]);
  if (match) {
    return (
      <div className={s.root}>
        <Outlet />
      </div>
    );
  }

  return (
    <>
      <div className={s.root} style={style}></div>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
