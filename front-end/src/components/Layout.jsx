import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <>
            <div className='min-h-screen relative'>
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </>
    )
}

export default Layout