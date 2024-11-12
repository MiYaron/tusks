import { GroupTasksPipe } from './../group-tasks.pipe';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StorageActions } from '../../state/tasks/task.actions';
import { Task } from '../task.model';
import { selectTasks } from '../../state/tasks/task.selectors';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from './task-item/task-item.component';
import { Observable } from 'rxjs';
import { AppState } from '../../state/app.state';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule, GroupTasksPipe, TaskItemComponent],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListComponent implements OnInit{
  private store: Store<AppState> = inject(Store);
  public tasks$!: Observable<Task[]>;

  public ngOnInit(): void {
    this.initFields();
  }

  private initFields() : void {
    this.store.dispatch(StorageActions['load']());
    this.tasks$ = this.store.select(selectTasks);
  }
}
