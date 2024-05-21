import { convertToDisplayTime, Time } from '@/utils/convertToDisplayTime'
import { format } from 'date-fns'

const Header = async ({
  image,
  name,
  date,
  partySize,
}: {
  image: string
  name: string
  date: string
  partySize: string
}) => {
  const [, time] = date.split('T')

  return (
    <div>
      <h3 className="font-bold text-center md:text-start">
        You're almost done!
      </h3>
      <div className="mt-5 flex flex-col md:flex-row">
        <img
          src={image}
          alt="Restaurant image"
          className="md:w-32 md:h-18 rounded w-full h-36"
        />
        <div className="md:ml-4">
          <h1 className="text-2xl text-nowrap text-center md:text-3xl font-bold">
            {name}
          </h1>
          <div className="flex mt-3">
            <p className="mr-6">{format(new Date(date), 'ccc, LLL d')}</p>
            <p className="mr-6">{convertToDisplayTime(time as Time)}</p>
            <p className="mr-6">
              {partySize} {parseInt(partySize) === 1 ? 'person' : 'people'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
