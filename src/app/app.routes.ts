import { Routes } from '@angular/router';
import { DetailsComponent } from './pages/details/details.component';
import { HomeComponent } from './pages/home/home.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
    },
    {
        path: "new-task",
        component: NewTaskComponent,
    },
    {
        path: "task/:id",
        component: DetailsComponent,
    },    
];
