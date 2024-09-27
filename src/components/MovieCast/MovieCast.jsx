import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchCast } from "../../services/TMBDapi"
import Loader from "../Loader/Loader"

const MovieCast = () => {
const {movieId} = useParams()
const[cast,setCast] = useState([])
const [error,setError] = useState(false)
const [loading,setIsLoading] = useState(false)
useEffect(()=>{
  const getCast = async ()=>{

    try{
      const data = await fetchCast(movieId)
      setCast(data)
    }
    catch{
      setError(true)
    }
    finally{
      setIsLoading(false)
    }
  }
  getCast()
},[movieId])

  return (
    <div>
      <ul>
      {loading && <Loader/> }
      {error && <div>Something went wrong, please try again</div> }
        {cast.map(item=> <li key={item.cast_id}>
          <img src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`} alt="" />
          <p>{item.name}</p>
          <p>Character: {item.character}</p>
        </li>)}
      </ul>
    </div>
  )
}



export default MovieCast