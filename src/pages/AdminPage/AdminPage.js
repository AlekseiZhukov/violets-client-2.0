import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  authDataSelector,
  authStatusSelector,
  cleanAuthState,
} from "../../store/authSlice";
import { useFetchVioletsForAdminQuery } from "../../api/violetsAPI";
import Preloader from "../../components/Preloader";
import ListViolets from "../../components/ListViolets";
import CreateViolet from "../../components/CreateViolet";
import s from "./AdminPage.module.scss";
import { useForm } from "react-hook-form";

const AdminPage = () => {
  console.log("AdminPage");
  const [createVioletMode, setCreateVioletMode] = useState(false);
  const [dataFilter, setDataFilter] = useState({ all: true });
  //const [availabilityForSlider, setAvailabilityForSlider] = useState("");

  const dispatch = useDispatch();
  const isAuth = useSelector(authStatusSelector);
  const userData = useSelector(authDataSelector);

  const navigate = useNavigate();
  const { data, error, isLoading } = useFetchVioletsForAdminQuery(dataFilter);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log("AdminPage filter onSubmit: ", data);
    setDataFilter(data);
  };
  const handleClickCancelFilter = () => {
    setDataFilter({ all: true });
    reset();
  };

  const handleShowCreateViolet = () => {
    setCreateVioletMode((prevState) => !prevState);
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);

  useEffect(() => {
    if (error && error.data.message === "нет авторизации") {
      sessionStorage.setItem(
        "adminData",
        JSON.stringify({ authData: { token: null } })
      );
      dispatch(cleanAuthState());
      navigate("/login");
    }
  }, [error]);

  return (
    <div className={s.root}>
      <h1>Администрирование</h1>

      {isLoading && <Preloader />}
      <button className={s.buttonAddViolet} onClick={handleShowCreateViolet}>
        добавить фиалку
      </button>
      <div className={s.filterWrap}>
        <h3>Фильтр:</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.checkboxWrap}>
            <div>
              <label>Доступна к продаже: </label>
              <input type={"checkbox"} {...register("availability")} />
            </div>
            <div>
              <label>Показать в слайдере: </label>
              <input type={"checkbox"} {...register("availabilityForSlider")} />
            </div>
          </div>
          <div className={s.buttonWrap}>
            <button type="submit">применить</button>
            <button type="button" onClick={handleClickCancelFilter}>
              сбросить
            </button>
          </div>
        </form>
      </div>
      {createVioletMode && (
        <CreateViolet
          closeCreateVioletModule={handleShowCreateViolet}
          userId={userData.userId}
        />
      )}

      {data && <ListViolets data={data.violetsCards} />}
    </div>
  );
};

export default AdminPage;
