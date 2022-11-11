import { registerApplication } from '../../../lib/applicationService'
import { verify } from 'checkAuth'

export default async function handler (req, res) {
  var result = null

  try {
    result = await verify(req, res)
  } catch {
    res.status(403).json({ message: 'Forbidden' })
    return
  }

  if (!result) {
    res.status(403).json({ message: 'Forbidden' })
    return
  }

  if (req.method === 'POST') {
    const registration = await registerApplication(req.body)
    res.status(200).json(registration)
  } else {
    res.status(405).json({ message: 'Only POST requests accepted' })
  }
}
