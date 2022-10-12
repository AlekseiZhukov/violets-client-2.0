import React, { useState } from "react";
import cn from "classnames";
import { ReactComponent as Like } from "./assets/heart.svg";
import { useSelector } from "react-redux";
import s from "./VioletCard.module.scss";
import { ReactComponent as Search } from "../../assets/img/search.svg";
import { isTouchSelector } from "../../store/appInitSlice";
import Viewer from "react-viewer";
import ButtonInOutBasket from "../ButtonInOutBasket";

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
  const { pricesAdultViolet, pricesBaby, pricesLeaf, pricesStarter } = props;

  const handleClick = () => {
    onLikeClick && onLikeClick(titleSlug);
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
            <ButtonInOutBasket titleSlug={titleSlug} inBasket={inBasket} />

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
