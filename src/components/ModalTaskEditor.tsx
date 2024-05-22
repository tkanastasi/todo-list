// import React from 'react'
import { Priority, Task, BTask } from '../types'
import { useState } from 'react'

type DescriptionFail = {
  kind: 'DescriptionFail';
  message: string
}

type CheckFieldResult = true | DescriptionFail;

function checkFields(formState: BTask): CheckFieldResult {
  if (formState.description.trim().length === 0) {
    return { kind: 'DescriptionFail', message: "Enter at least one symbol here"}
  }

  return true;
}

const storyPointOptions = [1, 2, 3, 5, 8, 13];

type CreateTaskMode = {
  kind: 'CreateTaskMode'
  create: (t: Task) => void;
}

type EditTaskMode = {
  kind: 'EditTaskMode';
  task: Task;
  deleteTask: () => void;
  save: (t: Task) => void;
}

type BaseT = {
  hide: () => void;
}

export type TaskEditorMode = (CreateTaskMode | EditTaskMode) & BaseT

type TaskEditorProps = {
  taskEditorMode: TaskEditorMode
}

export const ModalTaskEditor: React.FC<TaskEditorProps> = ({ taskEditorMode }) => {
  const [formState, setFormState] = useState<BTask>(taskEditorMode.kind === 'EditTaskMode' ? 
                                                     (taskEditorMode.task as BTask) :
                                                     { description: "",
                                                       priority: Priority.Low,
                                                       storyPoints: storyPointOptions[0]
                                                     });

  const priorityEntries = Object.entries(Priority) as [string, Priority][];
  const dialogTitle = taskEditorMode.kind === 'CreateTaskMode' ? 'New Task' : 'Edit Task';
  const checkFieldResult = checkFields(formState)

  const cancel = () => {
    taskEditorMode.hide();
  };
  
  const save = () => {
    const task: Task = {
      id: taskEditorMode.kind === 'EditTaskMode' ? taskEditorMode.task.id : Date.now(),
      description: formState.description,
      priority: formState.priority,
      storyPoints: formState.storyPoints
    };

    taskEditorMode.hide();

    if (taskEditorMode.kind === 'CreateTaskMode') {
      taskEditorMode.create(task);
    } else if (taskEditorMode.kind === 'EditTaskMode') {
      taskEditorMode.save(task);
    }
  };

  const deleteTask = () => {
    if (taskEditorMode.kind !== 'EditTaskMode') {
      return
    }
    
    taskEditorMode.deleteTask();
    taskEditorMode.hide();
  }

  return (
    <div className="modal show d-block" id="taskModal" tabIndex={-1} aria-labelledby="taskModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="taskModalLabel">{dialogTitle}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={cancel}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="taskDescription" className="form-label">Task Description</label>
                <textarea 
                  className="form-control" 
                  id="taskDescription" 
                  placeholder={checkFieldResult !== true && checkFieldResult.kind === 'DescriptionFail' ? checkFieldResult.message : ""} 
                  rows={4}
                  autoFocus={ taskEditorMode.kind === 'CreateTaskMode' }
                  value={formState.description}
                  onChange={(e) => {
                    setFormState(s => ({...s, description: e.target.value}));
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="taskPriority" className="form-label">Priority</label>
                <div>
                  {priorityEntries.map(([key, value]) => (
                    <button
                      type="button"
                      key={value}
                      className={`btn btn-outline-primary me-2 ${formState.priority === value ? 'active' : ''}`}
                      onClick={() => setFormState(s => ({...s, priority: value}))}
                    >
                      {key} {value}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="taskStoryPoints" className="form-label">Story Points</label>
                <div>
                  {storyPointOptions.map((point) => (
                    <button
                      type="button"
                      key={point}
                      className={`btn btn-outline-primary me-2 ${formState.storyPoints === point ? 'active' : ''}`}
                      onClick={() => {
                        setFormState(s => ({...s, storyPoints: point}));
                      }}
                    >
                      {point}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={cancel}>Cancel</button>
            <button type="button" className="btn btn-success" onClick={save} disabled={checkFieldResult !== true}>Save</button>
            { taskEditorMode.kind === 'EditTaskMode' && 
              <button type="button" className="btn btn-danger" onClick={deleteTask}>Delete</button> }
          </div>
        </div>
      </div>
    </div>
  )
}
