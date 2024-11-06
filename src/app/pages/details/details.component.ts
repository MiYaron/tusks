import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Task } from '../../tasks/task.model';
import { TaskService } from '../../tasks/task.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReturnButtonComponent } from '../../components/return-button/return-button.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReturnButtonComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit, OnDestroy {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private ts: TaskService = inject(TaskService);
  task$?: Observable<Task | undefined>;
  subscription?: Subscription;

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(params => {
      const taskId = params.get('id');
      if (taskId) {
        this.task$ = this.ts.getTaskById(taskId)
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
