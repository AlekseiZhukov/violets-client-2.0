import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./VioletCards.module.scss";
import { like, violetsCardTitleSlugSelector } from "../../store/violetsSlice";
import { violetToBasket, basketSelector } from "../../store/basketSlice";
import { useFetchAllVioletsQuery } from "../../api/violetsAPI";
import Preloader from "../Preloader";
import VioletCard from "../VioletCard";
import Paginator from "../Paginator/Paginator";
import SearchForm from "../SearchForm";

const VioletCards = () => {
  const [searchValue, setSearchValue] = useState("");
  const [page, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { data, error, isLoading } = useFetchAllVioletsQuery({
    page,
    searchValue,
  });
  const violetsCardsInBasket = useSelector(basketSelector);
  const violetsLikeCard = useSelector(violetsCardTitleSlugSelector);
  const currentPage = data && data.current;
  const pages = data && data.pages;

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
        {isLoading && (
          <div className={s.preloaderWrap}>
            <Preloader />
          </div>
        )}
        <div className={s.cardsWrapper}>
          {data &&
            !error &&
            !isLoading &&
            data.violetsCards.map(
              ({ titleSlug, nameViolet, photo, description, ...res }) => (
                <div key={titleSlug}>
                  <VioletCard
                    name={nameViolet}
                    titleSlug={titleSlug}
                    src={photo}
                    description={description}
                    isLike={violetsLikeCard[titleSlug]}
                    inBasket={
                      violetsCardsInBasket &&
                      violetsCardsInBasket.find((item) => item === titleSlug)
                    }
                    onLikeClick={handleLikeClickRedux}
                    onBasketClick={handleBasketClickRedux}
                    props={...res}
                  />
                </div>
              )
            )}
          {error && <p>нет совпадений</p>}
        </div>
        <div className={s.paginatorWrap}>
          {data !== null && !error && (
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
