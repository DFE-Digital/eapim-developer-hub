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
  }
]

APP_ROUTES.forEach(route => routes.add(route))
