import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../task.model';
import { Store } from '@ngrx/store';
import { TaskActions } from '../../../state/tasks/task.actions';
import { AppState } from '../../../state/tasks/task.selectors';
import { CommonModule } from '@angular/common';

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
    console.log ("MARK AS DONE")
    if (this.task?.id) {
      this.store.dispatch(TaskActions['[Tasks]MarkAsDone']({id: this.task.id}));
    }
  }
  public deleteTask() {
    if (this.task?.id) {
      this.store.dispatch(TaskActions['[Tasks]RemoveTask']({id: this.task.id}));
    }
  }
}
