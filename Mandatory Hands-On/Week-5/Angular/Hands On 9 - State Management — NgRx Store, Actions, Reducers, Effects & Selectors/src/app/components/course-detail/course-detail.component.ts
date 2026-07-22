import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { Course } from '../../models/course.model';
import { Student } from '../../models/student.model';
import { switchMap, tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent implements OnInit {
  course: Course | undefined;
  enrolledStudents: Student[] = [];
  loadingStudents = false;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      tap(() => {
        this.loadingStudents = true;
        this.enrolledStudents = [];
      }),
      // switchMap cancels the previous HTTP request when the route parameter changes.
      // This prevents stale or out-of-order responses when navigating between courses quickly.
      switchMap(params => {
        const id = Number(params.get('id'));
        if (!id) return of(undefined);
        return this.courseService.getCourseById(id);
      }),
      switchMap(course => {
        this.course = course;
        if (!course) return of([] as Student[]);
        return this.enrollmentService.getEnrollmentsByCourseId(course.id).pipe(
          switchMap(enrollments => {
            const studentIds = [...new Set(enrollments.map(e => e.studentId))];
            return this.enrollmentService.getStudentsByIds(studentIds);
          })
        );
      }),
      catchError(() => {
        this.loadingStudents = false;
        return of([] as Student[]);
      })
    ).subscribe({
      next: students => {
        this.enrolledStudents = students;
        this.loadingStudents = false;
      }
    });
  }
}
