import React from "react";
import s from "./MinePage.module.scss";
import VioletCards from "../../components/VioletCards";

const MinePage = () => {
  return (
    <div className={s.root}>
      <h1>Slaider</h1>
      <VioletCards />
    </div>
  );
};
export default MinePage;
