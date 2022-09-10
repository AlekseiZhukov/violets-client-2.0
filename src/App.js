import React, { useCallback, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import MainPage from "./pages/MainPage";
import VioletsPage from "./pages/VioletsPage";
import ReviewsPage from "./pages/ReviewsPage";
import ContactsPage from "./pages/ContactsPage";
import Order from "./components/Order";
import AuthPage from "./pages/AuthPage";
import AdminPage from "./pages/AdminPage";

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/violets" element={<VioletsPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/order" element={<Order />} />
      </Route>
      <Route path="/login" element={<AuthPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<Navigate to={"/"} replace />} />
    </Routes>
  );
};

export default App;
