import { postSubscription } from '../../../../lib/subscriptionService'
import { verify, checkUserOwnsApp } from 'checkAuth'

export default async function handler (req, res) {
  const { query } = req
  const { appid, environment } = query

  let result = null

  // check user has a valid openid id token, error if not
  try {
    result = await verify(req, res)
    await checkUserOwnsApp(result, appid)

    if (!result) {
      // should not reach this, added a safety check if verify fails to throw
      throw new Error('Forbidden')
    }
  } catch {
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
