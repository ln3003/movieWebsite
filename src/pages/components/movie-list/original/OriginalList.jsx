import React, { useState } from "react";
import OriginalItem from "./movie-item/OriginalItem";
import MovieDetailOriginal from "./MovieDetailOriginal";
import styles from "./OriginalList.module.css";

const OriginalList = (props) => {
  /*==========STATE OF SELECTED MOVIE=============*/
  const [selecedtMovieId, setSelectedMovieId] = useState(0);
  const [showMovieDetail, setShowMovieDetail] = useState(false);
  /*=========COPY OBJECT==============*/
  const a = { ...props.items };
  const b = { ...a[props.categorie] };
  const c = { ...b.results };
  const d = { ...c };
  let movieArray = [];
  for (let i in d) {
    if (i < 9) {
      const e = { ...d[i] };
      movieArray[i] = { ...e };
    }
  }
  const bb = { ...a["fetchConfig"] };
  const cc = { ...bb.images };
  const dd = { ...cc.backdrop_sizes };
  /*===========IF CLICK OTHER MOVIE SHOW DETAIL OF OTHER MOVIE, IF CLICK MOVIE AGAIN CLOSE DETAIL BOX============*/
  const getMovieId = (movieId) => {
    if (movieId !== 0) {
      setShowMovieDetail(true);
      setSelectedMovieId(movieId);
    }
    if (movieId === selecedtMovieId) {
      setShowMovieDetail(false);
      setSelectedMovieId(0);
    }
  };
  return (
    <div className={styles["movie-list-categorie"]}>
      <div className={styles["movie-list-items"]}>
        {/* SHOW MOVIE ITEM */}
        {movieArray.map((x) => {
          const p = { ...x };
          return p.poster_path ? (
            <OriginalItem
              key={p.id}
              item={p}
              baseUrl={cc.base_url}
              backdropSizes={dd[0]}
              onGetMovieId={getMovieId}
            />
          ) : (
            ""
          );
        })}
      </div>
      {/* SHOW MOVIE DETAIL */}
      {showMovieDetail && <MovieDetailOriginal movieId={selecedtMovieId} />}
    </div>
  );
};

export default OriginalList;
