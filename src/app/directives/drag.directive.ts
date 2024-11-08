import { Directive, ElementRef, inject, Renderer2, OnInit, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDrag]',
  standalone: true
})
export class DragDirective implements OnInit{
  private el: ElementRef = inject(ElementRef);
  private renderer: Renderer2 = inject(Renderer2);

  private startX = 0;
  private isDragging = false;
  private timeout: any = null;
  private holdDuration = 100;

  @Input() appDrag?: () => void;
  
  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
  }

  @HostListener('pointerdown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onPointerDown(event: MouseEvent | TouchEvent) {
    const clientX = event instanceof TouchEvent ? event.touches[0].clientX : (event as PointerEvent).clientX;

    this.startX = clientX;
    this.timeout = setTimeout(() => {
      event.preventDefault();

      this.isDragging = true;
    }, this.holdDuration);
  }

  @HostListener('mousemove', ['$event'])
  @HostListener('touchmove', ['$event'])
  onPointerMove(event: PointerEvent | TouchEvent) {
    if (this.isDragging) {
      const clientX = event instanceof TouchEvent ? event.touches[0].clientX : (event as PointerEvent).clientX;
      const deltaX = clientX - this.startX;
      this.renderer.setStyle(this.el.nativeElement, 'transform', `translateX(${deltaX}px)`);
    }
  }

  @HostListener('pointerup', ['$event'])
  @HostListener('touchend', ['$event'])
  onPointerUp(event: PointerEvent | TouchEvent) {
    clearTimeout(this.timeout);

    if (this.isDragging) {
      const clientX = event instanceof TouchEvent ? event.changedTouches[0].clientX : (event as PointerEvent).clientX;
      const deltaX = clientX - this.startX;
      if (deltaX > window.innerWidth * 0.3) {
        this.appDrag?.()
      }

      this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateX(0)');
      this.isDragging = false;
    }
  }
}