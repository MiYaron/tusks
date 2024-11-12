import { createReducer, on } from '@ngrx/store';
import { setQuery } from './search.actions';

export const searchFeatureKey = 'search';

export const initialState = '';

export const searchReducer = createReducer(
  initialState,
  on (setQuery, (_, {query}) => query)
);

