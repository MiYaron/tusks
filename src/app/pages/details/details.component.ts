import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Task } from '../../tasks/task.model';
import { TaskService } from '../../tasks/task.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReturnButtonComponent } from '../../components/return-button/return-button.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReturnButtonComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private ts: TaskService = inject(TaskService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  
  task$?: Observable<Task | undefined>;
  subscription?: Subscription;

  public ngOnInit(): void {
    this.subscription = this.route.paramMap.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(params => {
      const taskId = params.get('id');
      if (taskId) {
        this.task$ = this.ts.getTaskById(taskId)
      }
    });
  }
}
