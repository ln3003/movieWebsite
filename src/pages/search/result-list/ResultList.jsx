import React, { useEffect, useState } from "react";
import MovieDetailOriginal from "./ResultMovieDetail";
import styles from "./ResultList.module.css";
import ResultItem from "./movie-item/ResultItem";

const ResultList = (props) => {
  /*==========STATE OF SELECTED MOVIE=============*/
  const [selecedtMovieId, setSelectedMovieId] = useState(0);
  const [showMovieDetail, setShowMovieDetail] = useState(false);
  const [movieData, setMovieData] = useState({});
  const [baseUrl, setBaseUrl] = useState("");
  const [backdropSizes, setBackdropSizes] = useState("");
  const [loading, setLoading] = useState(false);
  //==========SEND REQUEST===========
  useEffect(() => {
    const query = props.keyWord;
    const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=748ac253470023678c66e35ea82c9bab&query=${query}`;
    const sendRequest = async (endPoint) => {
      try {
        const response = await fetch(endPoint);
        const response2 = await fetch(
          "https://api.themoviedb.org/3/configuration?api_key=748ac253470023678c66e35ea82c9bab"
        );
        const data = await response.json();
        const configData = await response2.json();
        if (data.results.length > 0) {
          setMovieData(data);
        }
        setBaseUrl(configData.images.base_url);
        setBackdropSizes(configData.images.backdrop_sizes[2]);
        setLoading(true);
      } catch (e) {
        console.log(e.messsage);
      }
    };
    sendRequest(endPoint);
    return () => {
      setMovieData({});
      setLoading(false);
    };
  }, [props.keyWord]);
  /*=========COPY OBJECT==============*/
  const a = { ...movieData.results };
  let movieArray = [];
  for (let i in a) {
    if (i < 20) {
      const e = { ...a[i] };
      movieArray[i] = { ...e };
    }
  }
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
      {/* SHOW ERROR */}
      {showMovieDetail && <MovieDetailOriginal movieId={selecedtMovieId} />}
      <h3>Search Results</h3>
      {/* SHOW LOADING */}
      {!loading && <div className={styles["loading"]}>Loading...</div>}
      <div className={styles["movie-list-items"]}>
        {/* SHOW MOVIE ITEM */}
        {movieArray.map((x) => {
          const p = { ...x };
          return p.poster_path ? (
            <ResultItem
              key={p.id}
              item={p}
              baseUrl={baseUrl}
              backdropSizes={backdropSizes}
              onGetMovieId={getMovieId}
            />
          ) : (
            ""
          );
        })}
      </div>
    </div>
  );
};

export default ResultList;
