import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

function Dashboard() {
  const { state } = useAppContext()
  const isDark = state.theme === 'dark'

  const cardClass = `rounded-2xl border p-5 ${
    isDark
      ? 'border-gray-800 bg-gray-900'
      : 'border-gray-200 bg-white shadow-sm'
  }`

  return (
    <section className="space-y-8">
      <div>
        <p className={`text-sm font-medium ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
          YOUR WORKSPACE
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Welcome, {state.user?.name ?? 'Guest'}
        </h1>

        <p className={`mt-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Keep your tasks organized and make progress one step at a time.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className={cardClass}>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Appearance
          </p>
          <p className="mt-2 text-xl font-semibold">
            {isDark ? 'Dark mode' : 'Light mode'}
          </p>
          <Link
            to="/settings"
            className={`mt-4 inline-block rounded-md text-sm font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 ${
              isDark ? 'text-blue-300 hover:text-blue-200' : 'text-blue-700 hover:text-blue-900'
            }`}
          >
            Change appearance
          </Link>
        </div>

        <div className={cardClass}>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Profile
          </p>
          <p className="mt-2 break-words text-xl font-semibold">
            {state.user?.email ?? 'No active profile'}
          </p>
          <Link
            to="/settings"
            className={`mt-4 inline-block rounded-md text-sm font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 ${
              isDark ? 'text-blue-300 hover:text-blue-200' : 'text-blue-700 hover:text-blue-900'
            }`}
          >
            Manage profile
          </Link>
        </div>
      </div>

      <Link
        to="/tasks"
        className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        Open Tasks
      </Link>
    </section>
  )
}

export default Dashboard