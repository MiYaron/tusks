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
        tasksList: [...state.tasksList, task]
  })),
  on(TaskActions['[Tasks]EditTask'], (state, {task}) => {
    const updatedList = state.tasksList.map(existingTask => {
      if (existingTask.id === task.id) {
        return {
          ...existingTask,
          title: task.title,
          desc: task.desc,
          deadline: task.deadline
        };
      }
      return existingTask;
    });

    return {
      ...state,
      tasksList: updatedList
    };
  }),
  on(TaskActions['[Tasks]MarkAsDone'], (state, {id}) => ({
    ...state,
    tasksList: state.tasksList.map ((task) => 
      task.id === id ? { ...task, isDone: !task.isDone } : task
    )
  })),
  on(TaskActions['[Tasks]RemoveTask'], (state, {id}) => ({
    ...state,
    tasksList: state.tasksList.filter((task) => task.id !== id)
  })),

  on(StorageActions['[Storage]LoadTasks'], (state) => ({
    ...state,
    status: 'loading' as 'loading'
  })),
  on(StorageActions['[Storage]LoadSuccess'], (state, {tasks}) => ({
    ...state,
    tasksList: tasks,
    error: null,
    status: 'success' as 'success',
  })),
  on (StorageActions['[Storage]LoadFailure'], (state, {error}) => ({
    ...state,
    error: error,
    status: 'error' as 'error'
  }))

);