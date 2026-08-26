import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, inject } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  @Input('appReveal') variant: 'up' | 'left' | 'right' | 'scale' | '' = 'up';
  @Input() revealDelay = 0;

  ngAfterViewInit(): void {
    const node = this.el.nativeElement;
    node.classList.add('reveal', `reveal--${this.variant || 'up'}`);
    if (this.revealDelay) {
      node.style.transitionDelay = `${this.revealDelay}ms`;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
