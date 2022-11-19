import React from "react";
import Banner from "../components/banner/Banner";
import MovieList from "../components/movie-list/MovieList";
import NavBar from "../components/nav-bar/NavBar";

function Browse() {
  return (
    <div className="app">
      <NavBar />
      <Banner />
      <MovieList />
    </div>
  );
}

export default Browse;
