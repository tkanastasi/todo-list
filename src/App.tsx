import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <>
      <div className="container mt-4 vh-100">
        {/* Title */}
        <div className="row">
          <div className="col">
            <h1 className="text-center">ToDoList</h1>
          </div>
        </div>

        {/* Task Creation Button and Frustration Panel */}
        <div className="row mt-4">
          <div className="col-md-6">
            <button className="btn btn-primary">Create New Task</button>
          </div>
          <div className="col-md-6 text-right">
            <span className="h5">Frustration Level: 5 😟</span>
          </div>
        </div>

        {/* Task Table */}
        <div className="row mt-4 v-100">
          <div className="col-12 table-container v-100">
            <table className="table table-striped v-100">
              <thead>
                <tr>
                  <th>Task Order</th>
                  <th>Task Description</th>
                  <th>Priority</th>
                  <th>Story Points</th>
                </tr>
              </thead>
              <tbody className="vh-100">
                <tr>
                  <td>1</td>
                  <td>Complete the project documentation</td>
                  <td>High</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Implement authentication</td>
                  <td>Moderate</td>
                  <td>8</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Implement authentication</td>
                  <td>Moderate</td>
                  <td>8</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Implement authentication</td>
                  <td>Moderate</td>
                  <td>8</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Implement authentication</td>
                  <td>Moderate</td>
                  <td>8</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Implement authentication</td>
                  <td>Moderate</td>
                  <td>8</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Implement authentication</td>
                  <td>Moderate</td>
                  <td>8</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Implement authentication</td>
                  <td>Moderate</td>
                  <td>8</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Implement authentication</td>
                  <td>Moderate</td>
                  <td>8</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Implement authentication</td>
                  <td>Moderate</td>
                  <td>8</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Implement authentication</td>
                  <td>Moderate</td>
                  <td>8</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Implement authentication</td>
                  <td>Moderate</td>
                  <td>8</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Implement authentication</td>
                  <td>Moderate</td>
                  <td>8</td>
                </tr>

                {/* Additional tasks here */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default App
