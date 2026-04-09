import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      class="theme-toggle"
      (click)="themeService.toggle()"
      [attr.aria-label]="themeService.isDark() ? 'Ativar tema claro' : 'Ativar tema escuro'"
      [title]="themeService.isDark() ? 'Tema claro' : 'Tema escuro'"
    >
      @if (themeService.isDark()) {
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        </svg>
      } @else {
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </svg>
      }
    </button>
  `,
  styles: [`
    .theme-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: var(--radius-full);
      background: var(--color-surface);
      color: var(--color-text-muted);
      border: 1px solid var(--color-border);
      transition: all var(--transition-fast);

      &:hover {
        background: var(--color-surface-hover);
        color: var(--color-primary);
        border-color: var(--color-primary);
      }
    }
  `]
})
export class ThemeToggleComponent {
  themeService = inject(ThemeService);
}
