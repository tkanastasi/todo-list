import React, { useState, useRef, useEffect } from 'react'

// TODO App.css is a really good place?
import '../App.css'

import { Priority, Task } from './../types'
import { ModalTaskEditor, TaskEditorMode } from './ModalTaskEditor';
import { FrustrationLevel } from './FrustrationLevel';
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
  const [taskFocus, setTaskFocus] = useState<Task|null>(null);
  const [taskEditorMode, setTaskEditorMode] = useState<TaskEditorMode|null>(null);

  const tbodyRef = useRef<HTMLTableSectionElement>(null);

  const createTask = () => {
    const d: TaskEditorMode = {
      kind: 'CreateTaskMode',
      create: ((task: Task) => {
        setTaskList(lst => [...lst, task])
        setTaskFocus(task);        
      }),
      hide: (() => setTaskEditorMode(null)),
      cancel: (() => {return})
    };
    
    setTaskEditorMode(d);
  };

  const editTask = (taskId: number) => {
    const lst = taskList.filter(task => task.id === taskId);
    if (lst.length != 1) {
      return
    }

    const task = lst[0];
    const d: TaskEditorMode = {
      kind: 'EditTaskMode',
      task: task,
      deleteTask: () => {
        const newTasks = taskList.filter(t => (t.id !== taskId));
        setTaskList(newTasks);
      },
      save: (update: Task) => {
        const newTasks = taskList.map(t => (t.id === taskId ? update : t));
        setTaskList(newTasks);
        setTaskFocus(update);
      },
      hide: (() => setTaskEditorMode(null)),
      cancel: (() => {return})      
    };

    setTaskEditorMode(d);

  };
  
  useEffect(() => {
    if (taskFocus) {
      const row = tbodyRef.current?.querySelector(`#task-${taskFocus.id}`)!;
      row.classList.add('highlight');
      row.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        row.classList.remove('highlight');
      }, 2000);
    }
  }, [taskFocus]);

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
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Task Order</th>
                  <th>Task Description</th>
                  <th>Priority</th>
                  <th>Story Points</th>
                </tr>
              </thead>
              <tbody ref={tbodyRef}>
                {taskList.sort(compareTask).map((task, idx) => (
                  <tr key={task.id} id={`task-${task.id}`} onClick={() => { editTask(task.id) }}>
                    <td>{idx}</td>
                    <td className="truncate">{task.description}</td>
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
            <FrustrationLevel temp={taskList.map(t => t.storyPoints).reduce((acc, v) => acc + v, 0)}/>
          </div>
        </div>
        {taskEditorMode && 
          <ModalTaskEditor taskEditorMode={taskEditorMode}/>}
      </div>
    </>
  )
}
