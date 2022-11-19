import React, { useState } from "react";
import MovieItem from "./movie-item/MovieItem";
import MovieDetail from "./MovieDetail";
import styles from "./MoviesListCategories.module.css";

const MoviesListCategories = (props) => {
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
    const e = { ...d[i] };
    movieArray[i] = { ...e };
  }
  const bb = { ...a["fetchConfig"] };
  const cc = { ...bb.images };
  const dd = { ...cc.backdrop_sizes };
  /*===========GENRES ARRAY============*/
  const genres = {
    fetchTrending: "Xu hướng",
    fetchTopRated: "Xếp hạng cao",
    fetchActionMovies: "Hành động",
    fetchComedyMovies: "Hài",
    fetchHorrorMovies: "Kinh dị",
    fetchRomanceMovies: "Lãng mạn",
    fetchDocumentaries: "Tài liệu",
  };
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
      <h3>{genres[props.categorie]}</h3>
      <div className={styles["movie-list-items"]}>
        {/* SHOW MOVIE ITEM */}
        {movieArray.map((x) => {
          const p = { ...x };
          return p.backdrop_path ? (
            <MovieItem
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
      {showMovieDetail && <MovieDetail movieId={selecedtMovieId} />}
    </div>
  );
};

export default MoviesListCategories;
