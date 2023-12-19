# Aurora Image Upload Library

This library provides a user-friendly component for uploading and validating images in Angular applications. It supports both file chooser and drag-and-drop methods for image uploading.

## Key Features

- **Image Dimension Limitations**: Set maximum width and height for the uploaded image in pixels using the `max_width` and `max_height` inputs. This helps to ensure that the uploaded image fits within your application's design constraints.

- **Image Size Limitation**: Limit the size of the uploaded image using the `max_size` input. This input accepts the size in bytes, providing flexibility to set the limit based on your application's needs.

- **Image Type Validation**: Restrict the types of images that can be uploaded using the `validImageTypes` input. This input accepts an array of image MIME types, allowing you to specify which image formats are valid for your application.

- **Initial Image Setting**: Pre-load an image in the upload component using the `initImageUrl` input. This is useful when you want to display a default image before the user uploads a new one.

- **Image Upload Event**: The `uploadedImageFile` output emits the file of the uploaded image, allowing you to handle the image file in your application's logic. If the image is removed, it emits null.

## Installation

Install the library using npm:
```bash
npm install aurora-image-upload
```

## Usage

Import the `AuroraImageUploadModule` in your Angular module:
```typescript
import { AuroraImageUploadModule } from 'aurora-image-upload';

@NgModule({ 
  imports: [ 
    // other imports 
    AuroraImageUploadModule 
  ], 
    // other properties 
}) 
export class AppModule { }
```

Use the `aurora-image-upload` component in your Angular templates:
```html
<aurora-image-upload 
  [max_height]="1000" 
  [max_width]="1000" 
  [max_size]="1000" 
  [validImageTypes]="['image/jpeg', 'image/png']" 
  [initImageUrl]="'https://example.com/image.jpg'" 
  (uploadedImageFile)="handleImageUpload($event)"> 
</aurora-image-upload>
```
