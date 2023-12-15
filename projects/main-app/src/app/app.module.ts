import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuroraImageUploadModule} from "../../../aurora-image-upload/src/lib/aurora-image-upload.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuroraImageUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
