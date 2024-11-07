import { inject, Injectable } from '@angular/core';
import { catchError, from, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Task } from '../../tasks/task.model';
import { StorageActions, TaskActions } from './task.actions';
import { selectTasksState } from './task.selectors';
import { TaskService } from '../../tasks/task.service';



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
      withLatestFrom(this.store.select(selectTasksState)),
      switchMap(([_,state]) => from(this.ts.setTasks(state.tasksList)))
    ),
    {dispatch: false}
  )
}
