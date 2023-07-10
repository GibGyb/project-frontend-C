import React, { FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactStars from 'react-stars'
import Loading from '../components/Loading'
import { useAuth } from '../contexts/AuthProvider'
import withGuard from '../guards/withGuard'
import useContent from '../hooks/useContent'
import classes from './Edit.module.css'
import { host } from '../constant'

const Edit = () => {
  const { id } = useParams()
  const {
    status: { error, loading, ready },
    data,
    editPost,
  } = useContent(id || '')

  // Hint: we may need auth token to patch the upcoming content
  const { token, getAuthHeader } = useAuth()
  // ORrrrrr, if you decided to put logic in `editPost` function instead, like useAuth() under useContent(), we'd certainly don't need for this line

  const [rating, setRating] = useState(0)
  const [isSubmitting, setSubmitting] = useState(false)
  const [editComment, setEditComment] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${host}/content/${id}`)
        const data = await res.json()

        setRating(data.rating)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()

    // TODO: What should happen if we later received current content's rating?
  }, [data])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return
    setSubmitting(true)

    try {
      await editPost({
        comment: editComment,
        rating: rating,
      })
      // location.reload()
      navigate(`/content/${id}`)

      // TODO: Try patch new content to server
    } catch (err: any) {
      // TODO: Handling error

      throw new Error(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (!ready) return <Loading />

  const { comment } = data!

  const setEditRating = (editRating: number) => {
    setRating(editRating)
  }

  return (
    <div className="flex flex-col items-center my-10 ">
      <h1 className="text-3xl font-bold text-emerald-950 pb-3">Edit content</h1>
      <form className=" flex flex-col gap-3 text-lg text-gray-500 font-bold  " onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="comment">Comment (280 characters maximum)</label>
          <input
            className="border-2 px-3 my-3 rounded-xl border-gray-500 hover:border-orange-500 w-full"
            type="text"
            id="comment"
            defaultValue={comment}
            onChange={(event) => setEditComment(event.target.value)}
          />
        </div>
        <div className={classes.formGroup}>
          <div className="flex gap-5">
            <label>Rating</label>
            <ReactStars count={5} value={rating} size={28} half={false} color2="#ff731d" onChange={setEditRating} />
          </div>
        </div>
        <div className="flex w-full bg-emerald-950 text-white justify-center h-10 rounded-xl items-center ">
          <button type="submit" disabled={isSubmitting}>
            Edit
          </button>
        </div>
      </form>
    </div>
  )
}

export default withGuard(Edit)
