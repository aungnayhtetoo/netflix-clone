import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState, useMemo } from 'react'
import { auth } from '../firebase'

interface IAuth {
  user: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  loading: boolean
}

// creating context so that we can wrap the entire app with the context
// using HOC
const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
})

// type of the children that are being wrapped
interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [intialLoading, setIntialLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()

  // use effect without writing clean up function
  useEffect(() => 
    onAuthStateChanged(auth, (user) => {
      if(user) {
        // Used to persist the state of the user, logging in
        setUser(user)
        setLoading(false)
      } else {
        // Not logged in, will auto push to the login page
        setUser(null)
        setLoading(true)
        router.push('/login')
      }
      setIntialLoading(false)
    })

  , [auth])

  const signUp = async (email: string, password: string) => {
    setLoading(true)
    /*
        finding the USER type from third party libraries 
        by importing and testing if type would exist
    */
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
        router.push('/')
        setLoading(false)
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    /*
        finding the USER type from third party libraries 
        by importing and testing if type would exist
    */
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
        router.push('/')
        setLoading(false)
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }

  const logout = async () => {
    setLoading(true)
    /*
        finding the USER type from third party libraries 
        by importing and testing if type would exist
    */
    await signOut(auth)
      .then(() => {
        setUser(null)
      })
      .catch((error) => {
        alert(error.message)
      })
      .finally(() => setLoading(false))
  }

  // will only run if one of the dependency changes
  const memoedValue = useMemo(
    () => ({
      user,
      signUp,
      signIn,
      logout,
      loading,
      error,
    }),
    [user, loading]
  )

  return (
    // Blocking the UI if the user is not logged in
    <AuthContext.Provider value={memoedValue}>
      {!intialLoading && children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
