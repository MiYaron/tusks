import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';
import { TaskItemComponent } from '../app/tasks/tasks-list/task-item/task-item.component';
import { Task } from '../app/tasks/task.model';
import { provideMockStore } from '@ngrx/store/testing';

const mockTask: Task = {
  id: '1',
  title: 'Test Storybook',
  desc: 'Description for test storybook task',
  deadline: '2024-12-01',
  isDone: false,
};

const meta: Meta<TaskItemComponent> = {
  title: 'Components/Task',
  component: TaskItemComponent,
  decorators: [
    moduleMetadata({
      providers: [provideMockStore()],
    }),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<TaskItemComponent>;

export const incomplete: Story = {
  args: { task: mockTask },
};

export const complete: Story = {
  args: { task: { ...mockTask, isDone: true } },
};
