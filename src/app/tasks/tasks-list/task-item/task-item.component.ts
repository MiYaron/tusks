import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../task.model';

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

  public showDetails() {
    if (this.task?.id) {
      this.router.navigate(['/task', this.task.id]);
    }
  }
}
