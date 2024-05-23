import { Task, Priority } from "../types";

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
