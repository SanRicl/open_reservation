import { Review } from '@prisma/client'
import ReviewCard from './ReviewCard'

const Reviews = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5 text-center md:text-start ">
        What {reviews.length} {reviews.length === 1 ? 'person' : 'people'} are
        saying
      </h1>
      <div>
        {reviews.map((review) => (
          <ReviewCard review={review} key={review.id} />
        ))}
      </div>
    </div>
  )
}

export default Reviews
