const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

const APP_ROUTES = [
  {
    page: 'index',
    pattern: '/'
  },
  {
    page: 'documentation',
    pattern: '/documentation'
  },
  {
    page: 'apis',
    pattern: '/apis'
  },
  {
    page: '/apis/[slug].js',
    path: '/apis/:slug'
  },
  {
    page: 'applications',
    pattern: '/applications'
  },
  {
    page: '/applications/[slug]',
    path: '/applications/:slug'
  },
  {
    page: 'support',
    pattern: '/support'
  },
  {
    page: 'profile',
    pattern: '/profile'
  },
  {
    page: '/auth/register',
    pattern: '/register'
  },
  {
    page: '/auth/login',
    pattern: '/login'
  },
  {
    page: '/auth/logout',
    pattern: '/logout'
  },
  {
    page: '/auth/forgot-password',
    pattern: '/forgot-password'
  },
  {
    page: '/auth/edit-profile',
    pattern: '/edit-profile'
  },
  {
    page: '/auth/verify',
    pattern: '/verify'
  },
  {
    page: '/support-submitted',
    pattern: '/support/submitted'
  }
]

APP_ROUTES.forEach(route => routes.add(route))
