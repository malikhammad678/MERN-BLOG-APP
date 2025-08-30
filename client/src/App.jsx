import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Dashboard from './pages/admin/dashboard'
import Layout from './pages/admin/Layout'
import AddBlog from './pages/admin/AddBlog'
import ListBlog from './pages/admin/ListBlog'
import Comment from './pages/admin/Comment'
import Login from './components/admin/Login'

import 'quill/dist/quill.snow.css' 

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path='/blog/:_id' element={ <Blog /> } />
      <Route path='/admin' element={ true ? <Layout /> : <Login /> }>
        <Route index  element={ <Dashboard /> } />
        <Route path='add-blog' element={ <AddBlog /> } />
        <Route path='list-blog' element={ <ListBlog /> } />
        <Route path='comments' element={ <Comment /> } />
      </Route>
      </Routes>  
    </>
  )
}

export default App
