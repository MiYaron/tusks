import { Component, inject } from '@angular/core';
import { TaskService } from '../task.service';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from './task-item/task-item.component';
import { GroupTasksPipe } from '../group-tasks.pipe';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule, GroupTasksPipe, TaskItemComponent],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
})
export class TasksListComponent{
  private ts: TaskService = inject(TaskService);
  public tasks$ = this.ts.getTasks();
}
