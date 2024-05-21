/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import prisma from '@/database'
import authenticateUser from '../../../utils/authenticateUser'
import { setCookie } from 'cookies-next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { first_name, last_name, email, phone, city, password } = req.body

    const errors: string[] = []

    const validationSchema = [
      {
        valid: validator.isLength(first_name, { min: 1, max: 20 }),
        errorMessage: 'First name is invalid',
      },
      {
        valid: validator.isLength(last_name, { min: 1, max: 20 }),
        errorMessage: 'Last name is invalid',
      },
      {
        valid: validator.isEmail(email),
        errorMessage: 'Email name is invalid',
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: 'Phone number is invalid',
      },
      {
        valid: validator.isLength(city, { min: 1, max: 60 }),
        errorMessage: 'City is invalid',
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage: 'Password is not strong enough',
      },
    ]

    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage)
      }
    })

    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (errors.length) {
      return res.status(400).json({ errorMessage: errors[0] })
    }

    if (userWithEmail) {
      return res
        .status(400)
        .json({ errorMessage: 'Email already associated with another user' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        city,
        email,
        password: hashedPassword,
        first_name,
        last_name,
        phone,
      },
    })

    const token = await authenticateUser({ email: user.email })

    setCookie(`opentables-app-token:1.0`, token, {
      req,
      res,
      maxAge: 604800,
    })

    return res.status(200).json({
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phone: user.phone,
      city: user.city,
    })
  }

  return res.status(404).json('Unknown endpoint')
}
