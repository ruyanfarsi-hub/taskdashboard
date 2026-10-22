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
} from '../reducers/appReducer'

const STORAGE_KEY = 'task-dashboard-state'

type AppContextValue = {
  state: AppState
  dispatch: Dispatch<AppAction>
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
        'user' in parsed
      ) {
        const user = parsed.user

        if (
          user === null ||
          (typeof user === 'object' &&
            user !== null &&
            'name' in user &&
            'email' in user &&
            typeof user.name === 'string' &&
            typeof user.email === 'string')
        ) {
          return {
            theme: parsed.theme,
            user,
          } as AppState
        }
      }
    }
  } catch {
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