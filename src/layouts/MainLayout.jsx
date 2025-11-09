import React from 'react'
import Navbar from '../components/Home/Navbar'
import { Outlet } from 'react-router'
import Footer from '../components/Home/Footer'

const MainLayout = () => {
  return (
    <>
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    </>
  )
}

export default MainLayout
