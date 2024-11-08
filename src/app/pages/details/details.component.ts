import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ReturnButtonComponent } from '../../components/return-button/return-button.component';
import { selectTaskById } from '../../state/tasks/task.selectors';
import { TaskActions } from '../../state/tasks/task.actions';
import { AppState } from '../../state/app.state';
import { Task } from '../../tasks/task.model';
import {v4 as uuid} from 'uuid';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReturnButtonComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit, OnDestroy {
  private store: Store<AppState> = inject(Store);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  private subscription?: Subscription;
  private taskId: string = '';

  public task$?: Observable<Task | undefined>;
  public title = "Mock Title";
  public desc = "Mock Description";
  public deadline = "2024-11-05";

  public ngOnInit(): void {
    this.subscription = this.activatedRoute.paramMap.subscribe(params => {
      this.taskId = params.get('id') || '';
      if (this.taskId !== '') {
        this.task$ = this.store.select(selectTaskById(this.taskId))
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public saveTask(event: Event) {
    event.preventDefault();

    if (this.taskId === '') {
      this.taskId = uuid();
      this.deadline = this.mockDate();
      this.store.dispatch((TaskActions['add']({task: this.buildTask()})));
    } else {
      this.store.dispatch((TaskActions['edit']({task: this.buildTask()})));
    }

    
    this.router.navigate([""]);
  }

  private buildTask(): Task {
    return {
      id: this.taskId,
      title: this.title,
      desc: this.desc,
      deadline: this.deadline,
      isDone: false,
    }
  }

  private mockDate() {
    const day = Math.floor(Math.random() * 2) + 15;
    const month = Math.floor(Math.random() * 2) + 5;

    return `2024-${month}-${day}`
  }
}
