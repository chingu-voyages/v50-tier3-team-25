import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

// project styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import About from './About'
import App from './App'
import ErrorPage from './ErrorPage'
import MenuPage from './MenuPage'

const site = import.meta.env.BASE_URL

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/menu',
    element: <MenuPage />
  },
], {
  basename: site
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
