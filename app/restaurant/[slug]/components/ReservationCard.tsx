'use client'
import { useState } from 'react'
import { partySize as partySizes, times } from '../../../../data'
import DatePicker from 'react-datepicker'
import useAvailabilities from '@/hooks/useAvailabilities'
import { CircularProgress } from '@mui/material'
import Link from 'next/link'
import { convertToDisplayTime, Time } from '@/utils/convertToDisplayTime'

const ReservationCard = ({
  openTime,
  closeTime,
  slug,
}: {
  openTime: string
  closeTime: string
  slug: string
}) => {
  const { data, fetchAvailabilities, loading } = useAvailabilities()

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [time, setTime] = useState(openTime)
  const [partySize, setPartySize] = useState('1')
  const [day, setDay] = useState(new Date().toISOString().split('T')[0])

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setDay(date.toISOString().split('T')[0])
      return setSelectedDate(date)
    }

    return setSelectedDate(null)
  }

  const handleClick = () => {
    fetchAvailabilities({
      day,
      partySize,
      slug,
      time,
    })
  }

  const filterTimeByRestaurantOpenWindow = () => {
    const timesInWindow: typeof times = []

    let isWithinWindow = false

    times.forEach((time) => {
      if (!isWithinWindow && time.time === openTime) {
        isWithinWindow = true
      }

      if (isWithinWindow) {
        timesInWindow.push(time)
      }

      if (time.time === closeTime) {
        isWithinWindow = false
      }
    })

    return timesInWindow
  }

  return (
    <div className="fixed  bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="md:mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select
          name=""
          className="py-3 border-b font-light"
          id=""
          value={partySize}
          onChange={(e) => setPartySize(e.target.value)}
        >
          {partySizes.map(({ label, value }, index) => (
            <option key={index} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleChangeDate}
            className="py-3 border-b font-light text-reg w-20"
            dateFormat="MMMM d"
            wrapperClassName="w-[48%]"
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select
            name=""
            id=""
            className="py-3 border-b font-light"
            onChange={(e) => setTime(e.target.value)}
          >
            {filterTimeByRestaurantOpenWindow().map(
              ({ displayTime }, index) => (
                <option key={index} value={time}>
                  {displayTime}
                </option>
              ),
            )}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button
          className="bg-red-600 rounded w-full px-1 md:px-4 text-white font-bold h-12 md:h-16"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? <CircularProgress color="inherit" /> : 'Find a Time'}
        </button>
      </div>
      {data && data.length ? (
        <div className="mt-4">
          <p className="text-reg text-center md:text-start">Select a Time</p>
          <div className="flex flex-wrap m-2 justify-center md:justify-normal">
            {data.map((time, index) => {
              return time.available ? (
                <Link
                  key={index}
                  href={`/reserve/${slug}?date=${day}T${time.time}&partySize=${partySize}`}
                  className="bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 rounded md:mr-3"
                >
                  <p className="text-sm font-bold">
                    {convertToDisplayTime(time.time as Time)}
                  </p>
                </Link>
              ) : (
                <p className="bg-gray-300 p-2 w-24 mb-3 rounded md:mr-3"></p>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default ReservationCard
