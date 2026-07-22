import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SimpleChanges } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import { CourseCardComponent } from './course-card.component';
import { Course } from '../../models/course.model';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;

  const mockCourse: Course = {
    id: 1,
    name: 'Angular Fundamentals',
    code: 'ANG101',
    credits: 3,
    gradeStatus: 'A'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCardComponent],
      providers: [
        provideMockStore({
          initialState: {
            course: { courses: [], loading: false, error: null },
            enrollment: { enrolledCourseIds: [] }
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    component.course = mockCourse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render course name inside h3', () => {
    const h3Element = fixture.nativeElement.querySelector('h3');
    expect(h3Element).toBeTruthy();
    expect(h3Element.textContent).toContain('Angular Fundamentals');
  });

  it('should emit courseClick with course id when card is clicked', () => {
    vi.spyOn(component.courseClick, 'emit');
    const cardDiv = fixture.debugElement.query(By.css('.course-card'));
    cardDiv.triggerEventHandler('click', null);
    expect(component.courseClick.emit).toHaveBeenCalledWith(mockCourse.id);
  });

  it('should log previous and current values on ngOnChanges', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    const changes: SimpleChanges = {
      course: {
        previousValue: undefined,
        currentValue: mockCourse,
        firstChange: true,
        isFirstChange: () => true
      }
    };
    component.ngOnChanges(changes);
    expect(consoleSpy).toHaveBeenCalledWith('Previous:', undefined);
    expect(consoleSpy).toHaveBeenCalledWith('Current:', mockCourse);
  });
});
