import React, { useState } from 'react'

// TODO App.css is a really good place?
import '../App.css'

import { Priority, Task } from './types'

const initialTaskList: Task[] = [
    { description: "Tidy my room" 
    , priority: 'Moderate'
    , storyPoints: 5 }
  , { description: "Go shopping"
    , priority: 'Moderate'
    , storyPoints: 3 }
  , { description: "Cook breakfast"
    , priority: 'High'
    , storyPoints: 1 }  
];

export function TaskList() {
  const [taskList, editTaskList] = useState<Task[]>(initialTaskList)
  
  return (
    <>
      <div className="container mt-4">
        {/* Task Creation Button and Frustration Panel */}
        <div className="row mt-4">
          <div className="col-md-6">
            <button className="btn btn-primary">Create New Task</button>
          </div>
        </div>

        {/* Task Table */}
        <div className="row mt-4">
          <div className="table-container">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Task Order</th>
                  <th>Task Description</th>
                  <th>Priority</th>
                  <th>Story Points</th>
                </tr>
              </thead>
              <tbody>
                {taskList.map((task, idx) => (
                  <tr>
                    <td>{idx}</td>
                    <td>{task.description}</td>
                    <td>{task.priority}</td>
                    <td>{task.storyPoints}</td>
                   </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-6 text-right">
            <span className="h5">Frustration Level: 5 😟</span>
          </div>
        </div>
      </div>
      
    </>
  )
}
