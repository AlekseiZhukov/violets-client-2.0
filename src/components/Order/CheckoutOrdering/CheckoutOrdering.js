import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import { clearBasket, finishOrderSelector } from "../../../store/basketSlice";
import { telegramApi } from "../../../api/sendTelegramAPI";
import s from "./CheckoutOrdering.module.scss";
import { useNavigate } from "react-router-dom";

const CheckoutOrdering = () => {
  const user =
    localStorage.getItem("userVioletsSite") &&
    JSON.parse(localStorage.getItem("userVioletsSite"));
  const defaultValueTel = (user && user.tel) || "";
  const defaultValueName = (user && user.name) || "";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { tel: defaultValueTel, name: defaultValueName },
  });

  const [messageToUser, setMessageToUser] = useState("");
  const dispatch = useDispatch();
  const order = useSelector(finishOrderSelector);

  const navigate = useNavigate();
  const emptyValueTel = watch("tel", true).length === 0;
  const emptyValueName = watch("name", true).length === 0;

  const disabledSubmitButton = useMemo(() => {
    return (
      order &&
      Object.keys(order).length !== 0 &&
      Object.entries(order)
        .map((item) =>
          Object.values(item[1]).reduce((acc, item) => acc + item, 0)
        )
        .indexOf(0) !== -1
    );
  }, [order]);

  const onSubmit = (data) => {
    const orderDetails = Object.entries(order);

    const message = `
    Имя: ${data.name}\n\nТелефон: ${data.tel}\n\nЗаказ:${orderDetails.map(
      (item) =>
        `\n${item[0]}: ${Object.entries(item[1]).map((item) =>
          item[1] !== 0
            ? `
          ${item[0]} - ${item[1]}`
            : null
        )}`
    )}`;
    const dataForSend = {
      chat_id: "-521382689",
      parse_mode: "HTML",
      text: message,
    };

    localStorage.setItem("userVioletsSite", JSON.stringify(data));
    telegramApi.sentOrder(JSON.stringify(dataForSend)).then((res) => {
      if (res.ok) {
        setMessageToUser("Заказ оформлен!");
        setTimeout(() => {
          localStorage.setItem("violetsInBasket", "");
          dispatch(clearBasket());
          navigate("/");
        }, 3000);
      }
    });
  };

  return (
    <div className={s.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.inputModule}>
          <label>
            Ваше имя:<span>*</span>
          </label>
          <input
            className={cn({ [s.error]: errors.name })}
            placeholder="введите имя"
            {...register("name", { required: "обязательное поле" })}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div className={s.inputModule}>
          <label>
            Ваш телефон:<span>*</span>
          </label>
          <input
            className={cn({ [s.error]: errors.tel })}
            type="tel"
            placeholder="+7-xxx-xxx-xx-xx"
            {...register("tel", {
              pattern: {
                value:
                  /(8|\+7)[\-|\s]?[0-9]{3}[\-|\s]?[0-9]{3}[\-|\s]?[0-9]{2}[\-|\s]?[0-9]{2}/,
                message: "не корректный номер телефона",
              },
              required: "обязательное поле",
            })}
          />
          {errors.tel && <span>{errors.tel.message}</span>}
        </div>

        {!messageToUser && (
          <input
            value="Оформить заказ"
            type="submit"
            disabled={disabledSubmitButton || emptyValueTel || emptyValueName}
          />
        )}
      </form>
      {messageToUser && <div className={s.messageToUser}>{messageToUser}</div>}
    </div>
  );
};

export default CheckoutOrdering;
