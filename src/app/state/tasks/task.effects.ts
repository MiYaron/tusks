import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState, selectAllTasks } from './task.selectors';
import { Store } from '@ngrx/store';
import { TaskService } from '../../tasks/task.service';
import { StorageActions, TaskActions } from './task.actions';
import { catchError, from, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Task } from '../../tasks/task.model';



@Injectable()
export class TaskEffects {
  private store: Store<AppState> = inject(Store);
  private actions$: Actions = inject(Actions);
  private ts: TaskService = inject(TaskService);

  loadTasks$ = createEffect(() => this.actions$.pipe(
      ofType(StorageActions['[Storage]LoadTasks']),
      switchMap (() =>
        from((this.ts.getTasks())).pipe(
          map((tasks: Task[]) => StorageActions['[Storage]LoadSuccess']({tasks})),
          catchError((error) => of(StorageActions['[Storage]LoadFailure']({error})))
        )
      )
    )
  )

  saveTasks$ = createEffect(() => this.actions$.pipe(
      ofType(...Object.values(TaskActions)),
      withLatestFrom(this.store.select(selectAllTasks)),
      switchMap(([_,tasks]) => from(this.ts.setTasks(tasks)))
    ),
    {dispatch: false}
  )
}
