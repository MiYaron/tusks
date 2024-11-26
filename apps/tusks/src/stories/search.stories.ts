import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';
import { Task } from '../app/tasks/task.model';
import { provideMockStore } from '@ngrx/store/testing';
import { SearchBarComponent } from '../app/components/search-bar/search-bar.component';

const mockTask: Task = {
  id: '1',
  title: 'Test Storybook',
  desc: 'Description for test storybook task',
  deadline: '2024-12-01',
  isDone: false,
};

const meta: Meta<SearchBarComponent> = {
  title: 'Components/Search',
  component: SearchBarComponent,
  decorators: [
    moduleMetadata({
      providers: [provideMockStore()],
    }),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<SearchBarComponent>;

export const search: Story = {};
