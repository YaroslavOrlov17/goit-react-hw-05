import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchReviews } from "../../services/TMBDapi"
import { BsPersonCircle } from "react-icons/bs";
import s from "./MovieReviews.module.css"

const MovieReviews = () => {
const {movieId} = useParams()
const[reviews, setReviews] = useState([])
const [error,setError] = useState(false)

useEffect(()=>{
  const getReviews = async()=> {
    try{
      setError(false)
      const data = await fetchReviews(movieId)
      setReviews(data)
    }
    catch{
      setError(true)
    }
  }
  getReviews()
},[movieId])

  return (
  <div>
    {error && <div>Something went wrong, please try again</div> }
    <ul className={s.commentList}>
      {reviews.map(review => <li className={s.commentBox} key={review.id}>
        <BsPersonCircle className={s.avatar} />
        <div>
          <p className={s.author}>{review.author}</p>
          <p>{review.content}</p>
        </div>
      </li>)}
    </ul>
  </div>
  )
}

export default MovieReviews