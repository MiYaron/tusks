import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task.model';

@Pipe({
  name: 'groupTasks',
  standalone: true
})
export class GroupTasksPipe implements PipeTransform {
  transform(tasks: Task[] | null): {date: string, tasks: Task[]}[] {
    if (!tasks || tasks.length === 0) {
      return [];
    }
    
    let sortedTasks = [...tasks];
    sortedTasks = sortedTasks.sort((a, b) => {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    });

    const groupedTasks: {date: string, tasks: Task[]}[] = [];
    let lastDate = '';

    sortedTasks.forEach (task => {
      const taskDate = new Date(task.deadline).toDateString();

      if (taskDate === lastDate) {
        groupedTasks[groupedTasks.length-1].tasks.push(task);
      } else {
        groupedTasks.push({date: taskDate, tasks:[task]});
        lastDate = taskDate;
      }
    });

    return groupedTasks;
  }
}