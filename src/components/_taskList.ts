import { Task, Priority, ID, BTask } from "../types";
import { EditorMode } from "./_modalTaskEditor";

export const compareTask: (task1: Task, task2: Task) => number = (() => {
  const priorityValues: string[] = Object.values(Priority);
  const priorityOrder = Object.fromEntries(priorityValues.map((val, i) => [val, i]));
  return ((task1: Task, task2: Task) => {
    if (task1.priority != task2.priority) {
      return priorityOrder[task2.priority] - priorityOrder[task1.priority];
    }
    return task1.storyPoints - task2.storyPoints;    
  });
})();

export type TaskListActions = {
  deleteTask: (taskId: ID) => void;
  createTask: (task: BTask) => ID;
  editTask: (update: Task) => void;
  searchByID: (taskId: ID) => Task | null;
}

export function getTaskListActions(taskList: Task[], 
                setTaskList: (update: Task[]) => void): TaskListActions {
  return {
    deleteTask: (({ id }) => {
      const newTasks = taskList.filter(t => (t.id !== id));
      setTaskList(newTasks);
    }),

    createTask: ((bTask: BTask) => {
      const task: Task = {
        ...bTask,
        id: Date.now(),
      };

      const newTasks = [...taskList, task];
      setTaskList(newTasks);
      return task;
    }),

    editTask: ((update) => {
      console.log(`update: ${update.id} ${update.description}`);
      const newTasks = taskList.map(t => (t.id === update.id ? update : t));
      setTaskList(newTasks);
    }),

    searchByID: (({ id }) => {
      const lst = taskList.filter(task => task.id === id);
      if (lst.length == 0) {
        return null;
      }
      return lst[0];
    })
  }
}

export type EditorModeSetters = {
  setCreateMode: () => void;
  setEditMode: (taskID: ID) => void;
}

export function getEditorModeSetters(taskListActions: TaskListActions,
                setTaskEditorMode: (mode: EditorMode | null) => void,
                setTaskFocus: (task: ID) => void): EditorModeSetters {

  const hideEditorWindow = () => setTaskEditorMode(null);
  
  const setCreateMode = () => {
    const d: EditorMode = {
      kind: 'CreateTaskMode',
      create: ((task: BTask) => {
        const id = taskListActions.createTask(task);
        setTaskFocus(id);
      }), 
      hide: hideEditorWindow
    };
    setTaskEditorMode(d);
  };

  const setEditMode = (taskId: ID) => {
    const task = taskListActions.searchByID(taskId)
    if (!task) {
      return;
    }

    const d: EditorMode = {
      kind: 'EditTaskMode',
      task: task,
      deleteTask: () => taskListActions.deleteTask(taskId),
      save: (update: BTask) => {
        taskListActions.editTask({ ...update, id: taskId.id});
        setTaskFocus(taskId);
      },
      hide: hideEditorWindow
    };
    setTaskEditorMode(d);
  };

  return {
    setCreateMode,
    setEditMode,
  }
}
