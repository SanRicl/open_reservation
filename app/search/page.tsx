import type { Metadata } from 'next'
import Header from './components/Header'
import SearchSideBar from './components/SearchSideBar'
import RestaurantCard from './components/RestaurantCard'
import prisma from '@/database'
import { PRICE } from '@prisma/client'

export const metadata: Metadata = {
  title: 'Search | OpenTable',
  description: 'Generated by create next app',
}

interface IRestaurantSearchParamsTypes {
  searchParams: { city?: string; cuisine?: string; price?: PRICE }
}

const fetchRestaurantsByLocation = async ({
  city,
  cuisine,
  price,
}: {
  city?: string
  cuisine?: string
  price?: PRICE
}) => {
  const restaurant = await prisma.restaurant.findMany({
    ...(city || cuisine || price
      ? {
          where: {
            ...(city && {
              locations: {
                name: city.toLowerCase(),
              },
            }),
            ...(cuisine && {
              cuisines: {
                name: cuisine.toLowerCase(),
              },
            }),
            ...(price && {
              price: {
                equals: price,
              },
            }),
          },
        }
      : undefined),
    select: {
      id: true,
      name: true,
      cuisines: true,
      locations: true,
      slug: true,
      main_image: true,
      price: true,
      reviews: true,
    },
  })

  return restaurant
}

const fetchLocations = async () => {
  const locations = await prisma.location.findMany()

  return locations
}

const fetchCuisines = async () => {
  const cuisines = await prisma.cuisine.findMany()

  return cuisines
}

const RestaurantPage = async ({
  searchParams,
}: IRestaurantSearchParamsTypes) => {
  const city = searchParams.city
  const cuisine = searchParams.cuisine
  const price = searchParams.price

  const restaurants = await fetchRestaurantsByLocation({ city, cuisine, price })
  const locations = await fetchLocations()
  const cuisines = await fetchCuisines()

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar
          locations={locations}
          cuisines={cuisines}
          searchParams={searchParams}
        />
        <div className="w-5/6">
          {restaurants.length > 1 ? (
            restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))
          ) : (
            <>
              <p>No Restaurants found</p>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default RestaurantPage
