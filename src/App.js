import React, { Fragment, useCallback, useEffect, useState } from 'react';
import './App.css';
import AddMovie from './components/AddMovie';
import MovieList from './components/MovieList';
import ErrorBoundary from './error/errorBoundary';
import useHttp from './hooks/use-http';

const App = () => {
  const [movies, setMovies] = useState([]);
  const { isLoading, error, sendRequest: fetchMovies } = useHttp();
  const fetchMovieHandler = useCallback((data) => {
    let moviesArr = [];
    for (let key in data) {
      let movie = {
        openingText: data[key].openingText,
        releaseDate: data[key].releaseDate,
        title: data[key].title,
        id: key
      }
      moviesArr = [...moviesArr, movie]
    }
    console.log(moviesArr);
    setMovies(moviesArr);
  }, []);

  const makeMovieCallback = useCallback(() => {
    fetchMovies(
      { url: 'https://react-test-bk-default-rtdb.firebaseio.com/tasks/movie.json' },
      fetchMovieHandler)
  }, [fetchMovies, fetchMovieHandler]);

  useEffect(() => {
    console.log("App use effect");
    makeMovieCallback();
  }, [makeMovieCallback]);

  const addMoviehandler = useCallback(async (data) => {
    console.log("movies added...",data);
    
  }, []);

  const getMovieHandler = useCallback(() => {
    makeMovieCallback();
  }, [makeMovieCallback]);


  let content = <p>Found No Movies.</p>
  if (movies.length > 0) {
    content = <MovieList movies={movies} />
  }
  if (isLoading) {
    content = <h2>Loading movies....</h2>
  }
  if (error) {
    content = <h2>{error}</h2>
  }
  return (
    <Fragment>
      <section>
        <AddMovie addMovie={addMoviehandler} />
      </section>
      <section>
        <button onClick={getMovieHandler}>Fetch Movies</button>
      </section>
      <section> {content} </section>
    </Fragment>

  );
}

export default React.memo(App);
