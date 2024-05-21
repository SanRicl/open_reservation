/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { AuthenticationContext } from '@/app/context/AuthContext'
import axios from 'axios'
import { useContext } from 'react'
import { deleteCookie } from 'cookies-next'
const useAuth = () => {
  const { setAuthState } = useContext(AuthenticationContext)

  const signin = async (
    {
      email,
      password,
    }: {
      email: string
      password: string
    },
    handleClose: () => void,
  ) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    })

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}:3000/api/auth/signin`,
        {
          email,
          password,
        },
      )

      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      })
      handleClose()
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      })
    }
  }
  const signup = async (
    {
      email,
      city,
      firstName,
      lastName,
      password,
      phone,
    }: {
      email: string
      password: string
      city: string
      firstName: string
      lastName: string
      phone: string
    },
    handleClose: () => void,
  ) => {
    setAuthState({
      data: null,
      error: null,
      loading: false,
    })
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}:3000/api/auth/signup`,
        {
          email,
          password,
          city,
          first_name: firstName,
          last_name: lastName,
          phone,
        },
      )
      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      })
      handleClose()
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      })
    }
  }
  const signout = () => {
    deleteCookie('opentables-app-token:1.0')
    setAuthState({
      data: null,
      error: null,
      loading: false,
    })
  }

  return {
    signin,
    signup,
    signout,
  }
}

export default useAuth
