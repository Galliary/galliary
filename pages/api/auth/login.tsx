import { serialize } from 'cookie'
import { AUTH_COOKIE_NAME } from 'app/constants'
import { NextApiRequest, NextApiResponse } from 'next'

export default function ApiAuthLoginCatch(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const authToken = req.query.at
  if (!authToken) {
    throw new Error('No auth token provided')
  }

  res.setHeader('Set-Cookie', [
    serialize(AUTH_COOKIE_NAME, authToken as string, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60,
      secure: process.env.NODE_ENV === 'production',
    }),
  ])

  return res.redirect('/')
}
