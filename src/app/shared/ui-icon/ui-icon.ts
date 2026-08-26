import { Component, Input } from '@angular/core';

export type UiIconName =
  | 'code'
  | 'server'
  | 'database'
  | 'wrench'
  | 'cloud'
  | 'layers'
  | 'monitor'
  | 'link'
  | 'mail'
  | 'wave';

@Component({
  selector: 'app-ui-icon',
  standalone: true,
  template: `
    <svg
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      @switch (name) {
        @case ('code') {
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        }
        @case ('server') {
          <rect x="2" y="3" width="20" height="7" rx="2" />
          <rect x="2" y="14" width="20" height="7" rx="2" />
          <circle cx="6.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
          <circle cx="6.5" cy="17.5" r="0.6" fill="currentColor" stroke="none" />
        }
        @case ('database') {
          <ellipse cx="12" cy="5" rx="8.5" ry="3" />
          <path d="M3.5 5v6c0 1.66 3.8 3 8.5 3s8.5-1.34 8.5-3V5" />
          <path d="M3.5 11v6c0 1.66 3.8 3 8.5 3s8.5-1.34 8.5-3v-6" />
        }
        @case ('wrench') {
          <path
            d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.4-3.4a6 6 0 0 1-7.9 7.9L6.5 21.4a2.1 2.1 0 0 1-3-3l6.6-6.6a6 6 0 0 1 7.9-7.9z"
          />
        }
        @case ('cloud') {
          <path
            d="M17.5 19a4.5 4.5 0 0 0 0-9 6.5 6.5 0 0 0-12.6 2.1A4 4 0 0 0 6 19.9h11.5z"
          />
        }
        @case ('layers') {
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        }
        @case ('monitor') {
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        }
        @case ('link') {
          <path d="M9 17H7a5 5 0 0 1 0-10h2" />
          <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
          <line x1="8" y1="12" x2="16" y2="12" />
        }
        @case ('mail') {
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <polyline points="2 7 12 13 22 7" />
        }
        @case ('wave') {
          <path d="M6 12c1.5-3 3-3 4.5 0s3 3 4.5 0 3-3 4.5 0" />
        }
      }
    </svg>
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
export class UiIcon {
  @Input({ required: true }) name!: UiIconName;
  @Input() size = 20;
}
