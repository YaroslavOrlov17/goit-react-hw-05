import axios from "axios";

 axios.defaults.baseURL = "https://api.themoviedb.org/3/"
const API_KEY = "api_key=839413b19204ae87901f959f5fcc1b75"

const options = {
    headers: {
      Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Mzk0MTNiMTkyMDRhZTg3OTAxZjk1OWY1ZmNjMWI3NSIsIm5iZiI6MTcyNzQxNDQ5OS41NDc0MDksInN1YiI6IjY2ZjYzZjFmYWE3ZTVmYTIwMjk2NTRjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xc19LkgOlboipMZgY2RQ7V4dCP6PgYm2FsmCmsBlrZY839413b19204ae87901f959f5fcc1b75839413b19204ae87901f959f5fcc1b75"
    }
  };




  export const fetchTrendingMovies = async () => {
     const {data} = await axios.get(`trending/movie/week?${API_KEY}`,options)
     return data.results
  }

  export const fetchMovieDetails = async (movieId) => {
     const {data} = await axios.get(`movie/${movieId}?${API_KEY}`,options)
     return data
  }

  export const fetchCast = async (movieId) => {
     const {data} = await axios.get(`movie/${movieId}/credits?${API_KEY}`,options)
     return data.cast
  }


  export const fetchReviews = async (movieId) => {
     const {data} = await axios.get(`movie/${movieId}/reviews?${API_KEY}`,options)
     return data.results
  }


  export const fetchMoviesByQuery = async (query) => {
     const {data} = await axios.get(`search/movie?query=${query}&${API_KEY}`,options)
     return data.results
  }













