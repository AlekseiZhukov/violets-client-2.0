import React from "react";
import s from "./ButtonInOutBasket.module.scss";
import { ReactComponent as Basket } from "../../assets/img/basketButton.svg";
import {
  violetToBasket,
  violetToTotalCost,
  violetWithOutBasket,
} from "../../store/basketSlice";
import { useDispatch, useSelector } from "react-redux";

const ButtonInOutBasket = ({ titleSlug, inBasket }) => {
  const dispatch = useDispatch();

  const handleClickButtonToBasket = () => {
    dispatch(violetToBasket(titleSlug));
  };
  const handleDeleteVioletInBasket = () => {
    dispatch(violetWithOutBasket(titleSlug));
    dispatch(violetToTotalCost({ [titleSlug]: 0 }));
  };

  return (
    <div className={s.buttonBaskedWrap}>
      {inBasket ? (
        <button className={s.active} onClick={handleDeleteVioletInBasket}>
          <Basket />
          <p>Убрать из корзины</p>
        </button>
      ) : (
        <button onClick={handleClickButtonToBasket}>
          <Basket />
          <p>В корзину</p>
        </button>
      )}
    </div>
  );
};

export default ButtonInOutBasket;
