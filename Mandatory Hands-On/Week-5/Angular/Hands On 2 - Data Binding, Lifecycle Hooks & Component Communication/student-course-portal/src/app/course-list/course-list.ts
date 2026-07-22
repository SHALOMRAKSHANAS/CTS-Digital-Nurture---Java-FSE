import { Component } from '@angular/core';
import { CourseCard } from '../components/course-card/course-card';

@Component({
  selector: 'app-course-list',
  imports: [CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList {
  courses = [
    { id: 101, name: 'Angular Fundamentals', code: 'ANG101', credits: 4 },
    { id: 102, name: 'TypeScript Mastery', code: 'TS102', credits: 3 },
    { id: 103, name: 'RxJS Deep Dive', code: 'RJS103', credits: 4 },
    { id: 104, name: 'Reactive Patterns', code: 'RP104', credits: 3 },
    { id: 105, name: 'Component Design', code: 'CD105', credits: 2 },
  ];

  selectedCourseId: number | null = null;

  onEnroll(courseId: number) {
    console.log('Enrolling in course:', courseId);
    this.selectedCourseId = courseId;
  }
}
