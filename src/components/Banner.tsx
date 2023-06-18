import React from 'react'

const Banner = () => {
  return (
    <div>
      <div className="flex flex-col gap-5 py-20 px-20 bg-emerald-950  ">
        <div className="flex justify-between mx-20">
          <div>
            <h1 className="text-white  text-4xl font-bold ">LearnHub</h1>
            <h2 className="text-amber-100 text-lg font-semibold">Hub for Educational Videos</h2>
          </div>
          <div className="flex gap-5 ">
            <img
              className="w-20 h-20 animate-rotate-y animate-infinite animate-duration-[4000ms] animate-ease-out"
              src="tree1.png"
            />
            <img
              className="w-20 h-20 animate-wiggle-more animate-infinite animate-ease-linear animate-normal"
              src="tree2.png"
            />
            <img
              className="w-20 h-20 animate-rotate-y animate-infinite animate-duration-[4000ms] animate-ease-out"
              src="tree3.png"
            />
            <img
              className="w-20 h-20 animate-wiggle-more animate-infinite animate-ease-linear animate-normal"
              src="tree4.png"
            />
            <img
              className="w-20 h-20 animate-rotate-y animate-infinite animate-duration-[4000ms] animate-ease-out"
              src="tree1.png"
            />
            <img
              className="w-20 h-20 animate-wiggle-more animate-infinite animate-ease-linear animate-normal"
              src="tree2.png"
            />
            <img
              className="w-20 h-20 animate-rotate-y animate-infinite animate-duration-[4000ms] animate-ease-out"
              src="tree3.png"
            />
            <img
              className="w-20 h-20 animate-wiggle-more animate-infinite animate-ease-linear animate-normal"
              src="tree4.png"
            />
          </div>
        </div>
        <img className=" h-20 w-40 absolute right-40 top-60 animate-bounce animate-ease-out" src="dog.png" />
        <img className=" h-5 w-10 absolute right-80 top-60 animate-bounce animate-ease-out" src="bone.png" />
      </div>
    </div>
  )
}

export default Banner
