import { useEffect, useState } from "react"
import MovieList from "../../components/MovieList/MovieList"
import SearchForm from "../../components/SearchForm/SearchForm"
import { useSearchParams } from "react-router-dom"
import { fetchMoviesByQuery } from "../../services/TMBDapi"

const MoviesPage = () => {
const [movies,setMovies] = useState([])
const [searchParams, setSearchParams] = useSearchParams()
const [error,setError] = useState(false)



useEffect(()=>{
  const query = searchParams.get("query") ?? ""
  if(!query){
    return
  }

  const getMovies = async()=> {
    try{
      setError(false)
      const data = await fetchMoviesByQuery(query)
      setMovies(data)
    }
    catch{
      setError(true)
    }
  }
  getMovies()

},[searchParams])


const handleSubmit = value => {
  if(!value){
    return setSearchParams({})
  }
  setSearchParams({ query: value });
};

  return (
    <div>
      {error && <div>Something went wrong, please try again</div> }
      <SearchForm onSubmit={handleSubmit}/>
      <MovieList movies={movies}/>
    </div>
  )
}

export default MoviesPage