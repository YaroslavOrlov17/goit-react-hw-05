import s from './SearcHForm.module.css'
import toast, { Toaster } from 'react-hot-toast';

const SearchForm = ({onSubmit}) => {

const handleSubmit = (e)=>{
  e.preventDefault()
  const form = e.target
  const query = form.elements.query.value.trim()
  if(query === ""){
    toast.error("Please enter your request!")
  }
  onSubmit(query)
  form.reset()
}

  return (
    <form className={s.formBox} onSubmit={handleSubmit}>
       <Toaster   position="top-right" reverseOrder={true}/>
        <input className={s.formInput} type="text" name="query" placeholder='Search movie...'/>
        <button className={s.formBtn}>Search</button>
    </form>
  )
}

export default SearchForm


