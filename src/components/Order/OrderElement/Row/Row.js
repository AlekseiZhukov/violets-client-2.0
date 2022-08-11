import React, { useEffect, useState } from "react";
import cn from "classnames";
import s from "./Row.module.scss";
import { ReactComponent as Minus } from "./assets/minus.svg";
import { ReactComponent as Plus } from "./assets/plus.svg";
const Row = ({ type, pricesUnits, pushArrayCosts }) => {
  const [numberUnits, setNumberUnits] = useState(0);

  useEffect(() => {
    pushArrayCosts(type, numberUnits * pricesUnits);
  }, [numberUnits]);
  const switchType = (type) => {
    switch (type) {
      case "leaf":
        return "листочек";
      case "baby":
        return "детка";
      case "starter":
        return "стартер";
      case "adultViolet":
        return "взрослый цветок";
      default:
        return "фиалка";
    }
  };
  return (
    <div className={s.root}>
      <div>{switchType(type)}</div>
      <div
        className={cn(s.wrapChangeQuantityZone, {
          [s.notNull]: numberUnits > 0,
        })}
      >
        <button
          onClick={() =>
            setNumberUnits((prevState) =>
              prevState > 0 ? prevState - 1 : prevState
            )
          }
        >
          <Minus />
        </button>
        <span>{numberUnits}</span>
        <button onClick={() => setNumberUnits((prevState) => prevState + 1)}>
          <Plus />
        </button>
      </div>
      <div>{pricesUnits} &#8381;</div>
    </div>
  );
};

export default Row;
