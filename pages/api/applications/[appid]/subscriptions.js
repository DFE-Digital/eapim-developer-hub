import { postSubscription } from '../../../../lib/subscriptionService'
import { verify } from 'checkAuth'

export default async function handler (req, res) {
  const { query } = req
  const { appid, environment } = query

  var result = null

  // check user has a valid openid id token, error if not
  try {
    result = await verify(req, res)
  } catch {
    res.status(403).json({ message: 'Forbidden' })
    return
  }

  // this should be handled by catch above, repeated for safety
  if (!result) {
    res.status(403).json({ message: 'Forbidden' })
    return
  }

  if (req.method === 'POST') {
    const newSubscription = await postSubscription(appid, req.body.apiName, environment)
    res.status(200).json(newSubscription)
  } else {
    res.status(405).json({ message: 'Invalid http method' })
  }
}
