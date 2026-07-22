import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [],
  templateUrl: './course-summary-widget.component.html',
  styleUrl: './course-summary-widget.component.css'
})
export class CourseSummaryWidgetComponent implements OnInit {
  totalCourses = 0;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: courses => this.totalCourses = courses.length
    });
  }

  addDemoCourse(): void {
    const newCourse: Omit<Course, 'id'> = {
      name: 'Demo Course',
      code: 'DEMO001',
      credits: 3,
      gradeStatus: 'N/A'
    };
    this.courseService.createCourse(newCourse).subscribe({
      next: () => {
        this.courseService.getCourses().subscribe({
          next: courses => this.totalCourses = courses.length
        });
      }
    });
  }
}
