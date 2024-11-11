import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { GroupTasksPipe } from '../group-tasks.pipe';
import { TaskItemComponent } from './task-item/task-item.component';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule, GroupTasksPipe, TaskItemComponent],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
})
export class TasksListComponent implements OnInit{
  private taskService = inject(TaskService);
  public tasks$!: Observable<Task[]>;

  public ngOnInit(): void {
    this.initFields();
  }

  private initFields() : void {
    this.tasks$ = this.taskService.getTasks();
  }
}
