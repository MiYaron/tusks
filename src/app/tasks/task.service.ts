import { Injectable } from '@angular/core';
import { filter, map, Observable, of } from 'rxjs';
import { Mock, Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks$: Observable<Task[]> = of(Mock.getListOfTasks(10))
 
  public getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  public getTaskById(id: string): Observable<Task | undefined> {
    return this.tasks$.pipe(
      map(tasks => tasks.find(task => task.id === id))
    );
  }
}