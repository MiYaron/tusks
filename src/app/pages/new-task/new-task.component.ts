import { Component } from '@angular/core';
import { ReturnButtonComponent } from '../../components/return-button/return-button.component';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [ReturnButtonComponent],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {


  saveTask() {

  }
}
