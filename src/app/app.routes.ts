import { Routes } from '@angular/router';
import { Path } from './app.paths';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: Path.HOME,
        component: HomeComponent,
    },
    {
        path: Path.TASK,
        loadComponent: () => import('./pages/details/details.component').then(((m) => m.DetailsComponent ))
    },
    {
        path: `${Path.TASK}/:id`,
        loadComponent: () => import('./pages/details/details.component').then(((m) => m.DetailsComponent ))
    },
    {
        path: "",
        redirectTo: Path.HOME,
        pathMatch: 'full',
    }
];