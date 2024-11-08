import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../task.model';
import { Store } from '@ngrx/store';
import { TaskActions } from '../../../state/tasks/task.actions';
import { CommonModule } from '@angular/common';
import { AppState } from '../../../state/app.state';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  private store: Store<AppState> = inject(Store);
  private router = inject(Router);
  @Input() task?: Task;

  public showDetails() {
    if (this.task?.id) {
      this.router.navigate(['/task', this.task.id]);
    }
  }

  public markAsDone() {
    if (this.task?.id) {
      this.store.dispatch(TaskActions['mark']({id: this.task.id}));
    }
  }
  public deleteTask() {
    if (this.task?.id) {
      this.store.dispatch(TaskActions['remove']({id: this.task.id}));
    }
  }
}
