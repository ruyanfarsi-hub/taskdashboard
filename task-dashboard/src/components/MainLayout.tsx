import { Link, Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="flex flex-wrap gap-6 bg-slate-800 p-4 text-white">
        <Link to="/">Dashboard</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/settings">Settings</Link>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout