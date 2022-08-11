import React, { useEffect } from "react";
import { Outlet, useMatch } from "react-router-dom";
import Header from "../Header";
//import Footer from "../Footer";

import s from "./Layout.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { isTouchSelector, touch } from "../../store/appInitSlice";

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
      <>
        <Outlet />
      </>
    );
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
