import React from 'react'

const Logo = () => {
  return (
    <div className="flex items-center gap-5 font-bold text-3xl text-white py-5  ">
      <img
        className="w-10 h-10 animate-wiggle-more animate-infinite"
        src="http://localhost:3000/logo.svg"
        alt="LearnHub logo"
      />
      <span className="animate-fade-right animate-ease-linear animate-normal">LearnHub</span>
    </div>
  )
}

export default Logo
