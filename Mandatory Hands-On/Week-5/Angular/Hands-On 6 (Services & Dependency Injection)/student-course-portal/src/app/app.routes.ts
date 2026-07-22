import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'profile', component: StudentProfileComponent }
];
