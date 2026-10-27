import { Link , useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

function TaskDetails() {
  const { id } = useParams()
  const {state} = useAppContext()

  const task = state.tasks.find(
    (task) => task.id === Number(id)
  )

  if(!task) {
    return (
<div className="p-6">
<h1 className="text-2xl font-bold">Task Not Found</h1>

    <p className="mt-3">
      The task you are looking for does not exist.
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

return (
<div className="p-6">
<h1 className="text-2xl font-bold">
Task Details
</h1>

  <p className="mt-3">Task ID: {task.id}</p>

  <p className="mt-2">
    Task Title: {task.title}
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