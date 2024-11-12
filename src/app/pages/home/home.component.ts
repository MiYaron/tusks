import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Path } from '../../app.paths';
import { TasksListComponent } from '../../tasks/tasks-list/tasks-list.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

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
