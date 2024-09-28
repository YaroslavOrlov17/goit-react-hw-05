import { Link, useLocation } from "react-router-dom"
import s from "./MovieList.module.css"

const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

const MovieList = ({movies}) => {

  const location = useLocation()

      return (
        <div className={s.wrapper}>
          <ul className={s.moviesList}>
            {movies.map(movie =>
              <li className={s.movieCard} key={movie.id}>
                <Link className={s.fullLink} to={`/movies/${movie.id}`}  state={location}>
                <img className={s.cover} src={movie.poster_path ?`https://image.tmdb.org/t/p/w500/${movie.poster_path}`:defaultImg} alt={movie.title} />
                <p className={s.title}> {movie.title}</p>
                <p className={s.year}>{movie.release_date &&`(${movie.release_date.slice(0,4)})`}</p>
                </Link>
             </li>
            )}
          </ul>
        </div>
      )
}

export default MovieList