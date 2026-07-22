import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent implements OnInit {
  @Input({ required: true }) course!: Course;
  @Output() courseClick = new EventEmitter<number>();

  isEnrolled = false;

  constructor(private enrollmentService: EnrollmentService) {}

  ngOnInit(): void {
    this.enrollmentService.isEnrolled(this.course.id).subscribe({
      next: enrolled => this.isEnrolled = enrolled
    });
  }

  toggleEnrollment(): void {
    if (this.isEnrolled) {
      this.enrollmentService.getEnrollmentByCourseId(this.course.id).subscribe({
        next: enrollment => {
          if (enrollment) {
            this.enrollmentService.unenroll(enrollment.id).subscribe({
              next: () => this.isEnrolled = false
            });
          }
        }
      });
    } else {
      this.enrollmentService.enroll(this.course.id).subscribe({
        next: () => this.isEnrolled = true
      });
    }
  }
}
