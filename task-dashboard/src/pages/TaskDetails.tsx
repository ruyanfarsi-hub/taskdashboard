import { useParams, Link,useLocation } from 'react-router-dom'

function TaskDetails() {
  const { id } = useParams()
  const location= useLocation()

  const title = location.state?.title

     return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Task Details
      </h1>

      <p className="mt-3">Task ID: {id}</p>

      <p className="mt-2">
        Task Title: {title ?? 'Title unavailable'}
      </p>

      <Link
        to="/tasks"
        className="mt-4 inline-block text-blue-600 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        Back to Tasks
      </Link>
    </div>
  )
} 

export default TaskDetails