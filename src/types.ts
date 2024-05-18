export enum Priority {
  Low = 'Low',
  Moderate = 'Moderate',
  High = 'High'
}

export type Task = {
  description: string;
  priority: Priority;
  storyPoints: number;
};
