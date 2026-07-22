import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { CourseSummaryWidgetComponent } from '../course-summary-widget/course-summary-widget.component';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CourseSummaryWidgetComponent, NotificationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  coursesAvailable = 0;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.coursesAvailable = this.courseService.getCourses().length;
  }
}
