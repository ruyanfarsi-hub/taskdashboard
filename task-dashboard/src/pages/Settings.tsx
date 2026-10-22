 import { useState, type FormEvent } from 'react'
import { useAppContext } from '../context/AppContext'

function Settings() {
  const { state, dispatch } = useAppContext()
  const isDark = state.theme === 'dark'

  const [name, setName] = useState(state.user?.name ?? '')
  const [email, setEmail] = useState(state.user?.email ?? '')
  const [saved, setSaved] = useState(false)

  const cardClass = `rounded-2xl border p-5 sm:p-6 ${
    isDark
      ? 'border-gray-800 bg-gray-900'
      : 'border-gray-200 bg-white shadow-sm'
  }`

  const inputClass = `mt-2 w-full rounded-lg border px-3 py-2.5 outline-none transition-colors
    focus-visible:ring-2 focus-visible:ring-blue-500
    ${
      isDark
        ? 'border-gray-700 bg-gray-950 text-white placeholder:text-gray-500'
        : 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-400'
    }`

  const primaryButton =
    'rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-50'

  const secondaryButton = `rounded-lg border px-4 py-2.5 font-medium transition-colors
    active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500
    ${
      isDark
        ? 'border-gray-700 text-gray-200 hover:bg-gray-800'
        : 'border-gray-300 text-gray-700 hover:bg-gray-100'
    }`

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!name.trim() || !email.trim()) return

    dispatch({
      type: 'UPDATE_USER',
      payload: {
        name: name.trim(),
        email: email.trim(),
      },
    })

    setSaved(true)
  }

  function handleLogout() {
    dispatch({ type: 'LOGOUT' })
    setName('')
    setEmail('')
    setSaved(false)
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Customize your dashboard and manage your profile.
        </p>
      </div>

      <section className={cardClass}>
        <h2 className="text-lg font-semibold">Appearance</h2>
        <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Choose the theme that feels right for you.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-medium">
              {isDark ? 'Dark mode' : 'Light mode'}
            </p>
            <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Your choice is saved automatically.
            </p>
          </div>

          <button
            type="button"
            aria-pressed={isDark}
            onClick={() =>
              dispatch({
                type: 'SET_THEME',
                payload: isDark ? 'light' : 'dark',
              })
            }
            className={primaryButton}
          >
            Switch to {isDark ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      </section>

      <section className={cardClass}>
        <h2 className="text-lg font-semibold">Profile</h2>
        <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Update the name and email displayed on your dashboard.
        </p>

        {state.user ? (
          <form onSubmit={handleSubmit} className="mt-5 space-y-5">
            <div>
              <label htmlFor="profile-name" className="block text-sm font-medium">
                Full name
              </label>
              <input
                id="profile-name"
                autoComplete="name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                  setSaved(false)
                }}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor="profile-email" className="block text-sm font-medium">
                Email address
              </label>
              <input
                id="profile-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  setSaved(false)
                }}
                className={inputClass}
                required
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className={primaryButton}
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className={secondaryButton}
              >
                Log Out
              </button>

              {saved && (
                <p role="status" className="text-sm text-green-600 dark:text-green-400">
                  Profile saved.
                </p>
              )}
            </div>
          </form>
        ) : (
          <div className="mt-5">
            <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              You are currently logged out.
            </p>

            <button
              type="button"
              onClick={() => {
                const defaultUser = {
                  name: 'Reyhane',
                  email: 'reyhane@example.com',
                }

                dispatch({
                  type: 'UPDATE_USER',
                  payload: defaultUser,
                })

                setName(defaultUser.name)
                setEmail(defaultUser.email)
              }}
              className={`${primaryButton} mt-4`}
            >
              Restore Demo Profile
            </button>
          </div>
        )}
      </section>
    </section>
  )
}

export default Settings