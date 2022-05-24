import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPageRoutingModule } from './view-routing.module';

import { ViewPage } from './view.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    ViewPageRoutingModule
  ],
  declarations: [ViewPage]
})
export class ViewPageModule {}
