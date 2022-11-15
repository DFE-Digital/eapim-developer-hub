import { deleteApplication, updateApplication } from '../../../lib/applicationService'
import { verify } from 'checkAuth'

export default async function handler (req, res) {
  var result = null

  // example of how to get id from url instead of http body
  // const { query } = req
  // const { appid } = query

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

  // use user id from token not trusted from client
  req.body.userID = result.sub

  if (req.method === 'DELETE') {
    const deletion = await deleteApplication(req.body)
    res.status(200).json(deletion)
  } else if (req.method === 'PUT') {
    const update = await updateApplication(req.body)
    res.status(200).json(update)
  } else {
    res.status(405).json({ message: 'Invalid http method' })
  }
}
