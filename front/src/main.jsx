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

import App from './App'
import ErrorPage from './ErrorPage'
import MenuPage from './MenuPage'

import Header from './Header'
import Footer from './Footer'

import AuthContextProvider from '../src/authContext'
import SignUp from './SignUp'
import MapLocations from './MapLocations'
import OrderSummary from './OrderSummary'
import Checkout from './Checkout'
import PaymentCompletion from './PaymentCompletion'

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
        path: '/menu',
        element: <MenuPage />
      },
      {
        path: '/signup',
        element: <SignUp />
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
      {
        path: '/payment-completion',
        element: <PaymentCompletion />,
      },
    ],
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
);
