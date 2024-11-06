export interface Task {
    id: string;
    title: string;
    desc: string;
    deadline: string;
    isDone: boolean;
}

export function generateMockTasks(count: number): Task[] {
    const mock: Task = {
        id: '0',
        title: 'Mock Task',
        desc: 'This is just a mock and not a real task',
        deadline: new Date('2024-11-24').toString(),
        isDone: false
    }

    return Array.from({ length: count }).map((_, index) => {
      return {
        ...mock,
        id: (index).toString()
      };
    });
}
