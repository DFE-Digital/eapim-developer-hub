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
  },
  'delete-account-confirm': {
    title: 'Are you sure you want us to delete your account?',
    tableCaption: 'Account details',
    buttons: {
      cancel: 'Cancel'
    },
    tableHeadings: {
      name: 'Name',
      email: 'Email address'
    },
    content: [
      {
        Type: 'P',
        Body: 'This will be deleted immediately. We cannot restore accounts once they have been deleted.'
      }
    ]
  },
  'delete-account-success': {
    title: 'Your account has been deleted',
    buttons: {
      back: 'Back to homepage'
    }
  }
}
