import React, { useState } from "react";
import style from "./Paginator.module.css";

const Paginator = ({
  currentPage,
  onPageChanged,
  pagesCount,
  portionSize = 10,
}) => {
  //считаем колличество страниц
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  //считаем колличество блоков страниц и крайние номера страниц в блоке
  const portionCount = Math.ceil(pagesCount / portionSize);
  const [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div>
      <span className={style.string}>стр.:</span>
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(1);
          }}
        >
          на первую страницу
        </button>
      )}
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          назад
        </button>
      )}
      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((p) => {
          return (
            <span
              key={p}
              className={
                +currentPage === p ? style.selectedPage : style.numberPage
              }
              onClick={(event) => {
                onPageChanged(p);
              }}
            >
              {p}
            </span>
          );
        })}
      {portionNumber < portionCount && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          вперед
        </button>
      )}
      {portionNumber < portionCount && (
        <button
          onClick={() => {
            setPortionNumber(portionCount);
          }}
        >
          на последнюю страницу
        </button>
      )}
    </div>
  );
};

export default Paginator;
