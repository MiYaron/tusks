import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';
import { provideMockStore } from '@ngrx/store/testing';
import { HomeComponent } from '../app/pages/home/home.component';

const meta: Meta<HomeComponent> = {
  title: 'Pages/Home',
  component: HomeComponent,
  decorators: [
    moduleMetadata({
      providers: [provideMockStore()],
    }),
  ],
};

export default meta;
type Story = StoryObj<HomeComponent>;

export const home: Story = {};
