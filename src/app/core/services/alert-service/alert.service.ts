import { Injectable, signal } from '@angular/core';
import { AlertState } from '../../../shared/types/alert-state.type';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private readonly _alert = signal<AlertState | null>(null);
  alert = this._alert.asReadonly();

  private timeout: number | null = null;

  success(message: string): void {
    this._alert.set({ role: 'success', message });
  }

  error(message: string): void {
    this._alert.set({ role: 'error', message });
  }

  info(message: string): void {
    this._alert.set({ role: 'info', message });
  }

  warning(message: string): void {
    this._alert.set({ role: 'warning', message });
  }

  timeoutToClear(timeMillis: number = 3000) {
    this.timeout = setTimeout(() => this.clear(), timeMillis);
  }

  clear(): void {
    if (this.timeout) clearTimeout(this.timeout);
    if (this._alert()) this._alert.set(null);
  }
}
