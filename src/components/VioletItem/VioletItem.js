import React, { useState } from "react";
import s from "./violetItem.module.scss";
import { ReactComponent as Edit } from "../../assets/img/editButton.svg";
import { ReactComponent as Delete } from "../../assets/img/deleteButton.svg";
import EditViolet from "../EditViolet";

const VioletItem = React.memo((props) => {
  const [editVioletMode, setEditVioletMode] = useState(false);
  const { onClickHandlerDelete, violet } = props;
  const handleShowEditViolet = () => {
    setEditVioletMode((prevState) => !prevState);
  };
  if (editVioletMode) {
    return (
      <EditViolet
        closeEditVioletModule={handleShowEditViolet}
        violetData={violet}
      />
    );
  }

  return (
    <>
      <div className={s.column1}>
        <h3>{violet.nameViolet}</h3>
        {violet.availability ? <p>В продаже</p> : <p>Нет в наличии</p>}
        {violet.availabilityForSlider ? (
          <p>Есть в слайдере</p>
        ) : (
          <p>Нет в слайдере</p>
        )}
        <img src={violet.photo} className={s.img} alt={"фото фиалки"} />
      </div>
      <div className={s.description}>
        <p>{violet.description}</p>
      </div>
      <div className={s.column3}>
        <div className={s.prices}>
          <p>Колличество:</p>
          <p> {violet.quantity}</p>
        </div>

        <h4>Цены:</h4>
        <div className={s.prices}>
          <p>Цена листочка:</p> <p> {violet.pricesLeaf}</p>
          <p>Цена стартера:</p>
          <p> {violet.pricesStarter}</p>
          <p>Цена детки:</p>
          <p> {violet.pricesBaby}</p>
          <p>Цена взрослого цветка:</p>
          <p> {violet.pricesAdultViolet}</p>
        </div>
      </div>
      <div className={s.column4}>
        <button onClick={handleShowEditViolet}>
          <Edit />
        </button>
        <button
          onClick={() => {
            onClickHandlerDelete(violet.titleSlug);
          }}
        >
          <Delete />
        </button>
      </div>
    </>
  );
});

export default VioletItem;
