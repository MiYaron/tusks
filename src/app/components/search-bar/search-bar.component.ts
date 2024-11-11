import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit{
  public title!: FormControl;

  public search(): void {
    this.title.setValue('');
  }

  public ngOnInit(): void {
    this.initFields();
  }


  private initFields(): void {
    this.title = new FormControl('', [Validators.required]);
  }

}
