import { deleteApplication, updateApplication } from '../../../lib/applicationService'
import { verify, checkUserOwnsApp } from 'checkAuth'

export default async function handler (req, res) {
  let result = null

  // check user has a valid openid id token, error if not
  try {
    result = await verify(req, res)
    await checkUserOwnsApp(result, req.body.applicationId)

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
