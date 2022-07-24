import React from "react";
import s from "./Basket.module.scss";
import basked from "../../../assets/img/basket.svg";
import baskedMobile from "../../../assets/img/basketMobile.svg";
import fullBasked from "../../../assets/img/fullBasket.svg";
import fullBaskedMobile from "../../../assets/img/fullBasketMobile.svg";

const Basket = ({ count, mobile }) => {
  return (
    <>
      {count ? (
        <div className={s.baskedWrap}>
          <img
            src={mobile ? fullBaskedMobile : fullBasked}
            alt="full basket"
            className={s.basked}
          />
          <div className={s.count}>
            <p>{count}</p>
          </div>
        </div>
      ) : (
        <img
          src={mobile ? baskedMobile : basked}
          alt="basket"
          className={s.basked}
        />
      )}
    </>
  );
};

export default Basket;
