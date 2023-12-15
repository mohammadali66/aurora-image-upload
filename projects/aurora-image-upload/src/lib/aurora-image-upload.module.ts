import { NgModule } from '@angular/core';
import { AuroraImageUploadComponent } from './aurora-image-upload.component';
import {DragDropImageDirective} from "./drag-drop-image/drag-drop-image.directive";



@NgModule({
  declarations: [
    AuroraImageUploadComponent,
    DragDropImageDirective
  ],
  imports: [
  ],
  exports: [
    AuroraImageUploadComponent
  ]
})
export class AuroraImageUploadModule { }
