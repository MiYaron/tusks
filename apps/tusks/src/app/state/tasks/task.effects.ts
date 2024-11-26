import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Task } from '../../tasks/task.model';
import { AppState } from '../app.state';
import { StorageActions, TaskActions } from './task.actions';
import { selectTasksState } from './task.selectors';
import { TaskService } from '../../tasks/task.service';

@Injectable()
export class TaskEffects {
  private store: Store<AppState> = inject(Store);
  private actions$ = inject(Actions);
  private taskService = inject(TaskService);

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StorageActions['load']),
      switchMap(() =>
        from(this.taskService.getTasks()).pipe(
          map((tasks: Task[]) => StorageActions['onSuccess']({ tasks })),
          catchError((error) => of(StorageActions['onFailure']({ error })))
        )
      )
    )
  );

  saveTasks$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(...Object.values(TaskActions)),
        withLatestFrom(this.store.select(selectTasksState)),
        switchMap(([_, state]) =>
          from(this.taskService.setTasks(state.tasksList))
        )
      ),
    { dispatch: false }
  );
}
