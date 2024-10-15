import { useEffect, useState } from "react"
import MovieList from "../../components/MovieList/MovieList"
import SearchForm from "../../components/SearchForm/SearchForm"
import { useSearchParams } from "react-router-dom"
import { fetchMoviesByQuery } from "../../services/TMBDapi"
import s from "./MoviesPage.module.css"

const MoviesPage = () => {
const [movies,setMovies] = useState([])
const [searchParams, setSearchParams] = useSearchParams()
const [error,setError] = useState(false)
const [isSearchPerformed, setIsSearchPerformed] = useState(false);



useEffect(()=>{
  const query = searchParams.get("query") ?? ""
  if(!query){
    return
  }

  const getMovies = async()=> {
    try{
      setError(false)
      setIsSearchPerformed(true)
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
      {(movies.length === 0 && isSearchPerformed) && <p className={s.notFound}>Nothing found for your request</p>}
      <MovieList movies={movies}/>
    </div>
  )
}

export default MoviesPage