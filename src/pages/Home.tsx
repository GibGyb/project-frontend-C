import React from 'react'
import Banner from '../components/Banner'
import ContentList from '../components/ContentList'
import { useAuth } from '../contexts/AuthProvider'
import { Link } from 'react-router-dom'

const Home = () => {
  const { isLoggedIn } = useAuth()

  return (
    <div className="bg-white min-h-screen">
      <Banner />
      {isLoggedIn ? (
        <div className="w-4/5 mx-auto flex justify-between items-center my-10 ">
          <h2 className="text-red-800 font-bold text-3xl ">New Feed</h2>
          <Link to="/new" className="rounded-full bg-emerald-950 text-white p-3 font-bold text-lg ">
            Create new content
          </Link>
        </div>
      ) : (
        <div className="w-4/5 mx-auto flex justify-between items-center my-10 ">
          <h2 className="text-red-800 font-bold text-3xl ">New Feed</h2>
        </div>
      )}
      <ContentList />
    </div>
  )
}

export default Home
