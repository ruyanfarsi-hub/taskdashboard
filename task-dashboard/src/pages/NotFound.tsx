import { Link } from 'react-router-dom'

function NotFound() {
    return(
        <div className="p-6">
            <h1 className="text-3xl font-bold">404</h1>
            <p className="my-3 text-slate-600">Page not found.</p>
            <Link
        to="/"
        className="text-blue-600 underline hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        Back to Dashboard
        </Link>
        </div>
    )
}

export default NotFound