import { Routes } from '@angular/router';
import { DetailsComponent } from './pages/details/details.component';
import { HomeComponent } from './pages/home/home.component';
import { HOME, TASK } from './app.paths';

export const routes: Routes = [
    {
        path: HOME,
        component: HomeComponent,
    },
    {
        path: TASK,
        component: DetailsComponent,
    },
    {
        path: `${TASK}/:id`,
        component: DetailsComponent,
    },
    {
        path: "",
        redirectTo: HOME,
        pathMatch: 'full',
    }
];