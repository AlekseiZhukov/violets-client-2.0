import React, { useCallback, useEffect, useMemo, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import css from "./SearchForm.module.scss";
import { ReactComponent as Search } from "../../assets/img/search.svg";

const SearchForm = ({ onSearchValueChanged }) => {
  const [searchValue, setSearchValue] = useState("");

  const debouncedValue = useDebounce(searchValue, 1000);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleClick = () => {
    setSearchValue("");
  };
  const handleSearchValueChanged = useCallback(() => {
    onSearchValueChanged(debouncedValue);
  }, [debouncedValue, onSearchValueChanged]);

  useEffect(() => {
    handleSearchValueChanged();
  }, [debouncedValue]);

  return (
    <div className={css.wrapper}>
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="введите название фиалки"
      />

      <span
        className={css.searchIcon}
        onClick={() => onSearchValueChanged(searchValue)}
      >
        <Search />
      </span>

      {searchValue && <button onClick={handleClick}>x</button>}
    </div>
  );
};
export default SearchForm;
