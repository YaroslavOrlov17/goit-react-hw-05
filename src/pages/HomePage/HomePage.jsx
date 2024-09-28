import { useEffect, useState } from "react"
import MovieList from "../../components/MovieList/MovieList"
import { fetchTrendingMovies } from "../../services/TMBDapi"
import s from "./HomePage.module.css"

const HomePage = () => {
  const[trendingMovies,setTrendingMovies] = useState([])
  const [error,setError] = useState(false)

  
  useEffect(()=>{
    const getMovies = async()=>{
    try{
      setError(false)
      const data = await fetchTrendingMovies()
      setTrendingMovies(data)
    }
    catch{
      setError(true)
    }}
  getMovies()
  },[])


  return (
    <div>
     <h2 className={s.title}>Trending today</h2>
     {error && <div>Something went wrong, please try again</div> }
     <MovieList movies={trendingMovies} />
    </div>
  )
}

export default HomePage