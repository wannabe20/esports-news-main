import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'

function Navbar() {
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const { currentUser, logout } = useContext(AuthContext)

    return (
        <nav className='py-5 bg-red-900 w-full fixed z-40'>
            <div className='container mx-auto flex flex-col lg:flex-row justify-between items-center'>
                <div className='flex justify-between items-center w-full lg:w-auto'>
                    <Link to={"/"}>
                        <h1 className='font-bold text-2xl text-slate-100'>E-SPORTS NEWS</h1>
                    </Link>
                    {!menuIsOpen && <button className=' lg:hidden text-slate-100' onClick={() => setMenuIsOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>}
                    {menuIsOpen && <button className=' lg:hidden text-slate-100' onClick={() => setMenuIsOpen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>}
                </div>

                {/* Navbar Small */}
                {menuIsOpen && <div className="lg:hidden">
                    <div className='gap-2 mt-5 lg:mt-0 flex flex-col lg:flex-row items-center text-slate-100'>
                        <Link to="/">
                            <div className='py-1 px-2 rounded hover:bg-red-700 transition-colors duration-100'>
                                Home
                            </div>
                        </Link>
                        <Link to="/category/league-of-legends">
                            <div className='py-1 px-2 rounded hover:bg-red-700 transition-colors duration-100'>
                                League of Legends
                            </div>
                        </Link>
                        <Link to="/category/dota-2">
                            <div className='py-1 px-2 rounded hover:bg-red-700 transition-colors duration-100'>
                                DOTA 2
                            </div>
                        </Link>
                        <Link to="/category/valorant">
                            <div className='py-1 px-2 rounded hover:bg-red-700 transition-colors duration-100'>
                                Valorant
                            </div>
                        </Link>
                        <Link to="/category/csgo">
                            <div className='py-1 px-2 rounded hover:bg-red-700 transition-colors duration-100'>
                                CSGO
                            </div>
                        </Link>
                        <Link to="/category/mlbb">
                            <div className='py-1 px-2 rounded hover:bg-red-700 transition-colors duration-100'>
                                Mobile Legends
                            </div>
                        </Link>
                        <Link to="/category/pubg-mobile">
                            <div className='py-1 px-2 rounded hover:bg-red-700 transition-colors duration-100'>
                                PUBG Mobile
                            </div>
                        </Link>
                    </div>
                    <div className='text-slate-100 mt-5 lg:mt-0 gap-2 flex flex-col lg:flex-row items-center'>
                        {currentUser &&
                            <div className='flex flex-col lg:flex-row items-center gap-2'>
                                <Link>
                                    <div className='py-1 px-2 rounded font-medium hover:bg-red-700 transition-colors duration-100'>
                                        {currentUser.username}
                                    </div>
                                </Link>
                                <Link to={"/write"} onClick={() => setMenuIsOpen(false)}>
                                    <div className='py-1 px-2 rounded font-medium hover:bg-red-700 transition-colors duration-100'>
                                        Write
                                    </div>
                                </Link>
                                <button onClick={() => {
                                    logout()
                                    setMenuIsOpen(false)
                                }} className='py-1 px-2 rounded font-medium hover:bg-red-700 transition-colors duration-100'>
                                    Log Out
                                </button>
                            </div>
                        }

                        {!currentUser &&
                            <Link to={"/login"}>
                                <div className='py-1 px-2 rounded font-medium hover:bg-red-700 transition-colors duration-100'>
                                    Log In
                                </div>
                            </Link>
                        }
                    </div>
                </div>}

                {/* Navbar Large */}
                <div className='gap-2 mt-5 lg:mt-0 hidden lg:flex flex-col lg:flex-row items-center text-slate-100'>
                    <Link to="/">
                        <div className='py-1 px-2 rounded hover:bg-red-700 transition-colors duration-100'>
                            Home
                        </div>
                    </Link>
                    <Link to="/category/league-of-legends">
                        <div className='py-1 px-2 rounded hover:bg-red-700 transition-colors duration-100'>
                            League of Legends
                        </div>
                    </Link>
                    <Link to="/category/dota-2">
                        <div className='py-1 px-2 rounded hover:bg-red-700 transition-colors duration-100'>
                            DOTA 2
                        </div>
                    </Link>
                    <Link to="/category/valorant">
                        <div className='py-1 px-2 rounded hover:bg-red-700 transition-colors duration-100'>
                            Valorant
                        </div>
                    </Link>
                    <Link to="/category/csgo">
                        <div className='py-1 px-2 rounded hover:bg-red-700 transition-colors duration-100'>
                            CSGO
                        </div>
                    </Link>
                    <Link to="/category/mlbb">
                        <div className='py-1 px-2 rounded hover:bg-red-700 transition-colors duration-100'>
                            Mobile Legends
                        </div>
                    </Link>
                    <Link to="/category/pubg-mobile">
                        <div className='py-1 px-2 rounded hover:bg-red-700 transition-colors duration-100'>
                            PUBG Mobile
                        </div>
                    </Link>
                </div>
                <div className='text-slate-100 mt-5 hidden lg:mt-0  gap-2 lg:flex flex-col lg:flex-row items-center'>
                    {currentUser &&
                        <div className='gap-2 lg:flex flex-col lg:flex-row items-center'>
                            <Link>
                                <div className='py-1 px-2 rounded font-medium hover:bg-red-700 transition-colors duration-100'>
                                    {currentUser.username}
                                </div>
                            </Link>
                            <Link to={"/write"}>
                                <div className='py-1 px-2 rounded font-medium hover:bg-red-700 transition-colors duration-100'>
                                    Write
                                </div>
                            </Link>
                            <button onClick={logout} className='py-1 px-2 rounded font-medium hover:bg-red-700 transition-colors duration-100'>
                                Log Out
                            </button>
                        </div>}

                    {!currentUser &&
                        <Link to={"/login"}>
                            <div className='py-1 px-2 rounded font-medium hover:bg-red-700 transition-colors duration-100'>
                                Log In
                            </div>
                        </Link>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar