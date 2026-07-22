# Hands-On 4 - Template-Driven Forms & Validation

## Template Driven Forms

A template-driven form is an Angular approach where the form logic is defined primarily in the HTML template using directives. Form controls are created implicitly when directives like `ngModel` are applied to elements.

## FormsModule

`FormsModule` is an Angular module that provides template-driven form directives including `ngModel`, `ngForm`, and validation classes. It must be imported into a standalone component's `imports` array (or into an NgModule) to use template-driven forms.

## ngModel

`ngModel` is a directive that creates a `FormControl` instance from a DOM element and binds it to a component property using two-way binding syntax `[(ngModel)]`. It synchronizes data between the view and the model.

## ngForm

`ngForm` is automatically created on every `<form>` element. It tracks the aggregate validity state of all child form controls. Using the template reference `#enrollForm="ngForm"` gives access to the form's `value`, `valid`, `invalid`, `resetForm()`, and other properties.

## Template Reference Variables

Template reference variables (e.g., `#nameCtrl="ngModel"`) allow accessing a directive instance directly in the template. They are commonly used to check individual control states like `invalid`, `touched`, `dirty`, and `errors`.

## Required Validator

The `required` attribute on an input creates a required validator. The form control is valid only when a value is provided. For checkboxes, it ensures the box is checked.

## MinLength Validator

`minlength="3"` validates that the input value has at least the specified number of characters.

## Email Validator

The `email` attribute (without value) validates that the input follows a basic email format pattern.

## ng-valid / ng-invalid

- `ng-valid`: CSS class added when a form control passes all validators
- `ng-invalid`: CSS class added when a form control fails at least one validator

## touched / dirty

- `touched`: Becomes `true` when the user has blurred (focused then unfocused) the control
- `dirty`: Becomes `true` when the user has changed the value from its initial state

These states are used to control when validation messages appear — typically only after a control is `touched`.

## resetForm()

`resetForm()` is a method on `NgForm` that resets all form controls to their initial values and clears their validation states (valid, invalid, touched, dirty).
