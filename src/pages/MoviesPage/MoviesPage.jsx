import { useEffect, useState } from "react"
import MovieList from "../../components/MovieList/MovieList"
import SearchForm from "../../components/SearchForm/SearchForm"
import { useSearchParams } from "react-router-dom"
import { fetchMoviesByQuery } from "../../services/TMBDapi"
import Loader from "../../components/Loader/Loader"

const MoviesPage = () => {
const [movies,setMovies] = useState([])
const [searchParams, setSearchParams] = useSearchParams()
const [error,setError] = useState(false)
const [loading,setIsLoading] = useState(false)


useEffect(()=>{
  const query = searchParams.get("query")
  if(!query){
    return
  }

  const getMovies = async()=> {
    try{
      setError(false)
      setIsLoading(true)
      const data = await fetchMoviesByQuery(query)
      setMovies(data)
    }
    catch{
      setError(true)
    }
    finally{
      setIsLoading(false)
    }
  }
  getMovies()

},[searchParams])


const handleSubmit = value => {
  setSearchParams({ query: value });
};

  return (
    <div>
      {error && <div>Something went wrong, please try again</div> }
      <span>Form search</span>
      <SearchForm onSubmit={handleSubmit}/>
      {loading && <Loader/> }
      <MovieList movies={movies}/>
    </div>
  )
}

export default MoviesPage