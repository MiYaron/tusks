import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import {v4 as uuid} from 'uuid';

import { Path } from '../../app.paths';
import { Task } from '../../tasks/task.model';
import { ReturnButtonComponent } from '../../components/return-button/return-button.component';
import { selectTaskById } from '../../state/tasks/task.selectors';
import { TaskActions } from '../../state/tasks/task.actions';
import { AppState } from '../../state/app.state';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReturnButtonComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{
  private store: Store<AppState> = inject(Store);
  private destroyRef = inject(DestroyRef);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  private taskId!: string;

  public task$!: Observable<Task | undefined>;
  public title!: string;
  public desc!: string;
  public deadline!: string;

  public ngOnInit(): void {
    this.initFields();
  }

  public saveTask(event: Event): void {
    event.preventDefault();

    if (this.taskId === '') {
      this.taskId = uuid();
      this.deadline = this.mockDate();
      this.store.dispatch((TaskActions['add']({task: this.buildTask()})));
    } else {
      this.store.dispatch((TaskActions['edit']({task: this.buildTask()})));
    }
    
    this.router.navigate([Path.HOME]);
  }

  private initFields(): void {
    this.taskId = ''
    this.title = "Task to do sometime"
    this.desc = "This is a task that is needed to be done by some random date"
    this.deadline = "2024-11-05"

    this.activatedRoute.paramMap.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(params => {
      this.taskId = params.get('id') || '';
      if (this.taskId !== '') {
        this.task$ = this.store.select(selectTaskById(this.taskId))
      }
    });
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

  private mockDate(): string {
    const day = Math.floor(Math.random() * 2) + 15;
    const month = Math.floor(Math.random() * 2) + 2;

    return `2025-${month}-${day}`
  }
}
