import { createAction, props } from '@ngrx/store';

export const setQuery = createAction('[Search] Set Query', props<{query: string}>());
