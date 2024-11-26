import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task } from '../../tasks/task.model';

export const StorageActions = createActionGroup({
  source: 'Storage',
  events: {
    Load: emptyProps(),
    'On Success': props<{ tasks: Task[] }>(),
    'On Failure': props<{ error: string }>(),
  },
});

export const TaskActions = createActionGroup({
  source: 'Task',
  events: {
    Add: props<{ task: Task }>(),
    Edit: props<{ task: Task }>(),
    Mark: props<{ id: string }>(),
    Remove: props<{ id: string }>(),
  },
});
