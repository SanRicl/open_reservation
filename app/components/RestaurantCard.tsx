import Link from 'next/link'
import { RestaurantCardType } from '../page'
import Price from './Price'
import Stars from './Stars'

interface Props {
  restaurant: RestaurantCardType
}

const RestaurantCard = ({ restaurant }: Props) => {
  return (
    <div className="m-3 rounded overflow-hidden border cursor-pointer w-35">
      <Link href={`/restaurant/${restaurant.slug}`}>
        <img
          src={`${restaurant.main_image}`}
          alt=""
          className="w-[246px] h-36"
        />
        <div className="p-1">
          <h3 className="font-bold text-2xl mb-2">{`${restaurant.name}`}</h3>
          <div className="flex items-start">
            <div className="flex mb-2">
              <Stars reviews={restaurant.reviews} />
            </div>
            <p className="ml-2">
              {restaurant.reviews.length} review
              {restaurant.reviews.length > 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className="mr-3">{`${restaurant.cuisines.name}`}</p>
            <Price price={restaurant.price} />
            <p>{`${restaurant.locations.name}`}</p>
          </div>
          <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
        </div>
      </Link>
    </div>
  )
}

export default RestaurantCard
