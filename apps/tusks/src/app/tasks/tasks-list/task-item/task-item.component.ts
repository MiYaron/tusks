import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Path } from '../../../app.paths';
import { Task } from '../../task.model';
import { AppState } from '../../../state/app.state';
import { TaskActions } from '../../../state/tasks/task.actions';
import { DragDirective, ElemActions } from './directives/drag.directive';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, DragDirective],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent {
  private store: Store<AppState> = inject(Store);
  private router = inject(Router);

  task = input.required<Task>();

  public showDetails(): void {
    this.router.navigate([Path.TASK, this.task().id]);
  }

  public markAsDone(event: Event): void {
    this.stopPropagation(event);
    this.store.dispatch(TaskActions['mark']({ id: this.task().id }));
  }

  public deleteTask(): void {
    this.store.dispatch(TaskActions['remove']({ id: this.task().id }));
  }

  public stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  public getElemActions(): ElemActions {
    return {
      onClick: () => this.showDetails(),
      onDrag: () => this.deleteTask(),
    };
  }
}
