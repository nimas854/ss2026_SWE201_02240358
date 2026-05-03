export interface Task {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  color: string;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  progress: number;
  tasksTotal: number;
  tasksDone: number;
}

export interface ScheduleItem {
  id: string;
  subject: string;
  time: string;
  duration: string;
  room: string;
  color: string;
}

export const SUBJECTS: Subject[] = [
  { id: '1', name: 'Mathematics', icon: '📐', color: '#6C63FF', progress: 72, tasksTotal: 8, tasksDone: 6 },
  { id: '2', name: 'Physics', icon: '⚡', color: '#FF6584', progress: 55, tasksTotal: 6, tasksDone: 3 },
  { id: '3', name: 'Computer Sci.', icon: '💻', color: '#00C48C', progress: 90, tasksTotal: 10, tasksDone: 9 },
  { id: '4', name: 'Literature', icon: '📚', color: '#FFB830', progress: 40, tasksTotal: 5, tasksDone: 2 },
  { id: '5', name: 'Chemistry', icon: '🧪', color: '#A29BFF', progress: 65, tasksTotal: 7, tasksDone: 4 },
  { id: '6', name: 'History', icon: '🏛️', color: '#FF6584', progress: 30, tasksTotal: 4, tasksDone: 1 },
];

export const TASKS: Task[] = [
  { id: '1', title: 'Calculus Problem Set', subject: 'Mathematics', dueDate: 'Today', priority: 'high', completed: false, color: '#6C63FF' },
  { id: '2', title: 'Lab Report Write-up', subject: 'Physics', dueDate: 'Tomorrow', priority: 'high', completed: false, color: '#FF6584' },
  { id: '3', title: 'Algorithm Assignment', subject: 'Computer Sci.', dueDate: 'May 5', priority: 'medium', completed: true, color: '#00C48C' },
  { id: '4', title: 'Essay Draft', subject: 'Literature', dueDate: 'May 6', priority: 'medium', completed: false, color: '#FFB830' },
  { id: '5', title: 'Organic Chemistry Quiz', subject: 'Chemistry', dueDate: 'May 7', priority: 'low', completed: false, color: '#A29BFF' },
  { id: '6', title: 'Timeline Worksheet', subject: 'History', dueDate: 'May 8', priority: 'low', completed: true, color: '#FF6584' },
];

export const SCHEDULE: ScheduleItem[] = [
  { id: '1', subject: 'Mathematics', time: '08:00', duration: '1.5h', room: 'Hall A-204', color: '#6C63FF' },
  { id: '2', subject: 'Physics', time: '10:00', duration: '2h', room: 'Lab B-101', color: '#FF6584' },
  { id: '3', subject: 'Computer Sci.', time: '13:00', duration: '1h', room: 'Lab C-301', color: '#00C48C' },
  { id: '4', subject: 'Literature', time: '15:00', duration: '1h', room: 'Hall A-105', color: '#FFB830' },
];
