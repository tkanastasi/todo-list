import React, { useState, useRef } from 'react'

// TODO App.css is a really good place?
import '../App.css'

import { Priority, Task } from './../types'
import { ModalTaskEditor } from './ModalTaskEditor';
import { initialTaskList } from '../taskDataset';

const compareTask: (task1: Task, task2: Task) => number = (() => {
  const priorityValues: string[] = Object.values(Priority);
  const priorityOrder = Object.fromEntries(priorityValues.map((val, i) => [val, i]));
  return ((task1: Task, task2: Task) => {
    if (task1.priority != task2.priority) {
      return priorityOrder[task2.priority] - priorityOrder[task1.priority];
    }
    return task1.storyPoints - task2.storyPoints;    
  });
})();


export function TaskList() {
  const [taskList, setTaskList] = useState<Task[]>(initialTaskList)

  const taskEditorRef = useRef(null);

  const createTask = () => {
    taskEditorRef.current?.createTask();
  }

  const createTaskDone = (task: Task) => {
    setTaskList(lst => [...lst, task])
  };

  const createTaskDiscard = () => {}; 
  
  return (
    <>
      <div className="container mt-4">
        {/* Task Creation Button and Frustration Panel */}
        <div className="row mt-4">
          <div className="col-md-6">
            <button className="btn btn-primary" onClick={createTask}>Create New Task</button>
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
                {taskList.sort(compareTask).map((task, idx) => (
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
        <ModalTaskEditor ref={taskEditorRef} done={createTaskDone} discard={createTaskDiscard}/>
      </div>
      
    </>
  )
}
