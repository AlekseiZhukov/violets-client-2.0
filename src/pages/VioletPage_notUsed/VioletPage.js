import React, { useLayoutEffect } from "react";
import s from "../../components/VioletCard/VioletCard.module.scss";
import { useFetchVioletQuery } from "../../api/violetsAPI";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Preloader from "../../components/Preloader";

const VioletPage = () => {
  const { titleSlug } = useParams();
  const { pathname } = useLocation();
  const { data, error, isLoading } = useFetchVioletQuery(titleSlug);
  const navigate = useNavigate();
  if (error) {
    navigate("/");
  }
  console.log("VioletPage pathName: ", pathname);
  return (
    <div>
      <h1>Violet Page of </h1>
      {isLoading && <Preloader />}

      {data && <div>{data.violet.nameViolet}</div>}
    </div>
  );
};
export default VioletPage;
