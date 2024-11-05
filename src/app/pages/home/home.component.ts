import { Component } from '@angular/core';
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

}
