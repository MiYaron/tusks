import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { tasksReducer } from './state/tasks/task.reducer';
import { TaskEffects } from './state/tasks/task.effects';
import { searchReducer } from './state/search/search.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideStore({tasks: tasksReducer, query: searchReducer}), provideEffects([TaskEffects])]
};
