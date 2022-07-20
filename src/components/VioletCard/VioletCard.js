import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

import s from "./VioletCard.module.scss";

import { ReactComponent as Like } from "./assets/heart.svg";

const VioletCard = ({
  name,
  titleSlug,
  src,
  description,
  isLike,
  onLikeClick,
}) => {
  const handleClick = () => {
    onLikeClick && onLikeClick(titleSlug);
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
          <div>
            <Link to={`/characters/${titleSlug}`}>подробнее...</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VioletCard;
