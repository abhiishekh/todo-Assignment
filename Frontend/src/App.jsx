import React from 'react'
import {  Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './Home'
import Todo from './Todo'

const todo = [{
  id:1,
  title:"abhishek",
  description:"hello this is abhishek",
  deadline:'2024-11-25'
},
{
  id:2,
  title:"abhishek",
  description:"hello this is abhishek",
  deadline:'2024-11-25'
},
{
  id:3,
  title:"abhishek",
  description:"hello this is abhishek",
  deadline:'2024-11-25'
},
]
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/create-todo' element={<Todo/>}/>


    </Routes>
    </BrowserRouter>
  )
}

export default App
