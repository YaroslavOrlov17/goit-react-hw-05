import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchReviews } from "../../services/TMBDapi"
import Loader from "../Loader/Loader"

const MovieReviews = () => {
const {movieId} = useParams()
const[reviews, setReviews] = useState([])
const [error,setError] = useState(false)
const [loading,setIsLoading] = useState(false)

useEffect(()=>{
  const getReviews = async()=> {
    try{
      const data = await fetchReviews(movieId)
      setReviews(data)
    }
    catch{
      setError(true)
    }
    finally{
      setIsLoading(false)
    }
    
  }
  getReviews()
},[movieId])

  return (
  <div>
    {loading && <Loader/> }
    {error && <div>Something went wrong, please try again</div> }
    <ul>
      {reviews.map(review => <li key={review.id}>
          <p>Author: {review.author}</p>
          <p>{review.content}</p>
      </li>)}
    </ul>
  </div>
  )
}

export default MovieReviews