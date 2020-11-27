class User {
  constructor (token) {
    this.token = token
  }

  getToken = () => {
    if (!this.token) return null

    const { accountIdentifier, idTokenClaims } = this.token
    return { accountIdentifier, ...idTokenClaims }
  }

  id = () => {
    const data = this.getToken()
    return data ? data.accountIdentifier : ''
  }

  name = () => {
    const data = this.getToken()
    return data ? `${data.given_name} ${data.family_name}` : ''
  }

  email = () => {
    const data = this.getToken()
    return data ? data.email : ''
  }
}

export default User
