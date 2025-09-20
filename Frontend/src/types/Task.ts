export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

export type TaskStatus = 'PENDING' | 'COMPLETED';