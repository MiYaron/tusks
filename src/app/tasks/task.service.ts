import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService { 
  public async getTasks(): Promise<Task[]> {
    const tasks = localStorage.getItem('tasks');

    return tasks? await JSON.parse(tasks) : [];
  }

  public async setTasks(tasks: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}