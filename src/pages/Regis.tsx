import React, { FormEvent, useState } from 'react'
import classes from './Create.module.css'
import { host } from '../constant'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Regis = () => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)
  //   const { token } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // if (isSubmitting) return

    try {
      setSubmitting(true)
      const res = await fetch(`${host}/user`, {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          name: name,
          password: password,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      if (confirmPassword !== password) {
        alert('Confirm password does not match')
        navigate('/register')
      } else {
        navigate('/login')
      }
      const data = await res.json()
      return data
    } catch (err) {
      alert(err)
    } finally {
      setSubmitting(false)
    }
  }

  // if (isSubmitting) return <Navigate to="/" />

  return (
    <div className="flex flex-col items-center my-10 ">
      <h1 className="text-3xl font-bold text-emerald-950 pb-3">Register</h1>

      <form className=" flex flex-col gap-3 text-lg text-gray-500 font-bold  " onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input
            className="border-gray-500 px-5 border-solid border h-10 rounded-xl w-80 hover:border-orange-300"
            type="text"
            id="username"
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="Input name">Your name</label>
          <input
            className="border-gray-500 px-5 border-solid border h-10 rounded-xl hover:border-orange-300"
            type="text"
            id="name"
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            className="border-gray-500 px-5 border-solid border h-10 rounded-xl hover:border-orange-300"
            type="password"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Confirm Password</label>
          <input
            className="border-gray-500 px-5 border-solid border h-10 rounded-xl hover:border-orange-300"
            type="password"
            id="password"
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </div>
        <div className="flex flex-col py-5">
          <button className="border rounded-xl h-10 bg-emerald-950 text-white" type="submit" disabled={isSubmitting}>
            Login
          </button>
        </div>
      </form>

      <h2 className={classes.subtitle}>
        <Link to="/register">{`Already have an account? Login`}</Link>
      </h2>
    </div>
  )
}

export default Regis
