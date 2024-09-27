import { Link, useLocation } from "react-router-dom"

const MovieList = ({movies}) => {

  const location = useLocation()
    
      return (
        <div>
          <ul>
            {movies.map(movie =>
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}  state={location}>
                <p> {movie.original_title}</p>
                </Link>
             </li>
            )}
          </ul>
        </div>
      )
}

export default MovieList