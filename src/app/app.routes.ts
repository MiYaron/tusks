import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Path } from './app.paths';

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