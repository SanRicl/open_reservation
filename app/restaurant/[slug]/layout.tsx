import React from 'react'
import Header from './components/Header'

const RestaurantLayout = ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { slug: string }
}>) => {
  return (
    <main>
      <Header name={params.slug} />
      <div className="flex m-auto md:w-2/3 md:justify-between">{children}</div>
    </main>
  )
}

export default RestaurantLayout
