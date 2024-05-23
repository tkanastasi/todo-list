import { useState, useRef, useEffect } from 'react'

// TODO App.css is a really good place?
import '../App.css'

import { Task, ID } from './../types'
import { ModalTaskEditor, EditorMode } from './ModalTaskEditor';
import { FrustrationLevel } from './FrustrationLevel';
import { initialTaskList } from '../taskDataset';
import { EditorModeSetters, TaskListActions, compareTask, getEditorModeSetters, getTaskListActions } from './_taskList';

export function TaskList() {
  const [taskList, setTaskList] = useState<Task[]>(initialTaskList)
  const [taskFocus, setTaskFocus] = useState<ID|null>(null);
  const [taskEditorMode, setTaskEditorMode] = useState<EditorMode|null>(null);

  const taskListActions: TaskListActions = getTaskListActions(taskList, setTaskList);
  const {setCreateMode, setEditMode}: EditorModeSetters = getEditorModeSetters(taskListActions,
                                                                    setTaskEditorMode,
                                                                    setTaskFocus)
    
  const tbodyRef = useRef<HTMLTableSectionElement>(null);
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
      <div>
        {/* Task Creation Button and Frustration Panel */}
        <div className="row">
          <div className="col">
            <button className="btn btn-info bordered" onClick={setCreateMode}>Create New Task</button>
          </div>
        </div>

        {/* Task Table */}
        <div className="row mt-3">
          <div className="col flex-grow-1">
            <div className="task-list-container bordered rounded">
              <table className="table table-bordered task-list-table table-striped table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Task Description</th>
                    <th>Priority</th>
                    <th>Story Points</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody ref={tbodyRef}>
                  {taskList.sort(compareTask).map((task, idx) => (
                    <tr key={task.id} id={`task-${task.id}`}>
                      <td className="text-center">{idx + 1}</td>
                      <td className="truncate">{task.description}</td>
                      <td className="text-center">
                        <img src={`${task.priority}.svg`}  
                             style={{width: '20px'}}/>
                      </td>
                      <td className="text-center">{task.storyPoints}</td>
                        <td className="text-center">
                            <img src="edit-v2.png" 
                                 style={{width: '20px'}} 
                                 onClick={() => setEditMode(task)}/>
                            <img src="delete-v2.png" 
                                 style={{width: '20px', marginLeft: '10px'}}
                                 onClick={() => taskListActions.deleteTask(task)}/>
                        </td>
                     </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col frustration-flex">
            <FrustrationLevel temp={taskList.map(t => t.storyPoints).reduce((acc, v) => acc + v, 0)}/>
          </div>
        </div>
        <div>
        {taskEditorMode && 
          <ModalTaskEditor taskEditorMode={taskEditorMode}/>}
        </div>
      </div>
    </>
  )
}
