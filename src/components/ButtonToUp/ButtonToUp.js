import React, { useCallback, useEffect, useState } from "react";
import s from "./ButtonToUp.module.scss";

const ButtonToUp = () => {
  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button className={s.buttonToUp} onClick={handleScroll}>
      UP
    </button>
  );
};

export default ButtonToUp;
