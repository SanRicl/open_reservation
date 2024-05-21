import type { Metadata } from 'next'
import RestaurantNavBar from './components/RestaurantNavBar'
import Title from './components/Title'
import Rating from './components/Rating'
import Description from './components/Description'
import Images from './components/Images'
import Reviews from './components/Reviews'
import ReservationCard from './components/ReservationCard'
import prisma from '@/database'
import { Review } from '@prisma/client'
import { notFound } from 'next/navigation'

interface IRestaurantDetails {
  params: { slug: string }
}

export interface IRestaurantTypes {
  id: string
  name: string
  images: string[]
  description: string
  slug: string
  reviews: Review[]
  open_time: string
  close_time: string
}

export const metadata: Metadata = {
  title: 'Milestones Grill (Toronto) | OpenTables',
  description: 'Generated by create next app',
}

const fetchRestaurantBySlug = async (
  slug: string,
): Promise<IRestaurantTypes> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true,
      open_time: true,
      close_time: true,
    },
  })

  if (!restaurant) {
    notFound()
  }

  return restaurant
}

const RestaurantDetails = async ({ params }: IRestaurantDetails) => {
  const restaurant = await fetchRestaurantBySlug(params.slug)

  return (
    <>
      <div className="bg-white w-[100%] md:w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={restaurant.slug} />
        <Title name={restaurant.name} />
        <Rating reviews={restaurant.reviews} />
        <Description description={restaurant.description} />
        <Images images={restaurant.images} />
        <Reviews reviews={restaurant.reviews} />
      </div>
      <div className="w-[27%] top-36 right-24 absolute md:absolute md:right-0 md:top-72 text-reg">
        <ReservationCard
          slug={restaurant.slug}
          openTime={restaurant.open_time}
          closeTime={restaurant.close_time}
        />
      </div>
    </>
  )
}

export default RestaurantDetails