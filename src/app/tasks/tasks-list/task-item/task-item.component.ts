import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../task.model';
import { TASK } from '../../../app.paths';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  private router = inject(Router);
  @Input() task?: Task;

  public showDetails(): void {
    if (this.task?.id) {
      this.router.navigate([TASK, this.task.id]);
    }
  }
}
