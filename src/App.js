import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import MainPage from "./pages/MainPage";
import VioletsPage from "./pages/VioletsPage";
import Order from "./components/Order";
import AuthPage from "./pages/AuthPage";
import AdminPage from "./pages/AdminPage";

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  console.log("App");
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="violets" element={<VioletsPage />} />

        <Route path="order" element={<Order />} />
        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Route>
      <Route path="login" exact element={<AuthPage />} />
      <Route path="admin" exact element={<AdminPage />} />
    </Routes>
  );
};

export default App;
