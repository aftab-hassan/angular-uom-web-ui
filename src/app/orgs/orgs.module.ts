import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'ge-web-ui-lib/shared.module';
import { OrgsComponent } from './orgs.component';
import { AddOrgComponent } from './add/org.add.component';
import { EditOrgComponent } from './edit/org.edit.component';
import { OrgsFilterPipe } from './orgs.filter.pipe';
import { store, effects } from '../store';
import { routing } from './orgs.routing';
import { AuthGuard } from '../guards/authGuard';

@NgModule({
  declarations: [ OrgsComponent, AddOrgComponent, EditOrgComponent, OrgsFilterPipe ],
  imports: [ 
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpModule, 
    RouterModule,
    SharedModule,
    routing
  ], 
  providers: [ AuthGuard ],
  bootstrap: [ OrgsComponent ]
})
export class OrgsModule{}