import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import {v4 as uuid} from 'uuid';

import { Path } from '../../app.paths';
import { Task } from '../../tasks/task.model';
import { AppState } from '../../state/app.state';
import { selectTaskById } from '../../state/tasks/task.selectors';
import { TaskActions } from '../../state/tasks/task.actions';
import { ReturnButtonComponent } from '../../components/return-button/return-button.component';

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

  private action!: 'add' | 'edit';
  public task!: Task;

  public ngOnInit(): void {
    this.initFields();
  }

  public saveTask(event: Event): void {
    event.preventDefault();

    this.store.dispatch((TaskActions[this.action]({task: this.task})));
    
    this.router.navigate([Path.HOME]);
  }

  private initFields(): void {
    this.activatedRoute.paramMap.pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(params => {
        const taskId = params.get('id') ?? '';
        return this.store.select(selectTaskById(taskId)).pipe(take(1));
      })
    ).subscribe(task => {
      this.action = task? 'edit' : 'add'; 
      this.task = task || this.newTask(); 
    });
  }

  private newTask(): Task {
    return {
      id: uuid(),
      title: 'Mock Task Title',
      desc: 'This is a description for a mock task with random deadline',
      deadline: this.mockDate(),
      isDone: false,
    }
  }

  private mockDate(): string {
    const day = Math.floor(Math.random() * 2) + 15;
    const month = Math.floor(Math.random() * 2) + 2;

    return `2025-${month}-${day}`
  }
}
