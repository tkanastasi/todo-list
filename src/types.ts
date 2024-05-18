export type Priority = 'Low' | 'Moderate' | 'High';

export type Task = {
  description: string;
  priority: Priority;
  storyPoints: number;
};

