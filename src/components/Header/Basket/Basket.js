import React from "react";
import s from "./Basket.module.scss";
import basket from "../../../assets/img/basket.svg";
import basketMobile from "../../../assets/img/basketMobile.svg";
import fullBasket from "../../../assets/img/fullBasket.svg";
import fullBasketMobile from "../../../assets/img/fullBasketMobile.svg";

const Basket = ({ count, mobile }) => {
  return (
    <>
      {count ? (
        <div className={s.basketWrap}>
          <img
            src={mobile ? fullBasketMobile : fullBasket}
            alt="full basket"
            className={s.basket}
          />
          <div className={s.count}>
            <p>{count}</p>
          </div>
        </div>
      ) : (
        <img
          src={mobile ? basketMobile : basket}
          alt="basket"
          className={s.basket}
        />
      )}
    </>
  );
};

export default Basket;
