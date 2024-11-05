import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
 
  public loadTasks(): Observable<Task[]> {
    return of(this.generateMockTasks(10));
  }

  //********************** Mock Data ************************************/
  private mock: Task = {
    id: '0',
    title: 'Mock Task',
    desc: 'This is just a mock and not a real task',
    deadline: new Date('2024-11-24').toString(),
    isDone: false
  }

  private generateMockTasks(count: number): Task[] {
    return Array.from({ length: count }).map((_, index) => {
      return {
        ...this.mock,
        id: (index).toString()
      };
    });
  }
}
