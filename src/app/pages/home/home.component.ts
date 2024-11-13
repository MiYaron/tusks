import { Component, HostListener, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Path } from '../../app.paths';
import { TasksListComponent } from '../../tasks/tasks-list/tasks-list.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

const BREAK_POINT = 768;
const MOBILE_LOGO_SIZE = 100;
const DESKTOP_LOGO_SIZE = 80;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TasksListComponent, SearchBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  private router = inject(Router);
  public logoHeight!: number;
  
  public ngOnInit(): void {
    this.initFields();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.innerWidth < BREAK_POINT) {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      this.logoHeight = Math.max(MOBILE_LOGO_SIZE - scrollTop, 0);
    } else {
      this.logoHeight = DESKTOP_LOGO_SIZE;
    }
  }
  
  public addTask(): void {
    this.router.navigate([Path.TASK]);
  }

  private initFields() {
    this.logoHeight = window.innerWidth < BREAK_POINT? MOBILE_LOGO_SIZE : DESKTOP_LOGO_SIZE;
  }
}
