import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { routes } from './app.routes';
import { tasksReducer } from './state/tasks/task.reducer';
import { searchReducer } from './state/search/search.reducer';
import { TaskEffects } from './state/tasks/task.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideStore({tasks: tasksReducer, query: searchReducer}), provideEffects([TaskEffects])]
};
