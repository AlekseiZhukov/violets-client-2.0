import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import s from "./AuthPage.module.scss";
import cn from "classnames";
import {
  authErrorSelector,
  authStatusSelector,
  fetchAuth,
} from "../../store/authSlice";

const AuthPage = () => {
  const error = useSelector(authErrorSelector);
  const isAuth = useSelector(authStatusSelector);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data) => {

    dispatch(fetchAuth(data));
  };
  useEffect(() => {
    if (isAuth) {
      navigate("/admin");
    }
  }, [isAuth]);

  return (
    <div className={s.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.inputModule}>
          <label>Login: </label>
          <input
            className={cn({ [s.error]: errors.name })}
            placeholder="введите name"
            {...register("name", { required: "обязательное поле" })}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div className={s.inputModule}>
          <label>Password: </label>
          <input
            className={cn({ [s.error]: errors.password })}
            type="password"
            placeholder="введите password"
            {...register("password", { required: "обязательное поле" })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <input value="авторизация" type="submit" />
      </form>
      {error && <div className={s.messageToUser}>{error}</div>}
    </div>
  );
};
export default AuthPage;
