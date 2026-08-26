import { Component, Input, computed, signal } from '@angular/core';

import { TECH_ICONS } from '../tech-icons';

@Component({
  selector: 'app-tech-icon',
  standalone: true,
  template: `
    @if (icon(); as ic) {
      <svg
        [attr.width]="size"
        [attr.height]="size"
        viewBox="0 0 24 24"
        [attr.fill]="'#' + ic.hex"
        role="img"
        [attr.aria-label]="slug()"
      >
        <path [attr.d]="ic.path" />
      </svg>
    }
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
    `,
  ],
})
export class TechIcon {
  slug = signal('');
  @Input() size = 16;

  @Input({ required: true, alias: 'slug' })
  set slugInput(value: string) {
    this.slug.set(value);
  }

  icon = computed(() => TECH_ICONS[this.slug()]);
}
