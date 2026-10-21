import { BrowserRouter,Routes,Route} from 'react-router-dom'

import MainLayout from './components/MainLayout'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import TaskDetails from './pages/TaskDetails'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="tasks/:id" element={<TaskDetails />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App 