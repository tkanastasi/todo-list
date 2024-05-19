// import React from 'react'
import { Priority, Task } from '../types'
import { forwardRef, useImperativeHandle, useState } from 'react'

type CreateTask = {
  done: (task: Task) => void;
  discard: () => void;
}

type DescriptionFail = {
  kind: 'DescriptionFail';
  message: string
}

type CheckFieldResult = true | DescriptionFail;

function checkFields(description: string): CheckFieldResult {
  if (description.trim().length === 0) {
    return { kind: 'DescriptionFail', message: "Enter at least one symbol here"}
  }

  return true;
}

export const ModalTaskEditor = forwardRef((props: CreateTask, ref) => {
  const [visibilityState, setVisibilityState] = useState(false);
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>(Priority.Low);
  const [storyPoints, setStoryPoints] = useState<number>(1);

  const priorityEntries = Object.entries(Priority) as [string, Priority][];

  const dialogTitle = "New Task";
  
  const checkFieldResult = checkFields(description)

  const hide = () => {
    setVisibilityState(false);
  };

  const cancel = () => {
    hide();
    props.discard();
  };

  const save = () => {
    const task: Task = {
      description,
      priority,
      storyPoints
    };

    hide();
    props.done(task);
  };

  useImperativeHandle(ref, () => ({
    createTask() {
      setVisibilityState(true);
    }
  }));

  return (
    <div className={`modal ${visibilityState ? 'show d-block' : 'fade'}`} id="taskModal" tabIndex={-1} aria-labelledby="taskModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="taskModalLabel">{dialogTitle}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="taskDescription" className="form-label">Task Description</label>
                <textarea 
                  className="form-control" 
                  id="taskDescription" 
                  placeholder={checkFieldResult !== true && checkFieldResult.kind === 'DescriptionFail' ? checkFieldResult.message : ""} 
                  rows={3}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="taskPriority" className="form-label">Priority</label>
                <select 
                  className="form-select" 
                  id="taskPriority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                >
                  {priorityEntries.map(([key, value]) => (
                    <option value={value}>{value} {key}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="taskStoryPoints" className="form-label">Story Points</label>
                <input 
                  type="number" 
                  className="form-control" 
                  id="taskStoryPoints" 
                  placeholder="Enter story points"
                  value={storyPoints}
                  onChange={(e) => {
                    setStoryPoints(Number(e.target.value));
                  }}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={cancel}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={save} disabled={checkFieldResult !== true}>Save</button>
          </div>
        </div>
      </div>
    </div>
  )
});
