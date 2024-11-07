import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task.model';

@Pipe({
  name: 'groupTasks',
  standalone: true
})
export class GroupTasksPipe implements PipeTransform {

  transform(tasks: Task[] | null): {[header: string]: Task[]} {
    if (!tasks || tasks.length === 0) {
      return {};
    }
    
    let sortedTasks = [...tasks];
    sortedTasks = sortedTasks.sort((a, b) => {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    });

    const groupedTasks: {[header: string]: Task[]} = {};

    sortedTasks.forEach (task => {
      const date = new Date(task.deadline).toDateString();

      if (!groupedTasks[date]) {
        groupedTasks[date] = [];
      }

      groupedTasks[date].push(task);
    });

    return groupedTasks;
  }
}