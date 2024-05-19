export enum Priority {
  Low = 'L',
  Medium = 'M',
  High = 'H'
}

export type Task = {
  id: number; 
  description: string;
  priority: Priority;
  storyPoints: number;
};
