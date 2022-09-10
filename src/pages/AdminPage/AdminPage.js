import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { authStatusSelector } from "../../store/authSlice";

const AdminPage = () => {
  const isAuth = useSelector(authStatusSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  });
  return <div>AdminPage</div>;
};

export default AdminPage;
