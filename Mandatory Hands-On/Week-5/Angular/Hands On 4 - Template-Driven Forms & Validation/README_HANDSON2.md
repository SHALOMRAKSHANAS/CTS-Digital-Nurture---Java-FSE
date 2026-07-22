# Hands-On 2 — Data Binding, Lifecycle Hooks & Component Communication

## Data Binding Types

| Type | Syntax | Description |
|------|--------|-------------|
| **Interpolation** | `{{ expression }}` | Renders the component property value into the template. |
| **Property Binding** | `[property]="expression"` | Binds a DOM property to a component value (one-way: component → view). |
| **Event Binding** | `(event)="handler()"` | Listens to DOM events and invokes a component method (one-way: view → component). |
| **Two-way Binding** | `[(ngModel)]="property"` | Synchronises data both ways — view changes update the component and component changes update the view. Requires `FormsModule`. |

## Lifecycle Hooks

| Hook | Description |
|------|-------------|
| **ngOnInit** | Called once after the component's data-bound properties are initialised. Used for setup logic such as fetching data. |
| **ngOnDestroy** | Called just before the component is destroyed. Used for cleanup such as unsubscribing from observables. |
| **ngOnChanges** | Called whenever an `@Input()` property changes. Receives a `SimpleChanges` object with previous and current values. |

## Component Communication

| Decorator | Description |
|-----------|-------------|
| **@Input()** | Marks a property as receiving data from a parent component. |
| **@Output()** | Marks a property as an event that the child component emits to the parent. |
| **EventEmitter** | A class used with `@Output()` to emit custom events with typed payloads. |

## Project Structure

```
src/app/
├── app.ts / app.html          — Root component; hosts Home and CourseList
├── home/                       — Task 1 & 2: data binding demos + OnInit/OnDestroy
├── course-list/                — Task 3: parent component with 5 courses
└── components/
    └── course-card/            — Task 2 & 3: child component with @Input/@Output/OnChanges
```
