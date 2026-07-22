import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: Course[] = [
    { id: 1, name: 'Angular Fundamentals', code: 'ANG101', credits: 3, gradeStatus: 'A' },
    { id: 2, name: 'TypeScript Deep Dive', code: 'TS201', credits: 4, gradeStatus: 'B+' },
    { id: 3, name: 'RxJS in Action', code: 'RX301', credits: 3, gradeStatus: 'A-' },
    { id: 4, name: 'Reactive Patterns', code: 'RP401', credits: 4, gradeStatus: 'B' },
    { id: 5, name: 'Web Performance', code: 'WP501', credits: 2, gradeStatus: 'A+' }
  ];

  getCourses(): Course[] {
    return this.courses;
  }

  getCourseById(id: number): Course | undefined {
    return this.courses.find(course => course.id === id);
  }

  addCourse(course: Course): void {
    this.courses.push(course);
  }
}
