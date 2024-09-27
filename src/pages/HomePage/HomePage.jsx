import { useEffect, useState } from "react"
import MovieList from "../../components/MovieList/MovieList"
import { fetchTrendingMovies } from "../../services/TMBDapi"
import Loader from "../../components/Loader/Loader"

const HomePage = () => {
  const[trendingMovies,setTrendingMovies] = useState([])
  const [error,setError] = useState(false)
  const [loading,setIsLoading] = useState(false)

  
  useEffect(()=>{
    const getMovies = async()=>{
    try{
      setError(false)
      setIsLoading(true)
      const data = await fetchTrendingMovies()
      setTrendingMovies(data)
    }
    catch{
      setError(true)
    }
    finally{
      setIsLoading(false)
    }}
  getMovies()
  },[])


  return (
    <div>
     <h2>Treanding today</h2>
     {loading && <Loader/> }
     {error && <div>Something went wrong, please try again</div> }
     <MovieList movies={trendingMovies} />
    </div>
  )
}

export default HomePage