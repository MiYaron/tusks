import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged} from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { setQuery } from '../../state/search/search.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit{
  private store: Store<AppState> = inject(Store);
  private destroyRef = inject(DestroyRef); 

  public query!: FormControl;

  public ngOnInit(): void {
    this.initFields();
  }

  private initFields(): void {
    this.query = new FormControl('');

    this.query.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((value) => {
      this.store.dispatch(setQuery({query: value || ''}));
    })
  }
}
