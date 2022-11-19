import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import styles from "./MovieDetailOriginal.module.css";

const MovieDetailOriginal = (props) => {
  /*===========STATE AND APIKEY============*/
  const [videoId, setVideoID] = useState("");
  const [backdropLink, setBackdropLink] = useState("");
  const [movieSelected, setMovieSelected] = useState({});
  const [error, setError] = useState(false);
  const baseUrl = "https://api.themoviedb.org/3";
  const apiKey = "748ac253470023678c66e35ea82c9bab";
  /*===========SEND REQUEST============*/
  useEffect(() => {
    const endPoint = `${baseUrl}/movie/${props.movieId}/videos?api_key=${apiKey}&`;
    const sendRequest = async (endPoint) => {
      try {
        const response = await fetch(endPoint);
        /*===========GET CONFIGURATION============*/
        const response2 = await fetch(
          "https://api.themoviedb.org/3/configuration?api_key=748ac253470023678c66e35ea82c9bab"
        );
        const response3 = await fetch(
          `${baseUrl}/movie/${props.movieId}?api_key=${apiKey}&`
        );
        /*==========CHECK ERROR=============*/
        if (!response.ok || !response2.ok || !response3) {
          setError(true);
          throw new Error("Error");
        }
        const videoData = await response.json();
        const configData = await response2.json();
        const movieData = await response3.json();
        /*==========CHECK BACKDROP IMAGE=============*/
        if (!movieData.backdrop_path) {
          setError(true);
          throw new Error("image not found");
        }
        setMovieSelected(movieData);
        /*============IF VIDEO NOT FOUND SHOW IMAGE===========*/
        for (let i = 0; i < videoData.results.length; i++) {
          if (
            videoData.results[i].site === "YouTube" &&
            videoData.results[i].type === "Trailer"
          ) {
            setVideoID(videoData.results[i].key);
            break;
          } else if (
            videoData.results[i].site === "YouTube" &&
            videoData.results[i].type === "Teaser"
          ) {
            setVideoID(videoData.results[i].key);
            break;
          } else {
            setBackdropLink(
              `${configData.images.base_url}${configData.images.backdrop_sizes[2]}${movieData.backdrop_path}`
            );
            break;
          }
        }
        /*============IF DO NOT HAVE VIDEO THEN SHOW IMAGE===========*/
        if (videoData.results.length === 0) {
          setBackdropLink(
            `${configData.images.base_url}${configData.images.backdrop_sizes[2]}${movieData.backdrop_path}`
          );
        }
      } catch (e) {
        console.log(e.messsage);
      }
    };
    sendRequest(endPoint);
    return () => {
      setVideoID("");
      setBackdropLink("");
      setMovieSelected({});
      setError(false);
    };
  }, [props.movieId]);
  /*==========YOUTUBE SETTING=============*/
  const opts = {
    height: "300",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };
  /*===========ROUND THE VOTE AVERAGE============*/
  const voteAverage = Number(movieSelected.vote_average).toFixed(1);
  return (
    <div className={styles["movie-detail"]}>
      {/* SHOW ERROR */}
      {error && (
        <div className={styles.error}>
          This movie not in database, please choose another movie
        </div>
      )}
      {/* SHOW VIDEO AND INFOMATION */}
      <div className={styles["movie-detail-info"]}>
        <h2>{movieSelected.original_title}</h2>
        <p>Release Date: {movieSelected.release_date}</p>
        <p>
          Vote:&nbsp;
          {movieSelected.vote_count}/{voteAverage}
        </p>
        <p className={styles.overview}>{movieSelected.overview}</p>
      </div>
      <div className={styles["movie-detail-video"]}>
        {backdropLink !== "" && <img src={backdropLink} alt="" />}
        {videoId !== "" && <YouTube videoId={videoId} opts={opts} />}
      </div>
    </div>
  );
};

export default MovieDetailOriginal;
