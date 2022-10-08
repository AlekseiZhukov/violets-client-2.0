import React, { useState } from "react";
import cn from "classnames";
import { ReactComponent as Like } from "./assets/heart.svg";
import { ReactComponent as Basket } from "../../assets/img/basket.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  violetToBasket,
  violetToTotalCost,
  violetWithOutBasket,
} from "../../store/basketSlice";
import s from "./VioletCard.module.scss";
import { ReactComponent as Search } from "../../assets/img/search.svg";

import { isTouchSelector } from "../../store/appInitSlice";

import Viewer from "react-viewer";

const VioletCard = ({
  name,
  titleSlug,
  src,
  description,
  isLike,
  inBasket,
  onLikeClick,
  props,
}) => {
  const [visible, setVisible] = useState(false);
  const touchSelector = useSelector(isTouchSelector);
  const dispatch = useDispatch();
  const { pricesAdultViolet, pricesBaby, pricesLeaf, pricesStarter } = props;

  const handleClick = () => {
    onLikeClick && onLikeClick(titleSlug);
  };
  const handleClickButtonToBasket = () => {
    dispatch(violetToBasket(titleSlug));
  };
  const handleDeleteVioletInBasket = () => {
    dispatch(violetWithOutBasket(titleSlug));
    dispatch(violetToTotalCost({ [titleSlug]: 0 }));
  };

  return (
    <>
      <Viewer
        noNavbar
        scalable={false}
        loop={false}
        showTotal={false}
        visible={visible}
        resolution-visibility={false}
        onClose={() => {
          setVisible(false);
        }}
        onMaskClick={() => setVisible(false)}
        images={[{ src: src, alt: name }]}
      />
      <div
        className={cn(s.root, {
          [s.touch]: touchSelector.isTouch,
          [s.noTouch]: !touchSelector.isTouch,
        })}
      >
        <img src={src} alt={name} className={s.cardImage} />
        <div className={s.cardDetails}>
          <h2 className={s.cardName}>{name}</h2>
          <p className={s.cardDescription}>{description}</p>

          <table>
            <tbody>
              <tr>
                <th>листочек</th>
                <th>детка</th>
                <th>стартер</th>
                <th>взрослый цветок</th>
              </tr>
              <tr>
                <td>{pricesLeaf} &#x20bd;</td>
                <td>{pricesBaby} &#x20bd;</td>
                <td>{pricesStarter} &#x20bd;</td>
                <td>{pricesAdultViolet} &#x20bd;</td>
              </tr>
            </tbody>
          </table>

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
                <button
                  className={s.active}
                  onClick={handleDeleteVioletInBasket}
                >
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
            <div className={s.wrapButtonVisible}>
              <button
                onClick={() => {
                  setVisible(true);
                }}
              >
                <Search />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VioletCard;
