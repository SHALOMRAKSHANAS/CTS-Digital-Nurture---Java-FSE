import { Routes } from '@angular/router';
import { EnrollmentForm } from './pages/enrollment-form/enrollment-form';
import { ReactiveEnrollmentForm } from './pages/reactive-enrollment-form/reactive-enrollment-form';

export const routes: Routes = [
  { path: 'enroll', component: EnrollmentForm },
  { path: 'enroll-reactive', component: ReactiveEnrollmentForm },
];
