export const getContent = (key) => {
  return data[key]
}

const data = {
  profile: {
    title: 'Profile',
    url: '/profile',
    buttons: {
      edit: 'Edit profile',
      delete: 'Confirm account deletion'
    },
    tableCaption: 'Account details',
    tableHeadings: {
      name: 'Name',
      email: 'Email address'
    },
    deleteAccount: [
      {
        Type: 'H2',
        Body: 'Delete account'
      },
      {
        Type: 'P',
        Body: 'You can ask us to delete your account and we will respond within 2 working days.'
      }
    ]
  }
}
