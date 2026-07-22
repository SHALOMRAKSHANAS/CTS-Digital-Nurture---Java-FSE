# Hands-On 8: HTTP Client — API Integration, Observables & Interceptors

## HttpClient

`HttpClient` is Angular's built-in service for making HTTP requests to backend APIs. It is provided via `provideHttpClient()` (standalone) or `HttpClientModule` (NgModule). All HTTP methods return RxJS `Observable`, enabling reactive data handling.

```typescript
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient()]
};
```

## Observables

Observables are the foundation of Angular's async operations. They represent a stream of values over time and support operators for transformation, filtering, error handling, and composition.

Key characteristics:
- **Lazy**: nothing happens until `.subscribe()` is called.
- **Cancellable**: subscriptions can be unsubscribed to free resources.
- **Operators**: pipable operators like `map`, `tap`, `catchError`, `retry`, `switchMap`.

## Operators

### `map`

Transforms each emitted value. Used here to filter courses with credits > 0.

```typescript
map(courses => courses.filter(course => course.credits > 0))
```

### `tap`

Performs side effects (e.g., logging) without modifying the stream.

```typescript
tap(courses => console.log(`Courses loaded: ${courses.length}`))
```

`tap` is used for logging because it lets us observe values without changing them. It is ideal for debugging and tracing.

### `catchError`

Catches errors in the Observable pipeline and allows returning a fallback or rethrowing.

```typescript
catchError(() => throwError(() => new Error('Failed to load courses. Please try again.')))
```

### `retry`

Re-subscribes to the source Observable a specified number of times on error.

```typescript
retry(2)  // Retries failed API call twice before giving up
```

### `switchMap`

Maps each source value to an inner Observable, cancelling the previous inner Observable when a new source value arrives.

```typescript
switchMap(params => this.courseService.getCourseById(Number(params.get('id'))))
```

`switchMap` is used in course detail navigation to automatically cancel the previous HTTP request when the user clicks a different course, preventing stale data race conditions.

## Interceptors

Interceptors are middleware functions that process every HTTP request and response globally.

### AuthInterceptor

Automatically adds an `Authorization: Bearer mock-token-12345` header to every outgoing HTTP request using functional interceptor pattern.

### ErrorInterceptor

- **401 Unauthorized**: redirects to home page.
- **500 Server Error**: adds a global notification via `NotificationService`.
- Rethrows the error after handling.

### LoadingInterceptor

Shows a global loading spinner before each HTTP request and hides it on completion using `finalize()`.

## LoadingService

A singleton service using `BehaviorSubject<boolean>` to manage global loading state.

```typescript
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loadingSubject.asObservable();

  show() { this.loadingSubject.next(true); }
  hide() { this.loadingSubject.next(false); }
}
```

The `LoadingSpinnerComponent` subscribes via `async` pipe and renders a full-screen overlay.

## JSON Server

JSON Server is a lightweight mock REST API tool. It creates a full REST API from a single `db.json` file.

### Setup

```bash
npm install json-server --save-dev
```

### db.json structure

```json
{
  "courses": [ /* course objects */ ],
  "students": [ /* student objects */ ],
  "enrollments": [ /* enrollment objects */ ]
}
```

### Running

```bash
json-server --watch db.json --port 3000
```

### Endpoints

| Method | Endpoint               | Description       |
|--------|------------------------|-------------------|
| GET    | /courses               | List all courses  |
| GET    | /courses/:id           | Get course by ID  |
| POST   | /courses               | Create a course   |
| PUT    | /courses/:id           | Update a course   |
| DELETE | /courses/:id           | Delete a course   |
| GET    | /students              | List all students |
| POST   | /enrollments           | Create enrollment |

## Running the Application

### Terminal 1: JSON Server

```bash
json-server --watch db.json --port 3000
```

### Terminal 2: Angular Dev Server

```bash
ng serve
```

Navigate to `http://localhost:4200/`.
