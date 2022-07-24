import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

import s from "./VioletCard.module.scss";

import { ReactComponent as Like } from "./assets/heart.svg";
import { ReactComponent as Basket } from "../../assets/img/basket.svg";
import { useDispatch } from "react-redux";
import { violetToBasket, violetWithOutBasket } from "../../store/basketSlice";

const VioletCard = ({
  name,
  titleSlug,
  src,
  description,
  isLike,
  inBasket,
  onLikeClick,
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    onLikeClick && onLikeClick(titleSlug);
  };
  const handleClickButtonToBasket = () => {
    dispatch(violetToBasket(titleSlug));
  };
  const handleDeleteVioletInBasket = () => {
    dispatch(violetWithOutBasket(titleSlug));
  };

  return (
    <div className={s.root}>
      <img src={src} alt={name} className={s.cardImage} />
      <div className={s.cardDetails}>
        <h2 className={s.cardName}>{name}</h2>

        <p className={s.cardDescription}>{description}</p>
        <div className={s.cardMeta}>
          <div
            onClick={handleClick}
            className={cn(s.like, {
              [s.active]: isLike,
            })}
          >
            <Like />
          </div>
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
          <div>
            <Link to={`/characters/${titleSlug}`}>подробнее...</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VioletCard;
