import { Item } from '@prisma/client'
import MenuCard from './MenuCard'

const Menu = ({ items }: { items: Item[] }) => {
  return (
    <main className="bg-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl text-center md:text-start">Menu</h1>
        </div>
        {items.length > 1 ? (
          items.map((item, index) => (
            <>
              <div
                className="flex flex-wrap justify-center md:justify-between"
                key={index}
              >
                <MenuCard key={item.id} item={item} />
              </div>
            </>
          ))
        ) : (
          <div className="flex flex-wrap justify-between">
            <p>This restaurant doesnt have a menu</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default Menu
