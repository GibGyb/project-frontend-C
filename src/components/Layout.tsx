import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import { useAuth } from '../contexts/AuthProvider'

const Layout = () => {
  const { isLoggedIn, logout } = useAuth()
  return (
    <>
      <header className="flex justify-between items-center py-5 px-10 bg-orange-50">
        <Link to="/">
          <Logo />
        </Link>

        {!isLoggedIn ? (
          <nav className="flex items-center gap-5 font-bold text-orange-500 text-xl">
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'text-red-600' : undefined)}>
              Login
            </NavLink>
            <NavLink to="/register" className={({ isActive }) => (isActive ? 'text-red-600' : undefined)}>
              Register
            </NavLink>
          </nav>
        ) : (
          <button className="font-bold text-orange-500 text-xl" onClick={logout}>
            Logout
          </button>
        )}
      </header>
    </>
  )
}

export default Layout
