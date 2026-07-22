import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Course } from '../models/course.model';
import { Enrollment } from '../models/enrollment.model';
import { Student } from '../models/student.model';
import { CourseService } from './course.service';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = 'http://localhost:3000/enrollments';
  private studentsUrl = 'http://localhost:3000/students';
  private readonly currentStudentId = 1;

  constructor(
    private http: HttpClient,
    private courseService: CourseService
  ) {}

  enroll(courseId: number): Observable<Enrollment> {
    const enrollment = {
      studentId: this.currentStudentId,
      courseId,
      enrolledDate: new Date().toISOString().split('T')[0]
    };
    return this.http.post<Enrollment>(this.apiUrl, enrollment);
  }

  unenroll(enrollmentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${enrollmentId}`);
  }

  isEnrolled(courseId: number): Observable<boolean> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}?studentId=${this.currentStudentId}&courseId=${courseId}`).pipe(
      map(enrollments => enrollments.length > 0)
    );
  }

  getEnrolledCourses(): Observable<Course[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}?studentId=${this.currentStudentId}`).pipe(
      switchMap(enrollments => {
        if (enrollments.length === 0) {
          return of([]);
        }
        const courseRequests = enrollments.map(e =>
          this.courseService.getCourseById(e.courseId)
        );
        return forkJoin(courseRequests);
      })
    );
  }

  getEnrollmentByCourseId(courseId: number): Observable<Enrollment | undefined> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}?studentId=${this.currentStudentId}&courseId=${courseId}`).pipe(
      map(enrollments => enrollments.length > 0 ? enrollments[0] : undefined)
    );
  }

  getEnrollmentsByCourseId(courseId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}?courseId=${courseId}`);
  }

  getStudentsByIds(studentIds: number[]): Observable<Student[]> {
    if (studentIds.length === 0) {
      return of([]);
    }
    const requests = studentIds.map(id =>
      this.http.get<Student>(`${this.studentsUrl}/${id}`)
    );
    return forkJoin(requests);
  }
}
