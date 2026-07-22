import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-enrollment-form.component.html',
  styleUrl: './reactive-enrollment-form.component.css'
})
export class ReactiveEnrollmentFormComponent {
  enrollForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  submitted = false;

  constructor(private courseService: CourseService) {}

  onSubmit(): void {
    if (this.enrollForm.valid) {
      const newCourse: Omit<Course, 'id'> = {
        name: this.enrollForm.value.name || '',
        code: 'ENR-' + Date.now(),
        credits: 3,
        gradeStatus: 'N/A'
      };
      this.courseService.createCourse(newCourse).subscribe({
        next: () => {
          this.submitted = true;
          this.enrollForm.markAsPristine();
        },
        error: () => {
          alert('Failed to create course enrollment. Please try again.');
        }
      });
    }
  }
}
