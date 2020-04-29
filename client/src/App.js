import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import MovieUpdate from "./Movies/MovieUpdate";
import AddMovie from "./Movies/AddMovie";
import Movie from "./Movies/Movie";
import axios from "axios";

const App = (props) => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err.response));
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <div className="addMovieContainer">
          {" "}
          <h2>Add your own movie -</h2>{" "}
          <Link to="/add-movie">Add New Movie</Link>
        </div>
        <MovieList movies={movieList} />
      </Route>
      <Route path="/add-movie">
        <AddMovie
          {...props}
          setMovieList={setMovieList}
          movieList={movieList}
        />
      </Route>
      <Route
        path="/movies/:id"
        render={(props) => {
          return (
            <Movie
              {...props}
              addToSavedList={addToSavedList}
              setMovieList={setMovieList}
              movieList={movieList}
            />
          );
        }}
      ></Route>

      <Route
        path="/update-movie/:id"
        render={(props) => (
          <MovieUpdate
            {...props}
            setMovieList={setMovieList}
            movieList={movieList}
          />
        )}
      />
    </>
  );
};

export default App;
