import React from 'react'
import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom'

// project styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import About from './About'
import App from './App'
import ErrorPage from './ErrorPage'
import MenuPage from './MenuPage'

import Header from './Header'
import Footer from './Footer'
import Login from './Login'

import { AuthContext } from './authContext'
import SignUp from './SignUp'
import MapLocations from './MapLocations'
import OrderSummary from './OrderSummary'
import Checkout from './Checkout'

const site = import.meta.env.BASE_URL

function Layout() {
  return (
      <>
        <div id='page-content'>
          <Header />
          <Outlet />
          <Footer />
        </div>
      </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
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
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/locations',
        element: <MapLocations/>

      },
      {
        path: '/order',
        element: <OrderSummary/>,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
    ],
  }
])

const AuthContextProvider = ({children}) => {
  const [accessToken, setAccessToken] = useState([])
  const [username, setUsername] = useState("")

  useEffect(() => {
    //check our local storage for these items on page load
    const checkAccess = localStorage.getItem("access")
    const checkUsername = localStorage.getItem("username")

    if (checkAccess && checkUsername) { //valid, not undefined or empty
      setAccessToken(checkAccess)
    }
  }, [])

  const auth = {
    accessToken: accessToken,
    setAccessToken: setAccessToken,
    username: username,
    setUsername: setUsername,
  }

  return (
    <AuthContext.Provider value={{ auth: auth }}>
      {children}
    </AuthContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
)
