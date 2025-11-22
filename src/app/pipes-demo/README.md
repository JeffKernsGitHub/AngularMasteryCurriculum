# Angular Pipes Demo

This project demonstrates the use of built-in and custom pipes in Angular.

## What are Pipes?

Pipes are a simple way to transform data in your Angular templates. You can use them to format strings, currency amounts, dates, and other data for display. A pipe takes in data as input and returns a transformed value. You use the pipe operator (`|`) in your template expressions to apply a pipe to a value.

## Why are Pipes Useful?

Pipes are useful for several reasons:

*   **Encapsulation**: They encapsulate data transformation logic, keeping it separate from your component's logic. This makes your components cleaner and more focused on their primary responsibilities.
*   **Reusability**: A single pipe can be used throughout your application, in any template where you need that specific transformation. This reduces code duplication.
*   **Readability**: Using pipes in your templates makes the intent of your code clear. For example, `{{ birthday | date }}` is much more readable than calling a formatting method in your component.
*   **Performance**: Angular can optimize the use of pipes. Pure pipes (the default) are only executed when their input value changes, which can improve your application's performance.

## Getting Started

1.  Run `npm install` to install the dependencies.
2.  Run `ng serve` to start the development server.
3.  Navigate to `http://localhost:4200/` to see the application.

## Pipes Demonstrated

### Built-in Pipes

*   **DatePipe**: Formats a date value according to locale rules.
    *   `{{ currentDate | date }}`
    *   `{{ currentDate | date:'short' }}`
*   **DecimalPipe**: Transforms a number into a string with a decimal point, formatted according to locale rules.
    *   `{{ someNumber | number }}`
    *   `{{ someNumber | number:'1.2-2' }}`
*   **CurrencyPipe**: Transforms a number to a currency string, formatted according to locale rules.
    *   `{{ someNumber | currency:'USD':'symbol' }}`
*   **UpperCasePipe**: Transforms text to all upper case.
    *   `{{ someString | uppercase }}`
*   **LowerCasePipe**: Transforms text to all lower case.
    *   `{{ someString | lowercase }}`
*   **TitleCasePipe**: Transforms text to title case.
    *   `{{ someString | titlecase }}`
*   **JsonPipe**: Displays an object in JSON format.
    *   `<pre>{{ someObject | json }}</pre>`

### Custom Pipe

*   **CustomDatePipe**: A custom pipe that formats a date into `DD-MMM-YYYY` format.
    *   `{{ currentDate | customDate }}`

## How to Create a Custom Pipe

1.  **Create the pipe:**
    *   Use the Angular CLI: `ng generate pipe custom-date`
    *   Or create the file manually, like in this project.
2.  **Implement the `PipeTransform` interface:**
    *   The `transform` method takes the value to be transformed as the first argument, and any additional parameters as subsequent arguments.
3.  **Add the `@Pipe` decorator:**
    *   The `name` property is the name you'll use in your templates.
4.  **Make the pipe available to your component:**
    *   If the pipe is standalone, add it to the `imports` array of the component.
    *   If it's part of a module, declare it in the module and import that module into your component's module.

In this project, the `CustomDatePipe` is a standalone pipe, so it is imported directly into the `PipesDemoComponent`.
