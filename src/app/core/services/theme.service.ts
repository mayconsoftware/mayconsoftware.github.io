import { Injectable, signal, computed, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _theme = signal<Theme>(this.getSystemPreference());

  readonly theme = this._theme.asReadonly();
  readonly isDark = computed(() => this._theme() === 'dark');

  init() {
    // Watch OS-level changes
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', (e) => {
      this._theme.set(e.matches ? 'dark' : 'light');
    });

    // Apply data-theme attribute reactively
    effect(() => {
      document.documentElement.setAttribute('data-theme', this._theme());
    });
  }

  toggle() {
    this._theme.update(t => (t === 'dark' ? 'light' : 'dark'));
  }

  private getSystemPreference(): Theme {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
