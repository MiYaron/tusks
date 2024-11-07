import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StorageActions, TaskActions } from '../../state/tasks/task.actions';
import { Task } from '../task.model';
import { AppState, selectAllTasks } from '../../state/tasks/task.selectors';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from './task-item/task-item.component';
import { Observable } from 'rxjs';
import { TaskState } from '../../state/tasks/task.reducer';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
})
export class TasksListComponent implements OnInit{
  private store: Store<AppState> = inject(Store);
  public tasks$: Observable<Task[]> = this.store.select(selectAllTasks);

  public ngOnInit() {
    this.store.dispatch(StorageActions['[Storage]LoadTasks']());
  }
}
