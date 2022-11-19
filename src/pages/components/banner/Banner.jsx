import React, { useEffect, useState } from "react";
import styles from "./Banner.module.css";

const Banner = () => {
  /*===GET URL OF IMAGE====*/
  const [movieOnBanner, setmovieOnBanner] = useState({});
  const [baseUrl, setBaseUrl] = useState("");
  const [backdropSizes, setBackdropSizes] = useState("");
  /*===========SET END POINT============*/
  const endPoint =
    "https://api.themoviedb.org/3/discover/tv?api_key=748ac253470023678c66e35ea82c9bab&with_network=123";
  /*===========SEND REQUEST============*/
  useEffect(() => {
    let movieArray = [];
    const sendRequest = async (endPoint) => {
      try {
        const response = await fetch(endPoint);
        const response2 = await fetch(
          "https://api.themoviedb.org/3/configuration?api_key=748ac253470023678c66e35ea82c9bab"
        );
        const data = await response.json();
        const configData = await response2.json();
        movieArray = data.results;
        /*===========GET RANDOM MOVIE============*/
        const getRandomMovie = () => {
          return movieArray[Math.floor(Math.random() * movieArray.length - 1)];
        };
        /*===========SET IMAGE STATE============*/
        setmovieOnBanner(getRandomMovie());
        setBaseUrl(configData.images.base_url);
        setBackdropSizes(configData.images.backdrop_sizes[3]);
      } catch (e) {
        console.log(e.messsage);
      }
    };
    sendRequest(endPoint);
  }, []);
  /*===========BUILD THE IMAGE LINK============*/
  const backdropLink = `${baseUrl}${backdropSizes}${movieOnBanner.backdrop_path}`;

  return (
    <div className={styles.banner}>
      <img src={backdropLink} alt="" />
      <div className={styles.title}>
        <h1>{movieOnBanner.name}</h1>
        <button>Play</button>
        <button>My List</button>
        <p>{movieOnBanner.overview}</p>
      </div>
    </div>
  );
};

export default Banner;
