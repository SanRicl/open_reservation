'use client'

import useReservation from '@/hooks/useReservation'
import { CircularProgress } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'

const Form = ({
  slug,
  partySize,
  date,
}: {
  slug: string
  partySize: string
  date: string
}) => {
  const [day, time] = date.split('T')

  const [inputs, setInputs] = useState({
    booker_first_name: '',
    booker_last_name: '',
    booker_phone: '',
    booker_email: '',
    booker_occasion: '',
    booker_request: '',
  })
  const [disabled, setDisabled] = useState(true)
  const [didBook, setDidBook] = useState(false)
  const { createReservation, loading } = useReservation()

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    })
  }

  const handleClick = async () => {
    await createReservation({
      booker_first_name: inputs.booker_first_name,
      booker_last_name: inputs.booker_last_name,
      booker_phone: inputs.booker_phone,
      booker_email: inputs.booker_email,
      booker_occasion: inputs.booker_occasion,
      booker_request: inputs.booker_request,
      day,
      partySize,
      slug,
      time,
      setDidBook,
    })
  }

  useEffect(() => {
    if (
      inputs.booker_first_name &&
      inputs.booker_last_name &&
      inputs.booker_email &&
      inputs.booker_phone
    ) {
      return setDisabled(false)
    }
    return setDisabled(true)
  }, [inputs])

  return (
    <div className="mt-10 flex flex-col md:flex-wrap justify-between w-full md:w-[660px]">
      {didBook ? (
        <div>
          <h1>You are all booked up</h1>
          <p>Enjoy your reservation</p>
        </div>
      ) : (
        <>
          <input
            type="text"
            className="border rounded p-3 w-full md:w-80 mb-4"
            placeholder="First name"
            id="booker_first_name"
            name="booker_first_name"
            value={inputs.booker_first_name}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-full md:w-80 mb-4"
            placeholder="Last name"
            id="booker_last_name"
            name="booker_last_name"
            value={inputs.booker_last_name}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-full md:w-80 mb-4"
            placeholder="Phone number"
            value={inputs.booker_phone}
            onChange={handleChangeInput}
            id="booker_phone"
            name="booker_phone"
          />
          <input
            type="text"
            className="border rounded p-3 w-full md:w-80 mb-4"
            placeholder="Email"
            id="booker_email"
            name="booker_email"
            value={inputs.booker_email}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-full md:w-80 mb-4"
            placeholder="Occasion (optional)"
            id="booker_occasion"
            name="booker_occasion"
            value={inputs.booker_occasion}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-full md:w-80 mb-4"
            placeholder="Requests (optional)"
            id="booker_request"
            name="booker_request"
            value={inputs.booker_request}
            onChange={handleChangeInput}
          />
          <button
            disabled={disabled || loading}
            className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
            onClick={handleClick}
          >
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              'Complete reservation'
            )}
          </button>
          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the OpenTable Terms
            of Use and Privacy Policy. Standard text message rates may apply.
            You may opt out of receiving text messages at any time.
          </p>
        </>
      )}
    </div>
  )
}

export default Form
