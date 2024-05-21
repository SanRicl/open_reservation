import { PRICE } from '@prisma/client'
import Link from 'next/link'

interface Locations {
  id: string
  name: string
}

interface Cuisines {
  id: string
  name: string
}

const prices = [
  {
    price: PRICE.CHEAP,
    label: '$',
    className: 'border w-full text-reg text-center font-light rounded-r p-2',
  },
  {
    price: PRICE.REGULAR,
    label: '$$',
    className: 'border w-full text-reg text-center font-light p-2',
  },
  {
    price: PRICE.EXPENSIVE,
    label: '$$$',
    className: 'border w-full text-reg text-center font-light rounded-l p-2',
  },
]

const SearchSideBar = ({
  locations,
  cuisines,
  searchParams,
}: {
  locations: Locations[]
  cuisines: Cuisines[]
  searchParams: { city?: string; cuisine?: string; price?: PRICE }
}) => {
  return (
    <div className="w-1/5">
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Region</h1>
        {locations.map((loc) => (
          <Link
            href={{
              pathname: '/search',
              query: {
                ...searchParams,
                city: loc.name,
              },
            }}
            key={loc.id}
            className="font-light text-reg capitalize"
          >
            {loc.name}
          </Link>
        ))}
      </div>
      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map((cuisine) => (
          <Link
            href={{
              pathname: '/search',
              query: {
                ...searchParams,
                cuisine: cuisine.name,
              },
            }}
            key={cuisine.id}
            className="font-light text-reg capitalize"
          >
            {cuisine.name}
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {prices.map(({ label, price, className }) => (
            <Link
              key={label}
              href={{
                pathname: '/search',
                query: {
                  ...searchParams,
                  price,
                },
              }}
              className={className}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchSideBar
