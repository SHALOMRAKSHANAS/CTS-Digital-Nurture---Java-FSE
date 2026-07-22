# Hands-On 3 — Directives & Pipes (Built-in and Custom)

## Structural Directives

### `*ngIf`
Conditionally renders an element based on a boolean expression.
```html
<div *ngIf="isLoading">Loading courses...</div>
```
Supports `else` syntax with an `ng-template` reference:
```html
<div *ngIf="courses.length > 0; else noCourses">...</div>
<ng-template #noCourses><p>No courses available.</p></ng-template>
```

### `*ngFor`
Repeats an element for each item in an array.
```html
<div *ngFor="let course of courses; index as i; trackBy: trackByCourseId">
```
- `index` exposes the current iteration index.
- `trackBy` improves performance by helping Angular identify which items changed, were added, or were removed — avoiding unnecessary DOM re-creation.

### `*ngSwitch`
Conditionally displays one child template from a set of possible values.
```html
<div [ngSwitch]="course?.gradeStatus">
  <span *ngSwitchCase="'passed'">Passed</span>
  <span *ngSwitchCase="'failed'">Failed</span>
  <span *ngSwitchCase="'pending'">Pending</span>
  <span *ngSwitchDefault>Pending</span>
</div>
```

## Attribute Directives

### `ngClass`
Dynamically adds/removes CSS classes based on an object expression.
```html
[ngClass]="cardClasses"
```
A getter in the component class keeps the template clean and logic testable:
```typescript
get cardClasses() {
  return {
    'card--enrolled': this.enrolled,
    'card--full': (this.course?.credits ?? 0) >= 4,
    expanded: this.isExpanded,
  };
}
```

### `ngStyle`
Dynamically applies inline styles.
```html
[ngStyle]="{ 'border-left': '5px solid ' + borderColor }"
```

## `trackBy`
A function passed to `*ngFor` that returns a unique identifier for each item. Angular uses this to track item identity across re-renders, significantly reducing DOM manipulations when the list changes.

## Custom Directive (`appHighlight`)
- Generated with the Angular CLI.
- Uses `@HostListener('mouseenter')` and `@HostListener('mouseleave')` to respond to hover events.
- Default highlight color is `yellow`, configurable via the `appHighlight` input binding.
- Applied to course cards to visually highlight them on hover.
```html
<div appHighlight="lightblue">...</div>
```

## Custom Pipe (`creditLabel`)
- Implements `PipeTransform` to transform data in templates.
- Logic:
  - `1` → `"1 Credit"`
  - `2+` → `"X Credits"`
  - `0`, `null`, `undefined` → `"No Credits"`
- Usage in template:
```html
<p>Credits: {{ course?.credits | creditLabel }}</p>
```
