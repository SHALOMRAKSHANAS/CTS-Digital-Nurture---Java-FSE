# Hands-On 5 - Reactive Forms — FormBuilder, FormGroup, FormArray & Custom

## ReactiveFormsModule
Provides the infrastructure for building reactive forms in Angular. It must be imported in the standalone component's `imports` array to enable directives like `formGroup`, `formControlName`, and `formArrayName`.

## FormBuilder
A service that provides convenience methods for creating `FormGroup`, `FormControl`, and `FormArray` instances with less boilerplate. Injected via the component constructor.

## FormGroup
Represents a collection of `FormControl` instances grouped together. Tracks the aggregate validity and value of its child controls. Bound to the `<form>` element using `[formGroup]`.

## FormControl
Represents a single form control with its value and validation state. Created via `new FormControl(value, validators)` or through `FormBuilder`. Bound to input elements using `formControlName`.

## FormArray
Represents a collection of `FormControl` (or nested `FormGroup`/`FormArray`) instances that can be dynamically added or removed. Accessed via `formArrayName` in the template.

## Validators
Built-in validation functions such as `Validators.required`, `Validators.minLength(3)`, `Validators.email`, and `Validators.requiredTrue`. Applied as the second argument in the form control definition array.

## Custom Validator
A user-defined synchronous validator function that returns `ValidationErrors | null`. Returns an error object `{ validatorName: true }` when validation fails, or `null` when valid.

## Async Validator
A user-defined asynchronous validator that returns `Observable<ValidationErrors | null>` or `Promise<ValidationErrors | null>`. Applied as the third argument in the form control definition array. Useful for server-side validation like checking email availability.

## Reactive Forms vs Template Driven Forms
- **Reactive Forms**: Form model is defined programmatically in the component class. Uses `FormGroup`, `FormControl`, `FormBuilder`. Better for complex forms, unit testing, and custom validation.
- **Template Driven Forms**: Form model is defined indirectly via directives (`NgForm`, `NgModel`) in the template. Simpler for basic forms, but harder to test and scale.

## value()
Returns the current value of the form, **excluding** disabled controls. Disabled form controls are omitted from the returned object.

## getRawValue()
Returns the current value of the form, **including** disabled controls. Disabled controls appear in the returned object with their current values.

## Key Components
| File | Purpose |
|------|---------|
| `reactive-enrollment-form.ts` | Component class with reactive form logic |
| `reactive-enrollment-form.html` | Template with `[formGroup]` and `formControlName` |
| `reactive-enrollment-form.css` | Styling matching the existing enrollment form |

## Custom Validators Implemented
- **`noCourseCode()`** — Synchronous validator. Returns `{ noCourseCode: true }` if the course ID starts with "XX".
- **`simulateEmailCheck()`** — Async validator. After 800ms delay, returns `{ emailTaken: true }` if the email contains "test@".

## FormArray
The `additionalCourses` field is a `FormArray<FormControl<string | null>>`. Users can dynamically add/remove course controls. A typed getter ensures type safety in the template without repeated casting.
