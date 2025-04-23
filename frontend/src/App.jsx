import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HabitForm from './Component/HabitForm'
import HabitList from './Component/HabitList'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HabitList/>}></Route>
          <Route path='/habit' element={<HabitForm/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
