export enum Priority {
  Low = '🟢',
  Medium = '🟠',
  High = '🔴'
}

export type Task = {
  description: string;
  priority: Priority;
  storyPoints: number;
};
