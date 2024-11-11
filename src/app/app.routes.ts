import { Routes } from '@angular/router';
import { DetailsComponent } from './pages/details/details.component';
import { HomeComponent } from './pages/home/home.component';
import { Path } from './app.paths';

export const routes: Routes = [
    {
        path: Path.HOME,
        component: HomeComponent,
    },
    {
        path: Path.TASK,
        component: DetailsComponent,
    },
    {
        path: `${Path.TASK}/:id`,
        component: DetailsComponent,
    },
    {
        path: "",
        redirectTo: Path.HOME,
        pathMatch: 'full',
    }
];
