import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task.model';

export interface GroupedTasks {
  date: string;
  tasks: Task[];
}

@Pipe({
  name: 'groupTasks',
  standalone: true,
})
export class GroupTasksPipe implements PipeTransform {
  public transform(tasks: Task[] | null): GroupedTasks[] {
    if (!tasks || tasks.length === 0) {
      return [];
    }

    let sortedTasks = [...tasks];
    sortedTasks = sortedTasks.sort((a, b) => {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    });

    return this.groupSortedTasks(sortedTasks);
  }

  private groupSortedTasks(tasks: Task[]): GroupedTasks[] {
    const groupedTasks: GroupedTasks[] = [];
    let lastDate = '';

    tasks.forEach((task) => {
      const taskDate = new Date(task.deadline).toDateString();

      if (taskDate === lastDate) {
        groupedTasks[groupedTasks.length - 1].tasks.push(task);
      } else {
        groupedTasks.push({ date: taskDate, tasks: [task] });
        lastDate = taskDate;
      }
    });

    return groupedTasks;
  }
}
