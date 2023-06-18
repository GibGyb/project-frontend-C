import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import { AuthProviderProps, useAuth } from '../contexts/AuthProvider'

const Layout = ({ children }: AuthProviderProps) => {
  const { isLoggedIn, logout } = useAuth()
  return (
    <>
      <header className="flex justify-between items-center py-5 px-10 bg-black">
        <Link to="/">
          <Logo />
        </Link>

        {!isLoggedIn ? (
          <nav className="flex items-center gap-5 font-bold text-white text-xl">
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'text-orange-200' : undefined)}>
              Login
            </NavLink>
            <NavLink to="/register" className={({ isActive }) => (isActive ? 'text-orange-200' : undefined)}>
              Register
            </NavLink>
          </nav>
        ) : (
          <button className="font-bold text-white text-xl" onClick={logout}>
            Logout
          </button>
        )}
      </header>
      <main>{children}</main>
    </>
  )
}

export default Layout
