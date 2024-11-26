import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  OnInit,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { Task } from '../task.model';
import { StorageActions } from '../../state/tasks/task.actions';
import { GroupTasksPipe } from './../group-tasks.pipe';
import { selectTasks } from '../../state/tasks/task.selectors';
import { TaskItemComponent } from './task-item/task-item.component';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule, GroupTasksPipe, TaskItemComponent],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListComponent implements OnInit {
  private store: Store<AppState> = inject(Store);
  private injector = inject(Injector);

  public tasks!: Signal<Task[]>;

  public ngOnInit(): void {
    this.initFields();
  }

  private initFields(): void {
    this.store.dispatch(StorageActions['load']());
    this.tasks = toSignal(this.store.select(selectTasks), {
      initialValue: [],
      injector: this.injector,
    });
  }
}
