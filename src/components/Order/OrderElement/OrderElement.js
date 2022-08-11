import React, { useEffect, useState } from "react";
import s from "./OrderElement.module.scss";
import { useFetchVioletQuery } from "../../../api/violetsAPI";
import Preloader from "../../Preloader";
import { useDispatch } from "react-redux";
import { orderFormation, violetToTotalCost } from "../../../store/basketSlice";
import Row from "./Row";

const OrderElement = ({ item, handleDeleteVioletFromBasket }) => {
  const [arrayCosts, setArrayCosts] = useState({
    leaf: 0,
    baby: 0,
    starter: 0,
    adultViolet: 0,
  });
  const { data, error, isLoading } = useFetchVioletQuery(item);
  const violet = data && data.violet;
  const pricesLeaf =
    data && data.violet.pricesLeaf ? data.violet.pricesLeaf : 0;
  const pricesBaby =
    data && data.violet.pricesBaby ? data.violet.pricesBaby : 0;
  const pricesStarter =
    data && data.violet.pricesStarter ? data.violet.pricesStarter : 0;
  const pricesAdultViolet =
    data && data.violet.pricesAdultViolet ? data.violet.pricesAdultViolet : 0;

  const dispatch = useDispatch();

  const pushArrayCosts = (type, value) => {
    switch (type) {
      case "leaf":
        return setArrayCosts((prevState) => {
          return { ...prevState, leaf: value };
        });
      case "baby":
        return setArrayCosts((prevState) => {
          return { ...prevState, baby: value };
        });
      case "starter":
        return setArrayCosts((prevState) => {
          return { ...prevState, starter: value };
        });
      case "adultViolet":
        return setArrayCosts((prevState) => {
          return { ...prevState, adultViolet: value };
        });
      default:
        return setArrayCosts((prevState) => prevState);
    }
  };
  const calculateTotal = () => {
    return Object.values(arrayCosts).reduce((acc, value) => acc + value, 0);
  };

  useEffect(() => {
    const totalCost = calculateTotal();
    dispatch(violetToTotalCost({ [item]: totalCost }));
    dispatch(orderFormation({ [item]: { ...arrayCosts } }));
  }, [arrayCosts]);

  return (
    <div className={s.root}>
      {isLoading && <Preloader />}
      {error && <h3>{error}</h3>}
      {!error && !isLoading && data && (
        <>
          <div className={s.firstCell}>
            <h3>{violet.nameViolet}</h3>
            <div className={s.imgWrap}>
              <img src={violet.photo} alt={violet.nameViolet} />
            </div>
          </div>
          <div className={s.secondCell}>
            {data && data.violet.pricesLeaf !== 0 ? (
              <Row
                type="leaf"
                pricesUnits={pricesLeaf}
                pushArrayCosts={pushArrayCosts}
              />
            ) : (
              <div className={s.outOfStock}>листочков нет в наличии</div>
            )}
            {data && data.violet.pricesBaby !== 0 ? (
              <Row
                type="baby"
                pricesUnits={pricesBaby}
                pushArrayCosts={pushArrayCosts}
              />
            ) : (
              <div className={s.outOfStock}>деток нет в наличии</div>
            )}
            {data && data.violet.pricesStarter !== 0 ? (
              <Row
                type={"starter"}
                pricesUnits={pricesStarter}
                pushArrayCosts={pushArrayCosts}
              />
            ) : (
              <div className={s.outOfStock}>стартеров нет в наличии</div>
            )}
            {data && data.violet.pricesAdultViolet !== 0 ? (
              <Row
                type={"adultViolet"}
                pricesUnits={pricesAdultViolet}
                pushArrayCosts={pushArrayCosts}
              />
            ) : (
              <div className={s.outOfStock}>взрослых цветов нет в наличии</div>
            )}
          </div>
          <div className={s.thirdCell}>
            <button onClick={() => handleDeleteVioletFromBasket(item)}>
              x
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderElement;
