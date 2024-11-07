export interface Task {
    id: string;
    title: string;
    desc: string;
    deadline: string;
    isDone: boolean;
}

export class Mock {
  private static id = 0;
  private static title= 'Mock Task';
  private static desc= 'This is just a mock and not a real task';
  private static isDone= false;

  public static getTask(): Task {
      this.id += 1;
      return {id: this.id.toString(), title:this.title, desc:this.desc, deadline: this.randomDate(), isDone: this.isDone};
  }

  public static getListOfTasks(length: number): Task[] {
      const tasks: Task[] = [];
      for (let i = 0; i < length; i++) {
          tasks.push(this.getTask());
      }

      return tasks;
  }

  private static randomDate() {
    const day = Math.floor(Math.random() * 3) + 10;
    const month = Math.floor(Math.random() * 5) + 3;

    return `2024-${month}-${day}`
  }
}