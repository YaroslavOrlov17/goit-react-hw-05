import { Link } from "react-router-dom"


const NotFoundPage = () => {
  return (<div>
           <div>Page not found</div>
          <Link to="/">Back Home</Link>
        </div>
  )
}

export default NotFoundPage