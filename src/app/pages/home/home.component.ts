import { Component, inject } from '@angular/core';
import { TasksListComponent } from '../../tasks/tasks-list/tasks-list.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { Router } from '@angular/router';
import { Path } from '../../app.paths';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TasksListComponent, SearchBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private router = inject(Router);

  public addTask(): void {
    this.router.navigate([Path.TASK]);
  }
}
