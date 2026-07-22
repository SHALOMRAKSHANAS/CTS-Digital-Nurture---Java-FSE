import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Observable, of, delay, map } from 'rxjs';

@Component({
  selector: 'app-reactive-enrollment-form',
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css',
})
export class ReactiveEnrollmentForm {
  enrollForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: ['', [Validators.required, Validators.email], [this.simulateEmailCheck()]],
      courseId: ['', [Validators.required, this.noCourseCode()]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array<FormControl<string | null>>([]),
    });
  }

  get additionalCourses(): FormArray<FormControl<string | null>> {
    return this.enrollForm.get('additionalCourses') as FormArray<FormControl<string | null>>;
  }

  addCourse(): void {
    this.additionalCourses.push(new FormControl('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  noCourseCode() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value && value.toString().startsWith('XX')) {
        return { noCourseCode: true };
      }
      return null;
    };
  }

  simulateEmailCheck() {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(control.value).pipe(
        delay(800),
        map((email) => {
          if (email && email.includes('test@')) {
            return { emailTaken: true };
          }
          return null;
        })
      );
    };
  }

  onSubmit(): void {
    console.log('enrollForm.value:', this.enrollForm.value);
    console.log('enrollForm.getRawValue():', this.enrollForm.getRawValue());
  }
}
