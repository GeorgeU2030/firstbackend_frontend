import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import TaskPage from './pages/TaskPage'
import TaskFormPage from './pages/TaskFormPage'
import Navigation from './components/Navigation'
import {Toaster} from 'react-hot-toast'

const App = () => {
  return (
    <BrowserRouter>
    <Navigation/>

    <Routes>
    <Route path='/' element={<Navigate to='/tasks'/>}></Route>
    <Route path='/tasks' element={<TaskPage></TaskPage>}></Route>
    <Route path='/tasks-create' element={<TaskFormPage></TaskFormPage>}></Route>
    <Route path='/tasks/:id' element={<TaskFormPage></TaskFormPage>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
