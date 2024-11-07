import { Routes } from '@angular/router';
import { DetailsComponent } from './pages/details/details.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: "",
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
];
