import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { setQuery } from '../../state/search/search.actions';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit, OnDestroy{
  private store: Store<AppState> = inject(Store);
  private unsubscribe$ = new Subject<void>;

  public query = new FormControl('', [Validators.required]);

  public ngOnInit(): void {
    this.query.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.unsubscribe$)
    ).subscribe((value) => {
      this.store.dispatch(setQuery({query: value || ''}));
    })
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    
  }
}
