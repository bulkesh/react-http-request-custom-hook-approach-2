import { useRef } from 'react';
import classes from './AddMovie.module.css';
import useHttp from '../hooks/use-http';

const AddMovie = props => {
    const { isLoading, error, sendRequest: postMovies } = useHttp();
    const titleRef = useRef('');
    const openingTextRef = useRef('');
    const releseDateRef = useRef('');
    const onAddMovie = (e) => {
        e.preventDefault();
        const movie = {
            title: titleRef.current.value,
            openingText: openingTextRef.current.value,
            releaseDate: releseDateRef.current.value,
        }
        postMovies(
            {
                url: 'https://react-test-bk-default-rtdb.firebaseio.com/tasks/movie.json',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: movie
            },
            props.addMovie);
    }

    return (
        <form onSubmit={onAddMovie}>
            <div className={classes.control}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={titleRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor="openingText">Opening Text</label>
                <textarea rows='5' id="openingText" ref={openingTextRef} ></textarea>
            </div>
            <div className={classes.control}>
                <label htmlFor="releseDate">Relese Date</label>
                <input type="text" id="releseDate" ref={releseDateRef} />
            </div>
            <button type="submit">Add Movie</button>
        </form>
    )
}


export default AddMovie;
