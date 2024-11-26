import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import { v4 as uuid } from 'uuid';

import { Path } from '../../app.paths';
import { Task } from '../../tasks/task.model';
import { AppState } from '../../state/app.state';
import { selectTaskById } from '../../state/tasks/task.selectors';
import { TaskActions } from '../../state/tasks/task.actions';
import { ReturnButtonComponent } from '../../components/return-button/return-button.component';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ReturnButtonComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit {
  private store: Store<AppState> = inject(Store);
  private destroyRef = inject(DestroyRef);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  private action!: 'add' | 'edit';
  public task!: FormGroup;
  public error!: WritableSignal<string>;

  public ngOnInit(): void {
    this.initFields();
  }

  public saveTask(event: Event): void {
    event.preventDefault();

    if (this.validationCheck()) {
      this.store.dispatch(TaskActions[this.action]({ task: this.task.value }));
      this.router.navigate([Path.HOME]);
    }
  }

  private initFields(): void {
    this.error = signal('');

    this.activatedRoute.paramMap
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((params) => {
          const taskId = params.get('id') ?? '';
          return this.store.select(selectTaskById(taskId)).pipe(take(1));
        })
      )
      .subscribe((task) => {
        this.action = task ? 'edit' : 'add';
        this.task = this.generateForm(task);
      });
  }

  private generateForm(task: Task | undefined): FormGroup {
    return new FormGroup({
      id: new FormControl<string>(task?.id ?? uuid()),
      title: new FormControl<string>(task?.title ?? '', [Validators.required]),
      desc: new FormControl<string>(task?.desc ?? ''),
      deadline: new FormControl<string>(task?.deadline ?? '', [
        Validators.required,
      ]),
      isDone: new FormControl<boolean>(task?.isDone ?? false),
    });
  }

  private validationCheck() {
    const title = this.task.get('title');
    const deadline = this.task.get('deadline');

    if (!title?.valid) {
      this.error.set('Task must have a title');
      return false;
    }

    if (!deadline?.valid) {
      this.error.set('Task must have a valid date and time');
      return false;
    }

    this.error.set('');
    return true;
  }
}
