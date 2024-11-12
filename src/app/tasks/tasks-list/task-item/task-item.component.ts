import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Task } from '../../task.model';
import { AppState } from '../../../state/app.state';
import { TaskActions } from '../../../state/tasks/task.actions';
import { Path } from '../../../app.paths';

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
  @Input({required: true}) task!: Task;

  public showDetails(): void {
    this.router.navigate([Path.TASK, this.task.id]);
  }

  public markAsDone(): void {
    this.store.dispatch(TaskActions['mark']({id: this.task.id}));
  }
  
  public deleteTask(): void {
    this.store.dispatch(TaskActions['remove']({id: this.task.id}));
  }
}
