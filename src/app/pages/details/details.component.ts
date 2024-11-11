import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  private route = inject(ActivatedRoute);;
  private taskService = inject(TaskService);
  private destroyRef = inject(DestroyRef);
  
  public task$?: Observable<Task | undefined>;

  public ngOnInit(): void {
    this.initFields();
  }

  private initFields(): void {
    this.route.paramMap.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(params => {
      const taskId = params.get('id');
      if (taskId) {
        this.task$ = this.taskService.getTaskById(taskId)
      }
    });
  }
}
