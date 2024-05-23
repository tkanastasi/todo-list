// import React from 'react'
import { Priority, BTask } from '../types'
import React, { useState } from 'react'
import { EditorProps, checkFields, getActions } from './_modalTaskEditor';
export * from './_modalTaskEditor'

const storyPointOptions = [1, 2, 3, 5, 8, 13];

export const ModalTaskEditor: React.FC<EditorProps> = ({ taskEditorMode }) => {
  const [formState, setFormState] = useState<BTask>(taskEditorMode.kind === 'EditTaskMode' ? 
                                                     (taskEditorMode.task) :
                                                     { description: "",
                                                       priority: Priority.Low,
                                                       storyPoints: storyPointOptions[0]
                                                     });

  const priorityEntries = Object.entries(Priority) as [string, Priority][];
  const dialogTitle = taskEditorMode.kind === 'CreateTaskMode' ? 'New Task' : 'Edit Task';
  const checkFieldResult = checkFields(formState)
  const { cancel, save, deleteTask } = getActions(taskEditorMode, formState);

  return (
    <div className="modal show d-block" id="taskModal" tabIndex={-1} aria-labelledby="taskModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content bordered">
          <div className="modal-header">
            <h5 className="modal-title bold" id="taskModalLabel">{dialogTitle}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={cancel}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="taskDescription" className="form-label bold">Task Description</label>
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
                <label htmlFor="taskPriority" className="form-label bold">Priority</label>
                <div>
                  {priorityEntries.map(([key, value]) => (
                    <button
                      type="button"
                      key={value}
                      className={`btn btn-outline-secondary me-2 ${formState.priority === value ? 'active' : ''}`}
                      onClick={() => setFormState(s => ({...s, priority: value}))}
                    >
                      {key} <img src={`${value}.svg`} alt={value} style={{ width: '20px' }} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="taskStoryPoints" className="form-label bold">Story Points</label>
                <div>
                  {storyPointOptions.map((point) => (
                    <button
                      type="button"
                      key={point}
                      className={`btn btn-outline-secondary me-2 ${formState.storyPoints === point ? 'active' : ''}`}
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
