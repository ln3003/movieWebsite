import React, { useEffect, useState } from "react";
import styles from "./MovieList.module.css";
import MoviesListCategories from "./movies-list-categories/MoviesListCategories";
import OriginalList from "./original/OriginalList";
// =======SET BASE URL AND API KEY========
const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "748ac253470023678c66e35ea82c9bab";

const MovieList = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  // =========SEND REQUESTS==========
  useEffect(() => {
    const endPoints = {
      fetchTrending: `${baseUrl}/trending/all/week?api_key=${apiKey}&with_network=123`,
      fetchNetflixOriginals: `${baseUrl}/discover/tv?api_key=${apiKey}&with_network=123`,
      fetchTopRated: `${baseUrl}/movie/top_rated?api_key=${apiKey}&language=en-US`,
      fetchActionMovies: `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=28`,
      fetchComedyMovies: `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=35`,
      fetchHorrorMovies: `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=27`,
      fetchRomanceMovies: `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=10749`,
      fetchDocumentaries: `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=99`,
      fetchConfig: `${baseUrl}/configuration?api_key=${apiKey}`,
    };
    const sendRequest = async (endPoints) => {
      let dataObj = {};
      try {
        for (let key in endPoints) {
          const response = await fetch(endPoints[key]);
          const dataJson = await response.json();
          // =========STORE ALL REQUEST IN OBJECTT==========
          dataObj[key] = dataJson;
        }
        setData(dataObj);
        setLoading(true);
      } catch (e) {
        console.log(e.messsage);
      }
    };
    sendRequest(endPoints);
  }, []);
  return (
    <div className={styles["movie-list"]}>
      {!loading && <div className={styles["loading"]}>Loading...</div>}
      <OriginalList items={data} categorie={"fetchNetflixOriginals"} />
      <MoviesListCategories items={data} categorie={"fetchTrending"} />
      <MoviesListCategories items={data} categorie={"fetchTopRated"} />
      <MoviesListCategories items={data} categorie={"fetchActionMovies"} />
      <MoviesListCategories items={data} categorie={"fetchComedyMovies"} />
      <MoviesListCategories items={data} categorie={"fetchHorrorMovies"} />
      <MoviesListCategories items={data} categorie={"fetchRomanceMovies"} />
      <MoviesListCategories items={data} categorie={"fetchDocumentaries"} />
    </div>
  );
};

export default MovieList;
