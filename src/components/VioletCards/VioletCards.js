import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./VioletCards.module.scss";

import {
  fetchViolets,
  like,
  likedViolets,
  violetsCardTitleSlugSelector,
  violetsDataSelector,
  violetsIsLoadingSelector,
} from "../../store/violetsSlice";
import Preloader from "../Preloader";
import VioletCard from "../VioletCard";

const VioletCards = () => {
  const dispatch = useDispatch();

  const violetsLoadingData = useSelector(violetsIsLoadingSelector);
  const violetsData = useSelector(violetsDataSelector);
  const violetsTitleSlugSelector = useSelector(violetsCardTitleSlugSelector);
  const handleLikeClickRedux = (titleSlug) => {
    dispatch(like(titleSlug));
  };
  useLayoutEffect(() => {
    const likedVioletsStorage = JSON.parse(localStorage.getItem("likedViolet"));
    dispatch(likedViolets(likedVioletsStorage));
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "likedViolet",
      JSON.stringify(violetsTitleSlugSelector)
    );
  }, [violetsTitleSlugSelector]);

  useEffect(() => {
    dispatch(fetchViolets(1));
  }, []);

  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>Строка поиска</h1>
        <h1 className={s.title}>Доступные фиалки к продаже: </h1>
        <p>стр: {violetsData && violetsData.current}</p>
        {violetsLoadingData && <Preloader />}
        <div className={s.cardsWrapper}>
          {violetsData !== null &&
            violetsData.violetsCards.map(
              ({ titleSlug, nameViolet, photo, description }) => (
                <div key={titleSlug}>
                  <VioletCard
                    name={nameViolet}
                    titleSlug={titleSlug}
                    src={photo}
                    description={description}
                    isLike={violetsTitleSlugSelector[titleSlug]}
                    onLikeClick={handleLikeClickRedux}
                  />
                </div>
              )
            )}
        </div>

        <h1>Пагинатор</h1>
      </div>
    </div>
  );
};

export default VioletCards;
