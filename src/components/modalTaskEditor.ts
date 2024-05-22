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

export type TaskEditorMode = (CreateTaskMode | EditTaskMode) & BaseT

export type TaskEditorProps = {
  taskEditorMode: TaskEditorMode
}

export function checkFields(formState: BTask): CheckFieldResult {
  if (formState.description.trim().length === 0) {
    return { kind: 'DescriptionFail', message: "Enter at least one symbol here"}
  }

  return true;
}
