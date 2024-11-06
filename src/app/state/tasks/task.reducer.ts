import { createReducer, on } from '@ngrx/store';
import { StorageActions, TaskActions } from './task.actions';
import { Task } from '../../tasks/task.model';

export const taskFeatureKey = 'task';

export interface TaskState {
  tasksList: Task[];
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: TaskState = {
  tasksList: [],
  error: null,
  status: 'pending',
};

export const tasksReducer = createReducer(
  initialState,
  on(TaskActions['[Tasks]AddTask'], (state, {task}) => ({
    ...state,
    tasksList: [...state.tasksList, task],
  }))
);