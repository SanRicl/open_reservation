import * as jose from 'jose'

export default async function authenticateUser({
  email,
}: {
  email: string
}): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  const alg = 'HS256'
  const token = await new jose.SignJWT({ email })
    .setProtectedHeader({ alg })
    .setExpirationTime('7d')
    .sign(secret)

  return token
}
