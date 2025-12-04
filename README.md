# AngularMasteryCurriculum

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Angular Defer Block Example

This project includes a standalone Angular component (`DeferExampleComponent`) demonstrating the `@defer` block functionality introduced in Angular. The `@defer` block allows you to lazily load parts of your template, improving initial load times and resource utilization.

The `DeferExampleComponent` showcases the following aspects of `@defer`:

-   **`@defer (on viewport)`**: This trigger means the deferred content will only begin to load when it becomes visible within the user's browser window (the "viewport"). This is particularly useful for content that is initially "below the fold" (not visible without scrolling), as it prevents unnecessary loading of resources until they are actually needed.
-   **`@defer (on hover)`**: This trigger causes the deferred content to load when the user's mouse cursor hovers over a specified element. In this example, hovering over a button will trigger the loading of the associated deferred content.
-   **`@placeholder`**: Content displayed while the deferred block is waiting for its trigger condition to be met. In this example, it prompts the user to scroll down or hover over a button.
-   **`@loading (minimum 1s)`**: Content displayed while the deferred block's dependencies are being loaded. A `minimum 1s` delay is added to ensure the loading state is visible, simulating a network request.
-   **`@error`**: Content displayed if there's an error during the loading of the deferred block's dependencies.

Inside the `@defer` blocks, a `DeferredContentComponent` is loaded. This component simulates fetching data asynchronously with a 2-second delay using `setTimeout` and then displays mock data. This demonstrates how you can load dynamic content within a deferred block.

To see the `@defer` example in action:

1.  Ensure the application is running (`ng serve`).
2.  Open your browser to `http://localhost:4200/`.
3.  **For `on viewport`**: Scroll down the page to bring the first deferred content into view. You will observe the `@placeholder` content initially, followed by the `@loading` content for at least 1 second, and finally the `DeferredContentComponent` displaying its mock data once it's loaded.
4.  **For `on hover`**: Locate the "Hover over me to load content" button. Place your mouse cursor over this button. You will see the `@placeholder` replaced by the `@loading` content for at least 1 second, and then the `DeferredContentComponent` will appear with its mock data.

This example provides a basic illustration. `@defer` offers various other triggers (e.g., `on interaction`, `on timer`, `when`), and options for customizing loading behavior. Refer to the [Angular documentation on @defer](https://angular.dev/guide/templates/defer) for more advanced usage.
