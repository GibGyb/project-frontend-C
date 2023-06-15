import React from 'react'
import './App.css'
import Layout from './components/Layout'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return (
    <div>
      <Layout />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Login />
    </div>
  )
}

export default App
