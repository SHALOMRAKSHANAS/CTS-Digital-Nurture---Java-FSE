import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { CourseCardComponent } from '../course-card/course-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CourseCardComponent, FormsModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  searchTerm = '';

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.courses = this.courseService.getCourses();
    const search = this.route.snapshot.queryParamMap.get('search');
    if (search) {
      this.searchTerm = search;
      this.courses = this.courses.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }
  }

  onSearchChange(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: this.searchTerm || null },
      queryParamsHandling: 'merge'
    });
    this.courses = this.courseService.getCourses();
    if (this.searchTerm) {
      this.courses = this.courses.filter(c =>
        c.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  navigateToCourse(courseId: number): void {
    this.router.navigate(['courses', courseId]);
  }
}
