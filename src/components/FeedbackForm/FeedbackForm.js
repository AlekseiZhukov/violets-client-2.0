import React, { useEffect, useState } from "react";
import s from "./FeedbackForm.module.scss";
import { useForm } from "react-hook-form";
import cn from "classnames";
import { telegramApi } from "../../api/sendTelegramAPI";
import { clearBasket } from "../../store/basketSlice";

const FeedbackForm = () => {
  const [messageToUser, setMessageToUser] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    console.log("FeedbackForm onSubmit data: ", data);

    const message = `Имя: ${data.name}\n\n Телефон: ${data.tel}\n\n Сообщеие:${data.message}`;

    const dataForSend = {
      chat_id: "-521382689",
      parse_mode: "HTML",
      text: message,
    };

    telegramApi.sentOrder(JSON.stringify(dataForSend)).then((res) => {
      if (res.ok) {
        setMessageToUser("Сообщение отправлено!");
        setTimeout(() => {
          reset({ name: "", tel: "", message: "" });
          setMessageToUser("");
        }, 3000);
      }
    });
  };

  return (
    <div className={s.feedbackFormWrapper}>
      <div className={s.feedbackFormWrapperBorder}>
        <h2>Напишите мне:</h2>
        <form className={s.formInner} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.inputModule}>
            <input
              className={cn({ [s.error]: errors.name })}
              placeholder="как к Вам обращаться?"
              {...register("name", { required: "обязательное поле" })}
            />
            {errors.name && <span>{errors.name.message}</span>}
          </div>
          <div className={s.inputModule}>
            <input
              className={cn({ [s.error]: errors.tel })}
              placeholder="оставьте номер телефона"
              {...register("tel", {
                required: "обязательное поле",
                pattern: {
                  value: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
                  message: "неверный формат телефона",
                },
              })}
            />
            {errors.tel && <span>{errors.tel.message}</span>}
          </div>
          <div className={s.inputModule}>
            <textarea
              className={cn({ [s.error]: errors.message })}
              placeholder="напишите сообщение"
              {...register("message", { required: "обязательное поле" })}
            />
            {errors.message && <span>{errors.message.message}</span>}
          </div>
          {messageToUser ? (
            <span>{messageToUser}</span>
          ) : (
            <div className={s.wrapperButtonBox}>
              <button type="submit">Отправить</button>

              <button
                type="button"
                onClick={() => {
                  reset({ name: "", tel: "", message: "" });
                }}
              >
                Отменить
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
