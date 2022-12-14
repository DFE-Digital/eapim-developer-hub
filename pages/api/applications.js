import { registerApplication } from '../../lib/applicationService'
import { verify } from 'checkAuth'

export default async function handler (req, res) {
  var result = null

  // check user has a valid openid id token, error if not
  try {
    result = await verify(req, res)

    if (!result) {
      // should not reach this, added a safety check if verify fails to throw
      throw new Error('Forbidden')
    }
  } catch {
    res.status(403).json({ message: 'Forbidden' })
    return
  }

  // use user id from token not trusted from client
  req.body.userID = result.sub

  if (req.method === 'POST') {
    const registration = await registerApplication(req.body)
    res.status(200).json(registration)
  } else {
    res.status(405).json({ message: 'Invalid http method' })
  }
}
