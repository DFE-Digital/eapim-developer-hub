export const template = ({ fullname, email, api, reason, description }) => {
  return `Name: ${fullname}\nEmail: ${email}\nReason: ${reason}\nAPI: ${api === undefined ? '' : api}\nDescription: ${description}`
}

