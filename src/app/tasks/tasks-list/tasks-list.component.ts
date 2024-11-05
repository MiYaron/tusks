import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StorageActions, TaskActions } from '../../state/tasks/task.actions';
import { Task } from '../task.model';
import { selectAllTasks } from '../../state/tasks/task.selectors';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
})
export class TasksListComponent implements OnInit{
  private store: Store = inject(Store);
  public tasks$ = this.store.select(selectAllTasks);

  private mock = {
    title: 'Mock Task',
    desc: 'This is just a mock and not a real task',
    deadline: new Date('2024-11-24'),
  }

  public ngOnInit() {
    this.store.dispatch(StorageActions['[Storage]LoadTasks']());
  }

  public addTask(title: string, desc: string, deadline: Date) {
    const task: Task = {
      id: Date.now().toString(),
      title: this.mock.title,
      desc: this.mock.desc,
      deadline: this.mock.deadline.toString(),
      isDone: false,
    }
    
    this.store.dispatch(TaskActions['[Tasks]AddTask']({task}));
  }
}
