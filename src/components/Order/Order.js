import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  basketSelector,
  dataForTotalCostSelector,
  violetWithOutBasket,
} from "../../store/basketSlice";
import OrderElement from "./OrderElement";
import s from "./Order.module.scss";
import CheckoutOrdering from "./CheckoutOrdering";

const Order = () => {
  const orderViolets = useSelector(basketSelector);
  const costsViolets = useSelector(dataForTotalCostSelector);
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteVioletFromBasket = (item) => {
    dispatch(violetWithOutBasket(item));
  };
  useEffect(() => {
    setTotal(
      costsViolets.reduce((acc, value) => acc + +Object.values(value), 0)
    );
  }, [costsViolets]);
  useEffect(() => {
    if (orderViolets.length === 0) {
      navigate("/");
    }
  }, [orderViolets]);

  return (
    <div className={s.root}>
      <h1>Корзина</h1>
      <div className={s.wrap}>
        <div className={s.tableOrder}>
          <h2 className={s.tableOrderHeader}>Фиалки в корзине:</h2>
          {orderViolets &&
            orderViolets.map((item) => (
              <div key={item}>
                <OrderElement
                  item={item}
                  handleDeleteVioletFromBasket={handleDeleteVioletFromBasket}
                />
              </div>
            ))}
        </div>
        <div className={s.tableTotalOrder}>
          <h3 className={s.tableOrderHeader}>Итого: {total} &#8381;</h3>
          <CheckoutOrdering />
          <p>После оформления заказа я с Вами свяжусь для уточнения деталей.</p>
        </div>
      </div>
    </div>
  );
};

export default Order;
