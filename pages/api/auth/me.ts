import jwt from 'jsonwebtoken'
import prisma from '../../../database'

import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const bearerToken = req.headers.authorization as string

  const token = bearerToken.split(' ')[1]

  const payload = jwt.decode(token) as { email: string }

  if (!payload.email) {
    return res.status(401).json({
      errorMessage: 'Unauthorized request',
    })
  }

  const user = await prisma.user.findUnique({
    where: { email: payload.email },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      city: true,
      email: true,
      phone: true,
    },
  })

  if (!user) {
    return res.status(401).json({
      errorMessage: 'User not found',
    })
  }

  return res.json({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    city: user.city,
    email: user.email,
    phone: user.phone,
  })
}
