import { getSubscriptionKeys } from '../../../../../../lib/subscriptionService'
import { verify, checkUserOwnsSub } from 'checkAuth'

export default async function handler (req, res) {
  const { query } = req
  const { appid, subid, environment } = query

  let result = null

  // check user has a valid openid id token, error if not
  try {
    result = await verify(req, res)
    await checkUserOwnsSub(result, appid, subid, environment)

    if (!result) {
      // should not reach this, added a safety check if verify fails to throw
      throw new Error('Forbidden')
    }
  } catch {
    res.status(403).json({ message: 'Forbidden' })
    return
  }

  if (req.method === 'GET') {
    const keys = await getSubscriptionKeys(subid, environment)
    res.status(200).json(keys)
  } else {
    res.status(405).json({ message: 'Invalid http method' })
  }
}
