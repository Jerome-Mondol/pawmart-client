import React from 'react'
import Navbar from '../components/Home/Navbar'
import { Outlet } from 'react-router'
import Footer from '../components/Home/Footer'

const MainLayout = () => {
  return (
    <>
        <div className="pb-24 min-h-screen flex flex-col" style={{ paddingTop: 'var(--navbar-height)' }}>
            <Navbar />
            <main className="grow">
              <Outlet />
            </main>
            <Footer />
        </div>
    </>
  )
}

export default MainLayout
