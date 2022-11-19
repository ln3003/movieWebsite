import React, { useRef } from "react";
import styles from "./SearchForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// =========ADD ICON INTO LIBRARY==========
library.add(faSearch);

const SearchForm = (props) => {
  const inputRef = useRef();
  // =========SEND KEYWORD WHEN CLICK SEARCH BUTTON==========
  const searchHandle = () => {
    const query = inputRef.current.value;
    props.onReceiveKeyWord(query);
  };

  const resetHandle = () => {
    inputRef.current.value = "";
  };
  // ========SEND KEYWORD WHEN PRESS ENTER===========
  const keyDownHandle = (e) => {
    if (e.key === "Enter") {
      const query = inputRef.current.value;
      props.onReceiveKeyWord(query);
    }
  };

  return (
    <div onKeyDown={keyDownHandle} className={styles.search}>
      <div className={styles["search-form"]}>
        <input ref={inputRef} type="text" placeholder="Search movie here" />
        <FontAwesomeIcon className={styles.icon} icon={["fas", "search"]} />
        <div className={styles.btn}>
          <p onClick={resetHandle}>RESET</p>
          <button onClick={searchHandle}>SEARCH</button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
