import { createSelector } from '@ngrx/store';
import { TaskState } from './task.reducer';
import { AppState } from '../app.state';

export const selectTasksState = (state: AppState) => state.tasks;
export const selectQuery = (state: AppState) => state.query;

export const selectTasks =  createSelector(
    selectTasksState,
    selectQuery,
    (state: TaskState, query: string) => state.tasksList.filter(
        (task => task.title.toLowerCase().includes(query.toLowerCase())))
);
export const selectTaskById = (id: string) => createSelector(
    selectTasksState,
    (state: TaskState) => state.tasksList.find(task => task.id === id)
)