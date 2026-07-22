# Hands-On 10: Unit Testing Angular Applications — Jasmine, Karma & TestBed

## Overview

This project adds comprehensive unit testing to the Student Course Portal application. Tests cover **CourseCardComponent**, **CourseService**, and **CourseListComponent** using Angular's testing utilities and NgRx testing tools.

## Testing Concepts Covered

### Jasmine
- Behavior-driven development (BDD) testing framework
- `describe` blocks for test suites
- `it` blocks for individual test cases
- `expect` with matchers for assertions
- `beforeEach` for test setup
- `spyOn` for method call tracking

### Karma
- Test runner that executes Jasmine tests in real browsers
- Configured via `angular.json` using `@angular/build:unit-test` builder
- Provides browser environment for DOM-based tests

### TestBed
- Angular's primary testing API
- `TestBed.configureTestingModule()` to configure testing module
- `TestBed.createComponent()` to create component fixtures
- `ComponentFixture` for component introspection and control

### HttpTestingController
- From `@angular/common/http/testing`
- Mocks HTTP requests in service tests
- `expectOne()` to assert a single request was made
- `flush()` to provide mock response data
- `verify()` to assert no outstanding requests remain

### provideMockStore
- From `@ngrx/store/testing`
- Provides a mock NgRx Store for component tests
- `store.setState()` to update state programmatically
- Verifies components render correctly based on store state

### spyOn
- `spyOn(object, 'method')` to track method calls
- `toHaveBeenCalledWith()` to verify call arguments

### fixture.detectChanges()
- Triggers Angular change detection
- Updates component bindings and DOM rendering
- Required after state changes to see DOM updates

### Code Coverage
- Run `ng test --code-coverage` to generate coverage reports
- Reports show which lines, branches, functions, and statements are tested
- Output in `/coverage` directory

## Test Files

| Test File | Component/Service Tested | Tests |
|-----------|------------------------|-------|
| `src/app/components/course-card/course-card.component.spec.ts` | CourseCardComponent | Creation, @Input rendering, @Output emit, ngOnChanges |
| `src/app/services/course.service.spec.ts` | CourseService | GET request, HTTP 500 error handling |
| `src/app/components/course-list/course-list.component.spec.ts` | CourseListComponent | Course card rendering, loading state display |
| `src/app/app.spec.ts` | App (root) | Component creation |

## Running Tests

```bash
# Run all tests
ng test

# Run tests with code coverage
ng test --code-coverage

# Run tests in watch mode (default)
ng test --watch
```

## Key Testing Patterns

### Component with @Input and @Output
```typescript
component.course = mockCourse;
fixture.detectChanges();
spyOn(component.courseClick, 'emit');
// trigger event
expect(component.courseClick.emit).toHaveBeenCalledWith(expectedValue);
```

### Service with HttpClient
```typescript
service.getCourses().subscribe(courses => {
  expect(courses.length).toBe(2);
});
const req = httpMock.expectOne('http://localhost:3000/courses');
req.flush(mockData);
httpMock.verify();
```

### Component with NgRx Store
```typescript
provideMockStore({ initialState });
// ...
store.setState({ ...state, loading: true });
fixture.detectChanges();
expect(element.textContent).toContain('Loading...');
```

## Requirements

- All tests pass with `ng test`
- Code coverage generated with `ng test --code-coverage`
- No TypeScript errors
- No Angular runtime errors
- Follows Angular testing best practices
