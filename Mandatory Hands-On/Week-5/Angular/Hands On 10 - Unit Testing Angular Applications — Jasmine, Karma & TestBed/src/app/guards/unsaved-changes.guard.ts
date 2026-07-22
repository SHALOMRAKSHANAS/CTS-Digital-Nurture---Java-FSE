import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

export interface CanComponentDeactivate {
  enrollForm: { dirty: boolean };
}

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate): boolean {
    if (component.enrollForm?.dirty) {
      return window.confirm('You have unsaved changes. Leave?');
    }
    return true;
  }
}
