import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.reducer';

export interface AppState {
    tasks: TaskState;
}

export const selectTasks = (state: AppState) => state.tasks;
export const selectAllTasks =  createSelector(
    selectTasks,
    (state: TaskState) => state.tasksList
);
