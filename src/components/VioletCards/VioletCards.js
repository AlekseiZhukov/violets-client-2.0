import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./VioletCards.module.scss";

import {
  fetchViolets,
  like,
  violetsCardTitleSlugSelector,
  violetsDataSelector,
  violetsErrorSlugSelector,
  violetsIsLoadingSelector,
} from "../../store/violetsSlice";
import { violetToBasket, basketSelector } from "../../store/basketSlice";
import Preloader from "../Preloader";
import VioletCard from "../VioletCard";
import Paginator from "../Paginator/Paginator";
import SearchForm from "../SearchForm";

const VioletCards = () => {
  const [searchValue, setSearchValue] = useState("");
  const [page, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const violetsCardsInBasket = useSelector(basketSelector);
  const violetsLoadingData = useSelector(violetsIsLoadingSelector);
  const violetsData = useSelector(violetsDataSelector);
  const violetsLikeCard = useSelector(violetsCardTitleSlugSelector);
  const violetsError = useSelector(violetsErrorSlugSelector);

  const currentPage = violetsData && violetsData.current;
  const pages = violetsData && violetsData.pages;

  const handleLikeClickRedux = (titleSlug) => {
    dispatch(like(titleSlug));
  };
  const handleBasketClickRedux = (titleSlug) => {
    dispatch(violetToBasket(titleSlug));
  };
  const handlerPageChanged = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  useEffect(() => {
    dispatch(fetchViolets({ page: page, searchValue: searchValue }));
  }, [page, searchValue]);

  useEffect(() => {
    localStorage.setItem("likedViolet", JSON.stringify(violetsLikeCard));
  }, [violetsLikeCard]);

  useEffect(() => {
    localStorage.setItem(
      "violetsInBasket",
      JSON.stringify(violetsCardsInBasket)
    );
  }, [violetsCardsInBasket]);

  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1 className={s.title}>Доступно к продаже:</h1>
        <div className={s.searchWrap}>
          <SearchForm onSearchValueChanged={handleSearch} />
        </div>
        {violetsLoadingData && (
          <div className={s.preloaderWrap}>
            <Preloader />
          </div>
        )}
        <div className={s.cardsWrapper}>
          {violetsData !== null &&
            !violetsError &&
            !violetsLoadingData &&
            violetsData.violetsCards.map(
              ({ titleSlug, nameViolet, photo, description }) => (
                <div key={titleSlug}>
                  <VioletCard
                    name={nameViolet}
                    titleSlug={titleSlug}
                    src={photo}
                    description={description}
                    isLike={violetsLikeCard[titleSlug]}
                    inBasket={violetsCardsInBasket[titleSlug]}
                    onLikeClick={handleLikeClickRedux}
                    onBasketClick={handleBasketClickRedux}
                  />
                </div>
              )
            )}
          {violetsError && <p>такой фиалки не найдено</p>}
        </div>
        <div className={s.paginatorWrap}>
          {violetsData !== null && !violetsError && (
            <Paginator
              currentPage={currentPage}
              onPageChanged={handlerPageChanged}
              pagesCount={pages}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VioletCards;
