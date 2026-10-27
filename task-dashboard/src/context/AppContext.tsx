import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
  type Dispatch,
} from 'react'

import {
  appReducer,
  initialState,
  type AppState,
  type AppAction,
  type Task,
  type User,
} from '../reducers/appReducer'

const STORAGE_KEY = 'task-dashboard-state'

type AppContextValue = {
  state: AppState
  dispatch: Dispatch<AppAction>
}

function isUser(value: unknown): value is User | null {
  if (value === null) {
    return true
  }

  if (typeof value !== 'object') {
    return false
  }

  return (
    'name' in value &&
    'email' in value &&
    typeof value.name === 'string' &&
    typeof value.email === 'string'
  )
}

function isTaskArray(value: unknown): value is Task[] {
  return (
      Array.isArray(value) &&
    value.every(
      (task) =>
        typeof task === 'object' &&
        task !== null &&
        'id' in task &&
        'title' in task &&
        'completed' in task &&
        typeof task.id === 'number' &&
        Number.isInteger(task.id) &&
        typeof task.title === 'string' &&
        typeof task.completed === 'boolean'
    )
  )
}

function getInitialState(): AppState {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY)

    if (savedState) {
      const parsed: unknown = JSON.parse(savedState)

      if (
        typeof parsed === 'object' &&
        parsed !== null &&
        'theme' in parsed &&
        (parsed.theme === 'light' || parsed.theme === 'dark') &&
        'user' in parsed &&
        isUser(parsed.user)
      ) {
        const tasks =
          'tasks' in parsed && isTaskArray(parsed.tasks)
            ? parsed.tasks
            : initialState.tasks

        return {
          theme: parsed.theme,
          user: parsed.user,
          tasks,
        }
      }
    }
  } catch {
    // Use the default state if saved data is invalid.
  }

  return initialState
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({
  children,
}: {
  children: ReactNode
}) {
  const [state, dispatch] = useReducer(
    appReducer,
    initialState,
    getInitialState
  )

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // Continue running if localStorage is unavailable.
    }
  }, [state])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)

  if (context === null) {
    throw new Error('useAppContext must be used inside AppProvider')
  }

  return context
}