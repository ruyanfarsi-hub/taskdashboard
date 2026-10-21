import { Link } from 'react-router-dom'

function Tasks() {
    const tasks = [
        {id:1, title: 'Learn English'},
        {id:2, title: 'Learn Spanish'},
        {id:3, title: 'Learn French'},

    ]

    return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Tasks</h1>

      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
  key={task.id}
  className="rounded-lg border border-slate-200 bg-white p-4"
>
  <Link
    to={`/tasks/${task.id}`}
    state={{title:task.title}}
    className="font-medium text-blue-600 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2"
  >
    {task.title}
  </Link>
</li>
        ))}
      </ul>
    </div>
  )
}

export default Tasks
