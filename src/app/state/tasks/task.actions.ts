import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task } from '../../tasks/task.model';

export const StorageActions = createActionGroup({
  source: 'Storage',
  events: {
    '[Storage] Load Tasks': emptyProps(),
    '[Storage] Load Success': props<{tasks: Task[]}>(),
    '[Storage] Load Failure': props<{error: string}>(),
  }
});

export const TaskActions = createActionGroup({
  source: 'Task',
  events: {
    '[Tasks] Add Task': props<{task: Task}>(),
    '[Tasks] Edit Task': props<{task: Task}>(),
    '[Tasks] Mark As Done': props<{id: string}>(),
    '[Tasks] Remove Task': props<{id: string}>(),
  }
});