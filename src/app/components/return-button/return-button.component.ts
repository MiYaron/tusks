import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-return-button',
  standalone: true,
  imports: [],
  templateUrl: './return-button.component.html',
  styleUrl: './return-button.component.css'
})
export class ReturnButtonComponent {
  private router: Router = inject(Router);

  public goHome(): void {
    this.router.navigate([""]);
  }
}
