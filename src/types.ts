export enum Priority {
  Low = 'L',
  Medium = 'M',
  High = 'H'
}

export type ID = {
  id: number;
}

export type BTask = {
  description: string;
  priority: Priority;
  storyPoints: number;
}

export type Task = ID & BTask
