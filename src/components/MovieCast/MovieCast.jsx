import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchCast } from "../../services/TMBDapi"
import s from "./MovieCast.module.css"

const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

const MovieCast = () => {
const {movieId} = useParams()
const[cast,setCast] = useState([])
const [error,setError] = useState(false)
useEffect(()=>{
  const getCast = async ()=>{

    try{
      setError(false)
      const data = await fetchCast(movieId)
      setCast(data)
    }
    catch{
      setError(true)
    }
  }
  getCast()
},[movieId])

  return (
    <div>
      <ul className={s.actorList}>
      {error && <div>Something went wrong, please try again</div> }
      {cast.length === 0 && !error && (
  <p>No cast information available for this movie.</p>
)}

        {cast.map(item=> <li className={s.actorCard} key={item.cast_id}>
          <img src={item.profile_path?(`https://image.tmdb.org/t/p/w500/${item.profile_path}`): defaultImg } alt="actor" />
          <p>{item.name}</p>
          <p>Character: {item.character}</p>
        </li>)}
      </ul>
    </div>
  )
}



export default MovieCast