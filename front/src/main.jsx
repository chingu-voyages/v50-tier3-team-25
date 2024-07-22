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
      
    ],
  }
])

const AuthContextProvider = ({children}) => {
  const [accessToken, setAccessToken] = useState([])

  useEffect(() => {
    //check our local storage for these items on page load
    const checkAccess = localStorage.getItem("access")

    if (checkAccess) { //valid, not undefined
      setAccessToken(checkAccess)
    }
  }, [])

  const auth = {
    accessToken: accessToken,
    setAccessToken: setAccessToken,
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
