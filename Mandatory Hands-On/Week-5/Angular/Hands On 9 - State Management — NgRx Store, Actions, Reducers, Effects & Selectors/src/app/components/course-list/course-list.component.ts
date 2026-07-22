import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject, combineLatest, map } from 'rxjs';
import { Course } from '../../models/course.model';
import { CourseCardComponent } from '../course-card/course-card.component';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';
import { loadCourses } from '../../store/course/course.actions';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CourseCardComponent, FormsModule, AsyncPipe],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  searchTerm = '';
  private searchSubject = new BehaviorSubject<string>('');
  loading$: Observable<boolean>;
  errorMessage$: Observable<string | null>;
  courses$: Observable<Course[]>;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loading$ = this.store.select(selectCoursesLoading);
    this.errorMessage$ = this.store.select(selectCoursesError);
    this.courses$ = combineLatest([
      this.store.select(selectAllCourses),
      this.searchSubject
    ]).pipe(
      map(([courses, term]) =>
        term
          ? courses.filter(c => c.name.toLowerCase().includes(term.toLowerCase()))
          : courses
      )
    );
  }

  ngOnInit(): void {
    this.store.dispatch(loadCourses());
  }

  onSearchChange(): void {
    this.searchSubject.next(this.searchTerm);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: this.searchTerm || null },
      queryParamsHandling: 'merge'
    });
  }

  navigateToCourse(courseId: number): void {
    this.router.navigate(['courses', courseId]);
  }
}
