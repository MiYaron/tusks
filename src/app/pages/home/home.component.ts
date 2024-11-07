import { Component, inject } from '@angular/core';
import { TasksListComponent } from '../../tasks/tasks-list/tasks-list.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TasksListComponent, SearchBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private router: Router = inject(Router);

  addTask() {
    this.router.navigate(['task']);
  }
}
