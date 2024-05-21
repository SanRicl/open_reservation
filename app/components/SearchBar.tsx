'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SearchBar = () => {
  const { push } = useRouter()
  const [location, setlocation] = useState('')

  return (
    <div className="text-left text-lg py-3 m-auto flex justify-center">
      <input
        className="rounded  mr-2 p-2 w-60	md:w-[450px]"
        type="text"
        placeholder="State, city or town"
        value={location}
        onChange={(e) => setlocation(e.target.value)}
      />
      <button
        className="rounded bg-red-600 text-nowrap text-base px-2 md:px-9 py-2 text-white"
        onClick={() => {
          if (location === '') return
          push(`/search?city=${location}`)
          setlocation('')
        }}
      >
        Let's go
      </button>
    </div>
  )
}

export default SearchBar
