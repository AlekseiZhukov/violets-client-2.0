import React, { useState } from "react";
import s from "./ListViolets.module.scss";
import VioletItem from "../VioletItem";
import { useDeleteVioletMutation } from "../../api/violetsAPI";

const ListViolets = ({ data }) => {
  const [del, { error, data: dataDel }] = useDeleteVioletMutation();

  return (
    <div>
      {data.map((violet, index) => (
        <div key={violet.titleSlug} className={s.violetItem}>
          <span className={s.index}>{index + 1}</span>
          <VioletItem
            onClickHandlerDelete={() => {
              del(violet.titleSlug);
            }}
            violet={violet}
          />
        </div>
      ))}
    </div>
  );
};

export default ListViolets;
