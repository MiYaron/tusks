import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  title = new FormControl('', [Validators.required]);

  public search() {
    console.log (this.title);
    this.title.setValue('');

  }

}
