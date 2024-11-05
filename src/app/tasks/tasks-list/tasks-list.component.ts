import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StorageActions, TaskActions } from '../../state/tasks/task.actions';
import { Task } from '../task.model';
import { selectAllTasks } from '../../state/tasks/task.selectors';
import { TaskService } from '../task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
})
export class TasksListComponent implements OnInit{
  // private store: Store = inject(Store);
  private ts: TaskService = inject(TaskService);
  public tasks$ = this.ts.loadTasks();
  public tests = [1,2,3];

  ngOnInit(): void {
    this.tasks$ = this.ts.loadTasks();
  }

}
