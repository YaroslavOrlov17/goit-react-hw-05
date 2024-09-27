import { useEffect, useRef, useState } from "react"
import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom"
import { fetchMovieDetails } from "../../services/TMBDapi"
import Loader from "../../components/Loader/Loader"

const MovieDetailsPage = () => {
  const { movieId } = useParams()
  const [movieDetails, setMovieDetails] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setIsLoading] = useState(false)
  const location = useLocation()
  const backLink = useRef(location.state ?? "/movies")

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setError(false)
        setIsLoading(true)
        const data = await fetchMovieDetails(movieId)
        setMovieDetails(data)
      } catch {
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }
    getMovieDetails()
  }, [movieId])

  return (
    <div>
      <Link to={backLink.current}>Go back</Link>
      {loading && <Loader />}
      {error && <div>Something went wrong, please try again</div>}
      {movieDetails && (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
            alt={movieDetails.title}
          />
          <h3>{movieDetails.title}</h3>
          <p>Rating: {movieDetails.vote_average.toFixed(1)}</p>
          <p>Overview:{movieDetails.overview} </p>
          <p>Date: {movieDetails.release_date}</p>
          <ul>
            <h4>Genres</h4>
            {movieDetails.genres.map((genre) => (
              <li key={genre.id}>
                <span>{genre.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <hr />
      <div>
        <NavLink to="cast">Cast</NavLink>
        <NavLink to="reviews">Reviews</NavLink>
      </div>
      <Outlet />
    </div>
  )
}

export default MovieDetailsPage
