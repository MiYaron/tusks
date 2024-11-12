import { Directive, ElementRef, inject, Renderer2, Input, OnInit, HostListener } from '@angular/core';

export interface ElemActions {
  onDrag?: () => void;
  onClick?: () => void;
}

@Directive({
  selector: '[appDrag]',
  standalone: true
})
export class DragDirective implements OnInit {
  private el: ElementRef = inject(ElementRef);
  private renderer: Renderer2 = inject(Renderer2);

  private element!: any;
  private startX!: number;
  private isDragged!: boolean;
  private holdDuration!: number;    
  private timeout!: NodeJS.Timeout;

  @Input() appDrag?: ElemActions;

  public ngOnInit(): void {
    this.initFields();

    this.renderer.setStyle(this.element,'touch-action','pan-y');
  }

  @HostListener('pointerdown', ['$event']) onPointerDown(event: PointerEvent) {
    const clientX = event.clientX;

    this.startX = clientX;
    this.timeout = setTimeout(() => {
      this.isDragged = true;
    }, this.holdDuration);
  }
  
  @HostListener('pointermove', ['$event']) onPointerMove(event: PointerEvent) {
    if (this.isDragged) {
      const clientX = event.clientX;
      const delta = clientX - this.startX;

      this.renderer.removeStyle(this.element,'transition');

      this.transform(`${delta}px`);
    }
  }

  @HostListener('pointerup', ['$event']) onPointerUp(event: PointerEvent) {
    clearTimeout(this.timeout);
    if (this.isDragged) {
      const clientX = event.clientX;
      const delta = clientX - this.startX;

      this.handleDrag(delta);

      this.isDragged = false;
    } else {
      this.handleClick();
    }
  }

  private initFields(): void {
    this.element = this.el.nativeElement;
    this.startX = 0;
    this.isDragged = false;
    this.holdDuration = 150;
  }

  private transform(position: string): void {
    this.renderer.setStyle(this.element, 'transform', `translateX(${position})`);
  }

  private handleDrag(delta: number): void {
    this.renderer.setStyle(this.element, 'transition', `transform 0.3s ease`);

    if (delta > window.innerWidth * 0.4) {
      this.transform('100vw');

      setTimeout(()=>this.appDrag?.onDrag?.(), 200);
    } else {
      this.transform('0');
    }
  }

  private handleClick(): void {
    this.appDrag?.onClick?.();
  }
}