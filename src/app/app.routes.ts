import { Routes } from '@angular/router';
import { DetailsComponent } from './pages/details/details.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: "home",
        component: HomeComponent,
    },
    {
        path: "task",
        component: DetailsComponent,
    },
    {
        path: "task/:id",
        component: DetailsComponent,
    },
    {
        path: "",
        redirectTo: "/home",
        pathMatch: 'full',
    }
];
