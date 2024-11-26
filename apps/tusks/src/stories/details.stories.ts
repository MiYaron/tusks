import {
  moduleMetadata,
  Meta,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';
import { provideMockStore } from '@ngrx/store/testing';
import { DetailsComponent } from '../app/pages/details/details.component';
import { provideRouter } from '@angular/router';
import { routes } from '../app/app.routes';

const meta: Meta<DetailsComponent> = {
  title: 'Pages/Details',
  component: DetailsComponent,
  decorators: [
    moduleMetadata({
      providers: [provideMockStore()],
    }),
    applicationConfig({
      providers: [provideRouter(routes)],
    }),
  ],
};

export default meta;
type Story = StoryObj<DetailsComponent>;

export const details: Story = {};
