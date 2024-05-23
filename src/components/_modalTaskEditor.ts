import { BTask, Task } from "../types";

type DescriptionFail = {
  kind: 'DescriptionFail';
  message: string
}

export type CheckFieldResult = true | DescriptionFail;

type CreateTaskMode = {
  kind: 'CreateTaskMode'
  create: (t: BTask) => void;
}

type EditTaskMode = {
  kind: 'EditTaskMode';
  task: Task;
  deleteTask: () => void;
  save: (update: BTask) => void;
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

export function getActions(editorMode: EditorMode, formState: BTask): EditorActions {
  const cancel = () => {
    editorMode.hide();
  };
  
  const save = () => {
    const task: BTask = {
      description: formState.description,
      priority: formState.priority,
      storyPoints: formState.storyPoints
    };

    editorMode.hide();

    if (editorMode.kind === 'CreateTaskMode') {
      editorMode.create(task);
    } else if (editorMode.kind === 'EditTaskMode') {
      editorMode.save(task);
    }
  };

  const deleteTask = () => {
    if (editorMode.kind !== 'EditTaskMode') {
      return
    }
    
    editorMode.deleteTask();
    editorMode.hide();
  }

  return { cancel: cancel,
           save: save,
           deleteTask: deleteTask }
}
