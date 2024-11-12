import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Path } from '../../app.paths';

@Component({
  selector: 'app-return-button',
  standalone: true,
  imports: [],
  templateUrl: './return-button.component.html',
  styleUrl: './return-button.component.css'
})
export class ReturnButtonComponent implements OnInit{
  private router = inject(Router);
  private detectorRef = inject(ChangeDetectorRef);

  public ngOnInit(): void {
    this.detectorRef.detach();
  }

  public goHome(): void {
    this.router.navigate([Path.HOME]);
  }
}
