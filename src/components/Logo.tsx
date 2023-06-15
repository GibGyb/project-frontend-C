import React from 'react'

const Logo = () => {
  return (
    <div className="flex items-center gap-5 font-bold text-3xl text-orange-500 py-5  bg-orange-50">
      <img className="w-10 h-10 " src="http://localhost:3000/logo.svg" alt="LearnHub logo" />
      <span>LearnHub</span>
    </div>
  )
}

export default Logo
