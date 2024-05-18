// import React from 'react'
import { Priority } from '../types'
import { forwardRef, useImperativeHandle, useState } from 'react'

export const ModalTaskEditor = forwardRef((_, ref) => {
  const [visibilityState, setVisibilityState] = useState(true);
  const priorityEntries = Object.entries(Priority) as [string, Priority][];

  const hide = () => {
    setVisibilityState(false);
  };

  useImperativeHandle(ref, () => ({
    openDialog() {
      setVisibilityState(true);
    }
  }));

  return (
    <div className={`modal ${visibilityState ? 'show d-block' : 'fade'}`} id="taskModal" tabIndex={-1} aria-labelledby="taskModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="taskModalLabel">Edit Task</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="taskDescription" className="form-label">Task Description</label>
                <textarea 
                  className="form-control" 
                  id="taskDescription" 
                  placeholder="Enter task description" 
                  rows={3}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="taskPriority" className="form-label">Priority</label>
                <select className="form-select" id="taskPriority">
                  {priorityEntries.map(([key, value]) => (
                    <option value={key}>{value}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="taskStoryPoints" className="form-label">Story Points</label>
                <input type="number" className="form-control" id="taskStoryPoints" placeholder="Enter story points" />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={hide}>Cancel</button>
            <button type="button" className="btn btn-primary">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  )
});
