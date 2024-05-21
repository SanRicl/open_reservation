import { NextApiRequest, NextApiResponse } from 'next'
import { compare } from 'bcryptjs'
import validator from 'validator'
import prisma from '../../../database'
import authenticateUser from '../../../utils/authenticateUser'
import { setCookie } from 'cookies-next'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const errors: string[] = []
    const { email, password } = req.body

    const validationSchema = [
      {
        valid: validator.isEmail(email),
        errorMessage: 'Email is invalid',
      },
      {
        valid: validator.isLength(password, { min: 1 }),
        errorMessage: 'Passord is invalid',
      },
    ]

    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage)
      }
    })

    if (errors.length) {
      return res.status(400).json({ errorMessage: errors[0] })
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return res
        .status(401)
        .json({ errorMessage: 'Email or password is invalid' })
    }

    const isMatch = await compare(password, user.password)

    if (!isMatch) {
      return res
        .status(401)
        .json({ errorMessage: 'Email or password is invalid' })
    }

    const token = await authenticateUser({ email })

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
