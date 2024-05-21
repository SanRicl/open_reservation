/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { getCookie } from 'cookies-next'
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import axios from 'axios'

interface IUser {
  id: number
  firstName: string
  lastName: string
  email: string
  city: string
  phone: string
}

interface State {
  loading: boolean
  error: string | null
  data: IUser | null
}

interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>
}

export const AuthenticationContext = createContext<AuthState>({
  data: null,
  error: null,
  loading: false,
  setAuthState: () => {},
})

const AuthContext = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<State>({
    data: null,
    loading: true,
    error: null,
  })

  const fetchUser = useCallback(async () => {
    try {
      const jwt = getCookie(`opentables-app-token:1.0`)

      if (!jwt) {
        return setAuthState({
          data: null,
          error: null,
          loading: false,
        })
      }

      const response = await axios.get('http://localhost:3000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })

      axios.defaults.headers.common.Authorization = `Bearer ${jwt}`

      return setAuthState({
        data: response.data,
        error: null,
        loading: false,
      })
    } catch (error: any) {
      return setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      })
    }
  }, [])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return (
    <AuthenticationContext.Provider
      value={{
        ...authState,
        setAuthState,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}

export default AuthContext
