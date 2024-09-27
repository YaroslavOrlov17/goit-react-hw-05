const SearchForm = ({onSubmit}) => {

const handleSubmit = (e)=>{
  e.preventDefault()
  const form = e.target
  const query = form.elements.query.value.trim()
  onSubmit(query)
  form.reset()
}

  return (
    <form onSubmit={handleSubmit}>
        <input type="text" name="query"/>
        <button>Search</button>
    </form>
  )
}

export default SearchForm


