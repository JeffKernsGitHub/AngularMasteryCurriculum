# AngularMasteryCurriculum

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Zoneless Signal Change Detection Example

This project includes a real-world example of zoneless change detection using Angular signals, a reactive form, and a mock API service. You can find the example in `src/app/zoneless-example`.

### How it Works

This example demonstrates how to build a form that fetches and saves data using a mock API, and how Angular's signal-based change detection efficiently updates the UI.

The component uses a reactive form to manage the user's first and last name. When the component initializes, it fetches the user's data from a mock API and populates the form. When the user submits the form, the component saves the data back to the mock API and updates the UI.

**Zoneless Change Detection:**
This project is configured to use **zoneless change detection** by leveraging `provideZonelessChangeDetection()` in `app.config.ts`. Crucially, **Zone.js has been removed from the project's polyfills** (in `angular.json`). This means the application does not rely on Zone.js to detect changes. Instead, Angular's reactivity system, powered by signals, precisely tracks dependencies and updates only the necessary parts of the UI when a signal's value changes. This leads to more efficient and predictable change detection.

### Key Concepts

The example demonstrates several key concepts:

*   **`signal()`:** A signal is used to hold the user's data. When the data is fetched from the API or updated, the signal is updated, which automatically triggers the dependency graph.
*   **`computed()`:** A computed signal is used to derive the user's full name from the `user` signal. It is automatically recalculated whenever the `user` signal changes.
*   **`effect()`:** An effect is used to log a message to the console whenever the `fullName` signal changes. This is a great way to see the change detection in action.
*   **Reactive Forms:** The example uses a reactive form to manage the form's state and validation.
*   **Mock API Service:** A mock API service is used to simulate fetching and saving data from a server.

### The Dependency Graph

The example in `src/app/zoneless-example/zoneless-example.component.ts` creates the following dependency graph:

```
`user` (signal) -> `fullName` (computed) -> `updateMessage` (effect)
```

1.  The `user` signal holds the user's data.
2.  The `fullName` computed signal is derived from the `user` signal.
3.  The `updateMessage` effect is triggered whenever the `fullName` signal changes.

When you submit the form, the following chain of events occurs:

1.  The `onSubmit` method calls the mock API to save the user's data.
2.  The API returns the saved data, and the `user` signal is updated.
3.  The `fullName` computed signal is automatically recalculated.
4.  The `updateMessage` effect is run, which logs the new full name to the console.

This all happens without zone.js, and only the parts of the application that depend on the `user` signal are updated.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
