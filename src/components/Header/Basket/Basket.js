import React from "react";
import s from "./Basket.module.scss";
import basked from "../../../assets/img/basket.svg";
import baskedMobile from "../../../assets/img/basketMobile.svg";
import fullBasked from "../../../assets/img/fullBasket.svg";
import fullBaskedMobile from "../../../assets/img/fullBasketMobile.svg";
import { useNavigate } from "react-router-dom";

const Basket = ({ count, mobile }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/order");
  };
  return (
    <>
      {count ? (
        <div className={s.baskedWrap} onClick={handleClick}>
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
