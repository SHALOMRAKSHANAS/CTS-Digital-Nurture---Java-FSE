import { Component } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [],
  templateUrl: './course-summary-widget.component.html',
  styleUrl: './course-summary-widget.component.css'
})
export class CourseSummaryWidgetComponent {
  constructor(private courseService: CourseService) {}

  get totalCourses(): number {
    return this.courseService.getCourses().length;
  }

  addDemoCourse(): void {
    const newCourse: Course = {
      id: Date.now(),
      name: 'Demo Course',
      code: 'DEMO001',
      credits: 3,
      gradeStatus: 'N/A'
    };
    this.courseService.addCourse(newCourse);
  }
}
