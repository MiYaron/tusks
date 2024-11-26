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
  on(TaskActions['add'], (state, { task }) => ({
    ...state,
    tasksList: [...state.tasksList, task],
  })),
  on(TaskActions['edit'], (state, { task }) => ({
    ...state,
    tasksList: state.tasksList.map((currTask) =>
      currTask.id !== task.id ? currTask : task
    ),
  })),
  on(TaskActions['mark'], (state, { id }) => ({
    ...state,
    tasksList: state.tasksList.map((task) =>
      task.id === id ? { ...task, isDone: !task.isDone } : task
    ),
  })),
  on(TaskActions['remove'], (state, { id }) => ({
    ...state,
    tasksList: state.tasksList.filter((task) => task.id !== id),
  })),

  on(StorageActions['load'], (state) => ({
    ...state,
    status: 'loading' as 'loading',
  })),
  on(StorageActions['onSuccess'], (state, { tasks }) => ({
    ...state,
    tasksList: tasks,
    error: null,
    status: 'success' as 'success',
  })),
  on(StorageActions['onFailure'], (state, { error }) => ({
    ...state,
    error: error,
    status: 'error' as 'error',
  }))
);
