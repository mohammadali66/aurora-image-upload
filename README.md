# AuroraImageUpload

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## How to use it

Aurora image upload component is for uploading image with choose file or drag and drop
Example 1:
```typescript
validImageTypes = ['image/jpeg', 'image/png'];
set_logo(event: any): void {
  debugger
}
```

```angular2html
<aurora-image-upload
      [max_height]="1500"
      [max_width]="1500"
      [max_size]="1512000"
      [validImageTypes]="validImageTypes"
      (uploadedImageFile)="set_logo($event)">
</aurora-image-upload>
```


- When upload an image parent component can access to it with uploadedImageFile output


Example 2:

```typescript
initImageUrl = '/assets/images/ultrasound/image_188.png';
```

```angular2html
<aurora-image-upload
      [max_height]="1500"
      [max_width]="1500"
      [max_size]="1512000"
      [validImageTypes]="validImageTypes"
      [initImageUrl]="initImageUrl"
      (uploadedImageFile)="set_logo($event)">
</aurora-image-upload>
```

- You can set an initial image to the component.
