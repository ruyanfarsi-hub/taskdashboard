import { NavLink, Outlet } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

function MainLayout() {
  const {state} = useAppContext()
  const isDark = state.theme==='dark'

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500
    ${
      isActive
        ? isDark
          ? 'bg-blue-500/20 text-blue-300'
          : 'bg-blue-100 text-blue-700'
        : isDark
          ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-950'
    }`

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDark
          ? 'dark bg-gray-950 text-gray-100'
          : 'bg-gray-50 text-gray-900'
      }`}
    >
      <header
        className={`sticky top-0 z-10 border-b ${
          isDark
            ? 'border-gray-800 bg-gray-950/95'
            : 'border-gray-200 bg-white/95'
        }`}
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <LinkBrand />

          <nav
            aria-label="Main navigation"
            className="flex flex-wrap items-center gap-1"
          >
            <NavLink to="/" end className={navClass}>
              Dashboard
            </NavLink>
            <NavLink to="/tasks" className={navClass}>
              Tasks
            </NavLink>
            <NavLink to="/settings" className={navClass}>
              Settings
            </NavLink>
          </nav>

          <div className="text-sm">
            {state.user ? (
              <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                {state.user.name}
              </span>
            ) : (
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                Guest
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  )
}

function LinkBrand() {
  return (
    <Link
      to="/"
      className="text-lg font-bold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
    >
      Task Dashboard
    </Link>
  )
}

import { Link } from 'react-router-dom'

export default MainLayout 
  