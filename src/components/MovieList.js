import Movie from './Movie';
import classes from './MovieList.module.css';
const MovieList = props => {
    const movies = props.movies;
    return (
        <ul className={classes['movies-list']}>
            {
                movies.map((movie,index) => (
                    <Movie
                        key={index}
                        movie={movie}
                    />
                ))}
        </ul>
    )

}

export default MovieList;