/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import axios from 'axios'
import { Dispatch, SetStateAction, useState } from 'react'

export default function useReservation() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const createReservation = async ({
    slug,
    partySize,
    day,
    time,
    booker_first_name,
    booker_last_name,
    booker_phone,
    booker_email,
    booker_occasion,
    booker_request,
    setDidBook,
  }: {
    slug: string
    day: string
    time: string
    partySize: string
    booker_first_name: string
    booker_last_name: string
    booker_phone: string
    booker_email: string
    booker_occasion: string
    booker_request: string
    setDidBook: Dispatch<SetStateAction<boolean>>
  }) => {
    setLoading(true)

    try {
      const response = await axios.post(
        `http://localhost:3000/api/restaurant/${slug}/reserve`,
        {
          booker_first_name,
          booker_last_name,
          booker_phone,
          booker_email,
          booker_occasion,
          booker_request,
        },
        {
          params: {
            day,
            time,
            partySize,
          },
        },
      )
      setLoading(false)
      setDidBook(true)
      return response.data
    } catch (error: any) {
      setLoading(false)
      setError(error.response.data.errorMessage)
    }
  }

  return {
    loading,
    error,
    createReservation,
  }
}
