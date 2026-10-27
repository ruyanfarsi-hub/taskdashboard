import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

function Tasks() {
  const { state, dispatch } = useAppContext()
  const { tasks } = state

  const [title, setTitle] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      return
    }

    const newTask = {
      id: Date.now(),
      title: trimmedTitle,
      completed: false,
    }

    dispatch({
      type: 'ADD_TASK',
      payload: newTask,
    })

    setTitle('')
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Tasks</h1>

      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter a task"
          aria-label="Task title"
          className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2"
        />

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!title.trim()}
        >
          Add Task
        </button>
      </form>
 
<ul className="space-y-3">
  {tasks.map((task) => (
    <li
      key={task.id}
      className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 transition-colors dark:border-slate-700 dark:bg-slate-800"
    >
      <div className="min-w-0 flex-1">
        <Link
          to={`/tasks/${task.id}`}
          className={`font-medium hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 ${
            task.completed
              ? 'text-slate-400 line-through'
              : 'text-blue-600'
          }`}
        >
          {task.title}
        </Link>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {task.completed ? 'Completed' : 'Pending'}
        </p>
      </div>

      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() =>
            dispatch({ type: 'TOGGLE_TASK', payload: task.id })
          }
          className="rounded-lg border border-green-600 px-3 py-2 text-sm text-green-700 hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {task.completed ? 'Undo' : 'Complete'}
        </button>

        <button
          type="button"
          onClick={() =>
            dispatch({ type: 'DELETE_TASK', payload: task.id })
          }
          className="rounded-lg border border-red-600 px-3 py-2 text-sm text-red-700 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </li>
  ))}
</ul>
    </div>
  )
}

export default Tasks