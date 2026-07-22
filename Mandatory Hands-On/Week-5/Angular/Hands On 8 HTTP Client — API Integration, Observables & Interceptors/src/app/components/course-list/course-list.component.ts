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
  allCourses: Course[] = [];
  searchTerm = '';
  loading = true;
  errorMessage = '';

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.errorMessage = '';
    this.courseService.getCourses().subscribe({
      next: courses => {
        this.allCourses = courses;
        this.applySearch();
        this.loading = false;
      },
      error: err => {
        this.errorMessage = err.message || 'An unexpected error occurred.';
        this.loading = false;
      }
    });
  }

  private applySearch(): void {
    if (this.searchTerm) {
      this.courses = this.allCourses.filter(c =>
        c.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.courses = [...this.allCourses];
    }
  }

  onSearchChange(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: this.searchTerm || null },
      queryParamsHandling: 'merge'
    });
    this.applySearch();
  }

  navigateToCourse(courseId: number): void {
    this.router.navigate(['courses', courseId]);
  }
}
