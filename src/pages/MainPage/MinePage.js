import React, { useEffect } from "react";
import s from "./MinePage.module.scss";
import VioletCards from "../../components/VioletCards";
import { useDispatch, useSelector } from "react-redux";

const MinePage = () => {
  return (
    <div className={s.root}>
      <h1>Новости</h1>
      <h1>Slaider</h1>
      <VioletCards />
      <h1>Преимущества фиалок</h1>
      <h1>Отзывы</h1>
      <h1>Форма обратной связи</h1>
      <h1>Контакты</h1>
      <h1>Футер</h1>
    </div>
  );
};
export default MinePage;
