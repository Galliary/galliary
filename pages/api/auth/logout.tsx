import { serialize } from 'cookie'
import { AUTH_COOKIE_NAME } from 'app/constants'
import { NextApiRequest, NextApiResponse } from 'next'

export default function ApiAuthLogout(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader(
    'Set-Cookie',
    serialize(AUTH_COOKIE_NAME, '', {
      maxAge: -1,
      path: '/',
    }),
  )

  const redirect = req.query.r as string | undefined

  if (redirect) {
    return res.redirect(Buffer.from(redirect, 'base64').toString('utf8'))
  }

  return res.redirect('/')
}
