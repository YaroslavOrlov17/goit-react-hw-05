import { Suspense, useEffect, useRef, useState } from "react"
import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom"
import { fetchMovieDetails } from "../../services/TMBDapi"
import Loader from "../../components/Loader/Loader"
import s from "./MovieDetailsPage.module.css"
import clsx from "clsx"
import { IoArrowBack } from "react-icons/io5";
const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";


const MovieDetailsPage = () => {

const {movieId} = useParams()
const [movieDetails,setMovieDetails] = useState(null)
const [error,setError] = useState(false)
const location = useLocation(); 
const backLink = useRef(location.state ?? '/movies'); 
useEffect(()=>{
  const getMovieDetails = async ()=>{
    try{
      setError(false)
      const data = await fetchMovieDetails(movieId)
      setMovieDetails(data)
    }
    catch{
      setError(true)
    }
  }
  getMovieDetails()
},[movieId])

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link,isActive && s.activeLink);
};

  return (
    <div className={s.allCardContent}>
    <Link className={s.goBackLink} to={backLink.current}><IoArrowBack />Go back</Link>
     {error && <div>Something went wrong, please try again</div> }
     {movieDetails && (
      <div className={s.mainDetailsCard}>
         <img className={s.cover} src={movieDetails.poster_path?`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`:defaultImg} alt={movieDetails.title} />

        <div className={s.infoWrapper}>
         <h3>{movieDetails.title}</h3>
         <div>
          <h4>Release Year:</h4>
          <p>{movieDetails.release_date ? movieDetails.release_date.slice(0, 4) : "Unknown"}</p>

         </div>

         <div>
         <h4>Rating:</h4>
         <p>{(movieDetails.vote_average).toFixed(1)}</p>
         </div>
         

         <div>
          <h4>Overview:</h4>
         <p>{movieDetails.overview} </p>
         </div>
         

         <ul className={s.genres}>
          <h4>Genres:</h4>
          {movieDetails.genres.map(genre=> <li key={genre.id}>
          <span>{genre.name}</span>
          </li>)}
         </ul>
       </div>

      </div>)}
      <div className={s.navLinks}>
        <NavLink className={buildLinkClass} to="cast">Cast</NavLink>
        <NavLink className={buildLinkClass} to="reviews">Reviews</NavLink>
      </div>
      <Suspense fallback={<Loader/>}>
      <Outlet/>
      </Suspense>
  </div>

  )
}

export default MovieDetailsPage
