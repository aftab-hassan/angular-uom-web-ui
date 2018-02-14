import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'ge-web-ui-lib/shared.module';
import { InsightApplicationsComponent } from './insightApplications.component';
import { UploadInsightApplicationComponent } from './upload/insightApplication.upload.component';
import { InsightApplicationsFilterPipe } from './insightApplications.filter.pipe';
import { routing } from './insightApplications.routing';

@NgModule({
  declarations: [ InsightApplicationsComponent, UploadInsightApplicationComponent, InsightApplicationsFilterPipe ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    SharedModule,
    routing
  ],
  bootstrap: [ InsightApplicationsComponent ]
})
export class InsightApplicationsModule{}
