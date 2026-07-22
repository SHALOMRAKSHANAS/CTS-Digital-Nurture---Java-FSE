import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    { id: 1, name: 'Angular Fundamentals', code: 'ANG101', credits: 3, gradeStatus: 'A' },
    { id: 2, name: 'TypeScript Deep Dive', code: 'TS201', credits: 4, gradeStatus: 'B+' },
    { id: 3, name: 'RxJS in Action', code: 'RX301', credits: 0, gradeStatus: 'A-' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        CourseService
      ]
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch courses and return only those with credits > 0', () => {
    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual([mockCourses[0], mockCourses[1]]);
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should handle HTTP 500 error and return error message', () => {
    const errorSpy = vi.fn();
    service.getCourses().subscribe({
      next: () => { throw new Error('expected error'); },
      error: errorSpy
    });

    for (let i = 0; i < 3; i++) {
      const req = httpMock.expectOne('http://localhost:3000/courses');
      req.flush('Server error', {
        status: 500,
        statusText: 'Internal Server Error'
      });
    }

    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy.mock.calls[0][0].message).toBe('Failed to load courses. Please try again.');
  });
});
