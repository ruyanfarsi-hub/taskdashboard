export type User = {
  name: string
  email: string
}

export type AppState = {
  theme: 'light' | 'dark'
  user: User | null
}

export type AppAction =
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'LOGOUT' }

export const initialState: AppState = {
  theme: 'light',
  user: {
    name: 'Reyhane',
    email: 'reyhane@example.com',
  },
}

export function appReducer(
  state: AppState,
  action: AppAction
): AppState {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      }

    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      }

    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      }

    case 'LOGOUT':
      return {
        ...state,
        user: null,
      }

    default:
      return state
  }
}