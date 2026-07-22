import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { CourseCard } from '../components/course-card/course-card';

@Component({
  selector: 'app-course-list',
  imports: [NgForOf, NgIf, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  courses = [
    { id: 101, name: 'Angular Fundamentals', code: 'ANG101', credits: 4, gradeStatus: 'passed' },
    { id: 102, name: 'TypeScript Mastery', code: 'TS102', credits: 3, gradeStatus: 'failed' },
    { id: 103, name: 'RxJS Deep Dive', code: 'RJS103', credits: 4, gradeStatus: 'pending' },
    { id: 104, name: 'Reactive Patterns', code: 'RP104', credits: 3, gradeStatus: 'passed' },
    { id: 105, name: 'Component Design', code: 'CD105', credits: 2, gradeStatus: 'pending' },
  ];

  isLoading = true;
  selectedCourseId: number | null = null;

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  trackByCourseId(index: number, course: { id: number }): number {
    return course.id;
  }

  onEnroll(courseId: number) {
    console.log('Enrolling in course:', courseId);
    this.selectedCourseId = courseId;
  }
}
