import { Component, inject } from '@angular/core';
import { ReturnButtonComponent } from '../../components/return-button/return-button.component';
import { Mock, Task } from '../../tasks/task.model';
import { AppState } from '../../state/tasks/task.selectors';
import { Store } from '@ngrx/store';
import { TaskActions } from '../../state/tasks/task.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [ReturnButtonComponent],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  private store: Store<AppState> = inject(Store);
  private router: Router = inject(Router);
  saveTask(event: Event) {
    event.preventDefault();

    const mockData: Task = Mock.getTask();
    this.store.dispatch((TaskActions['[Tasks]AddTask']({task: mockData})));
    
    this.router.navigate([""]);
  }
}
