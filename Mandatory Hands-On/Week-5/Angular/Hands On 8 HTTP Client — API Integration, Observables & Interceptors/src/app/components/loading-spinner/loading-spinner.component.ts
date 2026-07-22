import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    @if (isLoading$ | async) {
      <div class="loading-overlay">
        <div class="loading-spinner">Loading...</div>
      </div>
    }
  `,
  styles: [`
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
    .loading-spinner {
      background: white;
      padding: 1.5rem 2rem;
      border-radius: 8px;
      font-size: 1.2rem;
      font-weight: bold;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }
  `]
})
export class LoadingSpinnerComponent {
  private loadingService = inject(LoadingService);
  isLoading$ = this.loadingService.isLoading$;
}
