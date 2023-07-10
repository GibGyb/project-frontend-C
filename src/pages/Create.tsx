import React, { FormEvent, useState } from 'react'
import ReactStars from 'react-stars'
import withGuard from '../guards/withGuard'
import classes from './Create.module.css'
import { useAuth } from '../contexts/AuthProvider'
import { host } from '../constant'
import { useNavigate } from 'react-router-dom'

const Create = () => {
  const [rating, setRating] = useState(0)
  const [newVideo, setNewVideo] = useState('')
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)
  const { token } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) return
    setSubmitting(true)

    try {
      const res = await fetch(`${host}/content`, {
        method: 'POST',
        body: JSON.stringify({
          videoUrl: newVideo,
          comment: newComment,
          rating: rating,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      return data
    } catch (err) {
      alert(err)
    } finally {
      setSubmitting(false)
      navigate('/')
    }
  }

  // if (isSubmitting) return <Navigate to="/" />

  const setNewRating = (newRating: number) => {
    setRating(newRating)
  }

  return (
    <div className="flex flex-col items-center my-10 mx-auto ">
      <h1 className="text-3xl font-bold text-emerald-950 pb-3">Create new content</h1>
      <form className=" flex flex-col gap-3 text-lg text-gray-500 font-bold  " onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="video-url">Video URL</label>
          <input
            className="border-gray-500 px-5 border-solid border h-10 rounded-xl w-full hover:border-orange-300"
            type="text"
            id="video-url"
            onChange={(event) => setNewVideo(event.target.value)}
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="comment">Comment (280 characters maximum)</label>
          <input
            className="border-gray-500 px-5 border-solid border h-10 rounded-xl w-full hover:border-orange-300"
            type="text"
            id="comment"
            onChange={(event) => setNewComment(event.target.value)}
          />
        </div>
        <div className="flex flex-col items-start ">
          <div className="flex gap-5 items-center ">
            <label>Rating</label>

            <ReactStars count={5} value={rating} size={28} half={false} color2="#ff731d" onChange={setNewRating} />
          </div>
        </div>
        <div className="flex flex-col py-5">
          <button
            className="border rounded-xl h-10 w-full bg-emerald-950 text-white"
            type="submit"
            disabled={isSubmitting}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  )
}

export default withGuard(Create)
