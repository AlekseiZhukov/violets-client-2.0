import React from "react";
import s from "./Order.module.scss";
import OrderElement from "./OrderElement";

const Order = () => {
  return (
    <div className={s.root}>
      <h1>Корзина</h1>
      <div className={s.wrap}>
        <div className={s.tableOrder}>
          <OrderElement />
        </div>
        <div className={s.tableTotalOrder}></div>
      </div>
    </div>
  );
};

export default Order;
