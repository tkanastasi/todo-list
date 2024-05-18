import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TaskList } from './components/TaskList'
import { ModalTaskEditor } from './components/ModalTaskEditor'

function App() {
  return (
    <>
      <div className="container mt-4">
        {/* Title */}
        <div className="row">
          <div className="col">
            <h1 className="text-center">ToDoList</h1>
          </div>
        </div>
        <TaskList/>
        <ModalTaskEditor/>
      </div>
    </>
  )
}

export default App
