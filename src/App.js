import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import MainPage from "./pages/MainPage";
import VioletsPage from "./pages/VioletsPage";
import ReviewsPage from "./pages/ReviewsPage";
import ContactsPage from "./pages/ContactsPage";

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
      </Route>
      <Route path="*" element={<Navigate to={"/"} replace />} />
    </Routes>
  );
};

export default App;
