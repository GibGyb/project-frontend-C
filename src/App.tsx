import React from 'react'
import './App.css'
import Layout from './components/Layout'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/Create'
import AuthProvider from './contexts/AuthProvider'
import Content from './pages/Content'
import Edit from './pages/Edit'
import Regis from './pages/Regis'

function App() {
  return (
    <AuthProvider>
      {/* <Toaster position="top-center" /> */}
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new" element={<Create />} />
          <Route path="/content/:id" element={<Content />} />
          <Route path="/content/:id/edit" element={<Edit />} />
          <Route path="/register" element={<Regis />} />
        </Routes>
      </Layout>
    </AuthProvider>
  )
}

export default App
