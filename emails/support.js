export const template = ({ fullname, email, api, reason, description }) => {
  return `<p>Name: ${fullname}</p><p>Email: ${email}</p><p>Reason: ${reason}</p><p>API: ${api === undefined ? '' : api}</p><p>Description: ${description}</p>`
}

