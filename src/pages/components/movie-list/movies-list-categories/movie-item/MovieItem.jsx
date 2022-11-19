import React from "react";
import styles from "./MovieItem.module.css";

const MovieItem = (props) => {
  /*===========GET BACKDROP IMAGE LINK============*/
  const image = `${props.baseUrl}${props.backdropSizes}${props.item.backdrop_path}`;
  return (
    <div
      onClick={() => {
        // GET ID OF MOVIE WHEN CLICK
        props.onGetMovieId(props.item.id);
      }}
      className={styles["movie-item"]}
    >
      <img src={image} alt={props.title} />
    </div>
  );
};
export default MovieItem;
