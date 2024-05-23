import { BTask, Task } from "../types";

type DescriptionFail = {
  kind: 'DescriptionFail';
  message: string
}

export type CheckFieldResult = true | DescriptionFail;

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

export type EditorMode = (CreateTaskMode | EditTaskMode) & BaseT

export type EditorProps = {
  taskEditorMode: EditorMode
}

export function checkFields(formState: BTask): CheckFieldResult {
  if (formState.description.trim().length === 0) {
    return { kind: 'DescriptionFail', message: "Enter at least one symbol here"}
  }

  return true;
}

export type EditorActions = {
  cancel: () => void;
  save: () => void;
  deleteTask: () => void;
}

export function getActions(taskEditorMode: EditorMode, formState: BTask): EditorActions {
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

  return { cancel: cancel,
           save: save,
           deleteTask: deleteTask }
}
