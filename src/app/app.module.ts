import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SharedModule } from 'ge-web-ui-lib/shared.module';
import { VerifyComponent } from 'ge-web-ui-lib/verify';
import { ErrorComponent } from 'ge-web-ui-lib/error';
import { HttpFileUploadService, XmlHttpRequestService } from 'ge-web-ui-lib/services';

import { AppComponent } from './app.component';
import { store, effects } from './store';
import { routing } from './app.routing';
import { AuthGuard } from './guards/authGuard';

@NgModule({
  declarations: [AppComponent, ErrorComponent, VerifyComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SharedModule,
    store,
    routing,
    ...effects
  ],
  providers: [ AuthGuard, HttpFileUploadService, XmlHttpRequestService ],
  bootstrap: [ AppComponent ]
})
export class AppModule{}
