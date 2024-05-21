'use client'
import errorIcon from '../../public/icons/error.png'
import Image from 'next/image'

const Error = () => {
  return (
    <div className="h-screen bg-gray-200 flex flex-col justify-center items-center">
      <Image alt="error" src={errorIcon} className="w-56 mb-8" />
      <div className="bg-white px-9 py-14 shadown rounded">
        <h3 className="text-3xl font-bold"> Well, this is embarrassing</h3>
        <p className="text-reg font-bold">We couldn't find that reservation</p>
        <p className="mt-6 text-sm font-light">Error code: 404</p>
      </div>
    </div>
  )
}

export default Error
