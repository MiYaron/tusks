import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ReturnButtonComponent } from '../../components/return-button/return-button.component';
import { selectTaskById } from '../../state/tasks/task.selectors';
import { TaskActions } from '../../state/tasks/task.actions';
import { AppState } from '../../state/app.state';
import { Task } from '../../tasks/task.model';
import {v4 as uuid} from 'uuid';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  private taskId: string = '';

  public task$?: Observable<Task | undefined>;
  public title = "Mock Title";
  public desc = "Mock Description";
  public deadline = "2024-11-05";

  public ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(params => {
      this.taskId = params.get('id') || '';
      if (this.taskId !== '') {
        this.task$ = this.store.select(selectTaskById(this.taskId))
      }
    });
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

  private mockDate(): string {
    const day = Math.floor(Math.random() * 2) + 15;
    const month = Math.floor(Math.random() * 2) + 2;

    return `2025-${month}-${day}`
  }
}
