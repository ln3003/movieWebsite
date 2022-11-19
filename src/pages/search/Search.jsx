import React, { useState } from "react";
import NavBar from "../components/nav-bar/NavBar";
import ResultList from "./result-list/ResultList";
import SearchForm from "./search-form/SearchForm";

const Search = () => {
  const [searchKey, setSearchKey] = useState({});
  const getKeyWord = (key) => {
    if (key) {
      setSearchKey(key);
    }
  };
  return (
    <div className="app">
      <NavBar />
      <SearchForm onReceiveKeyWord={getKeyWord} />
      <ResultList keyWord={searchKey} />
    </div>
  );
};

export default Search;
