import React from "react";
import { Outlet, useMatch } from "react-router-dom";
import Header from "../Header";
//import Footer from "../Footer";

import s from "./Layout.module.scss";

const Layout = () => {
  const match = useMatch("/admin");

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
