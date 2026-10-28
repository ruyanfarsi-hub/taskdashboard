export type User = {
  name: string
  email: string
}

export type Task = {
  id: number
  title: string
  completed: boolean
}

export type AppState = {
  theme: 'light' | 'dark'
  user: User | null
  tasks: Task[]
}

export type AppAction =
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: number }
  | { type: 'TOGGLE_TASK'; payload: number }
  | {
      type: 'SET_TASK_COMPLETED'
      payload: {
        id: number
        completed: boolean
      }
    }

export const initialState: AppState = {
  theme: 'light',
  user: {
    name: 'Reyhane',
    email: 'reyhane@example.com',
  },
  tasks: [
    { id: 1, title: 'Learn English', completed: false },
    { id: 2, title: 'Learn Spanish', completed: false },
    { id: 3, title: 'Learn French', completed: false },
  ],
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

    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      }

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(
          (task) => task.id !== action.payload
        ),
      }

    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      }

    case 'SET_TASK_COMPLETED':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? {
                ...task,
                completed: action.payload.completed,
              }
            : task
        ),
      }

    default:
      return state
  }
}