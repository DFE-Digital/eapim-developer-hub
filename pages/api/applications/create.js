import { registerApplication } from '../../../lib/applicationService'
import { verify } from 'checkAuth'

export default function handler (req, res) {
  var result = verify(req, res)

  if (!result) {
    res.status(403).json({ message: 'Forbidden' })
    return
  }

  if (req.method === 'POST') {
    const registration = registerApplication(req.body)
    res.status(200).json(registration)
  } else {
    res.status(405).json({ message: 'Only POST requests accepted' })
  }
}
