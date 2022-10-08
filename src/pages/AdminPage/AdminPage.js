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

const AdminPage = () => {
  const [createVioletMode, setCreateVioletMode] = useState(false);

  const dispatch = useDispatch();
  const isAuth = useSelector(authStatusSelector);
  const userData = useSelector(authDataSelector);

  const navigate = useNavigate();
  const { data, error, isLoading } = useFetchVioletsForAdminQuery();

  const handleShowCreateViolet = () => {
    setCreateVioletMode((prevState) => !prevState);
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);

  useEffect(() => {
    console.log("AdminPage useEffect error");
    if (error && error.data.message === "нет авторизации") {
      console.log("AdminPage useEffect error&&: ", error.data.message);
      sessionStorage.setItem(
        "adminData",
        JSON.stringify({ authData: { token: null } })
      );
      dispatch(cleanAuthState());
      navigate("/login");
    }
  }, [error]);

  return (
    <div>
      <h1>AdminPage</h1>

      {isLoading && <Preloader />}
      <button onClick={handleShowCreateViolet}>добавить фиалку</button>
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
