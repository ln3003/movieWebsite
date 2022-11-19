import React, { useEffect, useRef, useState } from "react";
import styles from "./NavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
library.add(faSearch);
const NavBar = () => {
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const componentMounted = useRef(true); // SET STATE OF MOUNT COMPONENT
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (componentMounted.current) {
        // IF COMPONENT IS MOUNTING
        setOffset(window.scrollY); //GET Y OFFSET
      }
    });
    return () => {
      componentMounted.current = false; //IF COMPONENT UNMOUNT STOP SET STATE
    };
  }, []);

  return (
    <div
      className={`${styles.navbar} ${
        offset > 100 && styles["black-background"]
      }`}
    >
      <p
        onClick={() => {
          navigate("/");
        }}
      >
        Movie App
      </p>
      <FontAwesomeIcon
        onClick={() => {
          navigate("/search");
        }}
        className={styles.icon}
        icon={["fas", "search"]}
      />
    </div>
  );
};

export default NavBar;
