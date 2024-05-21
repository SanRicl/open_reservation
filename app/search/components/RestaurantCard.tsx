import { Stars } from '@/app/components'
import Price from '@/app/components/Price'
import { calculateReviewRatingAverage } from '@/utils/calculateReviewRatingAverage'
import { Cuisine, Location, PRICE, Review } from '@prisma/client'
import Link from 'next/link'

interface IRestaurant {
  id: string
  name: string
  cuisines: Cuisine
  locations: Location
  slug: string
  main_image: string
  price: PRICE
  reviews: Review[]
}

const RestaurantCard = ({ restaurant }: { restaurant: IRestaurant }) => {
  const renderRatingText = () => {
    const rating = calculateReviewRatingAverage(restaurant.reviews)

    return rating > 4
      ? 'Awesome'
      : rating <= 4 && rating > 3
        ? 'Good'
        : rating <= 3 && rating > 0
          ? 'Average'
          : ''
  }

  return (
    <div className="border-b flex pb-5">
      <img src={`${restaurant.main_image}`} alt="" className="w-44 rounded" />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">
            <Stars reviews={restaurant.reviews} />
          </div>
          <p className="ml-2 text-sm">{renderRatingText()}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price price={restaurant.price} />
            <p className="mr-4">{restaurant.cuisines.name}</p>
            <p className="mr-4">{restaurant.locations.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RestaurantCard
