export const template = ({ fullname, email, api, reason, description }) => {
  return `Name: ${fullname}; Email: ${email}; Reason: ${reason}; API: ${api !== undefined && api}; Description: ${description};`
}

