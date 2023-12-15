import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import { AuroraImageUploadComponent } from './aurora-image-upload.component';
import {DragDropImageDirective} from "./drag-drop-image/drag-drop-image.directive";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";



@NgModule({
  declarations: [
    AuroraImageUploadComponent,
    DragDropImageDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  exports: [
    AuroraImageUploadComponent
  ]
})
export class AuroraImageUploadModule { }
