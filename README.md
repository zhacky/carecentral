# Care Central HMS

## This is the frontend for the Carecentral project. It is built using Angular.
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.

To test this against an API, you can download the [Carecentral API](https://drive.google.com/file/d/18CdljW7tFoE6GR_S52H1C2RMZLEHIWf_/view?usp=sharing) and run it using the following command:
```bash
java -jar api-runner.jar
```
_You must have Java with minimum version 17 installed on your machine to run the API._

Example http requests can be found in the `api-tests.http` file.

## Instructions
### Structure:
```
carecentral/
├── src/
│   ├── app/
│   │   ├──core/
│   │   │   ├── interceptors/ 
│   │   │   ├── models/ 
│   │   │   ├── services/

│   │   ├──features/ 
│   │   │   ├──dashboard/

│   │   ├──shared/
│   │   │   ├──components/

│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css

│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.development.ts
│   ├── index.html
│   ├── main.ts
│   ├── styles.css
│   └── test.ts
├── angular.json
├── package.json
├── tsconfig.json
└── tslint.json

```

### Components:
✅ Make sure all shared or common components are created in the `src/app/shared/components` directory.

✅ Make sure all standalone components (pages) are created in the `src/app/features/` directory.

✅ Make sure to add routes for all components in the `src/app/app-routes.ts` file.

### Models (or interfaces):
Models are used to define the structure of the data that is being passed around in the application.
In Typescript, they are called interfaces.

✅ Make sure all models are created in the `src/app/core/models` directory.




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
