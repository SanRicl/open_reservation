/* eslint-disable camelcase */
import prisma from '@/database'
import { findAvailabileTables } from '@/services/restaurant/findAvailableTables'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { slug, day, time, partySize } = req.query as {
      slug: string
      day: string
      time: string
      partySize: string
    }

    const {
      booker_phone,
      booker_email,
      booker_first_name,
      booker_last_name,
      booker_occasion,
      booker_request,
    } = req.body

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        slug,
      },
      select: {
        tables: true,
        open_time: true,
        close_time: true,
        id: true,
      },
    })

    if (!restaurant) {
      return res.status(400).json({
        errorMessage: 'Restaurant not found',
      })
    }

    if (
      new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`) ||
      new Date(`${day}T${time}`) > new Date(`${day}T${restaurant.close_time}`)
    ) {
      return res.status(400).json({
        errorMessage: 'Restaurant is not open at that time',
      })
    }

    const searchTimesWithTables = await findAvailabileTables({
      day,
      time,
      res,
      restaurant,
    })

    if (!searchTimesWithTables) {
      return res.status(400).json({
        errorMessage: 'Invalid data provided',
      })
    }

    const searchTimeWithTables = searchTimesWithTables.find((t) => {
      return t.date.toISOString() === new Date(`${day}T${time}`).toISOString()
    })

    if (!searchTimeWithTables) {
      return res.status(400).json({
        errorMessage: 'No availability, cannot book',
      })
    }

    const tablesCount: {
      2: string[]
      4: string[]
    } = {
      2: [],
      4: [],
    }

    searchTimeWithTables.tables.forEach((table) => {
      if (table.seats === 2) {
        tablesCount[2].push(table.id)
      } else {
        tablesCount[4].push(table.id)
      }
    })

    const tablesToBooks: string[] = []
    let seatsRemaining = parseInt(partySize)

    while (seatsRemaining > 0) {
      if (seatsRemaining >= 3) {
        if (tablesCount[4].length) {
          tablesToBooks.push(tablesCount[4][0])
          tablesCount[4].shift()
          seatsRemaining = seatsRemaining - 4
        } else {
          tablesToBooks.push(tablesCount[2][0])
          tablesCount[2].shift()
          seatsRemaining = seatsRemaining - 2
        }
      } else {
        if (tablesCount[2].length) {
          tablesToBooks.push(tablesCount[2][0])
          tablesCount[2].shift()
          seatsRemaining = seatsRemaining - 2
        } else {
          tablesToBooks.push(tablesCount[4][0])
          tablesCount[4].shift()
          seatsRemaining = seatsRemaining - 4
        }
      }
    }

    const booking = await prisma.booking.create({
      data: {
        booking_time: new Date(`${day}T${time}`),
        number_of_people: parseInt(partySize),
        booker_phone,
        booker_email,
        booker_first_name,
        booker_last_name,
        restaurant_id: restaurant.id,
        booker_occasion,
        booker_request,
      },
    })

    const bokingsOnTablesData = tablesToBooks.map((table_id) => {
      return {
        table_id,
        booking_id: booking.id,
      }
    })

    await prisma.bookingTable.createMany({
      data: bokingsOnTablesData,
    })

    return res.json(booking)
  }
}
