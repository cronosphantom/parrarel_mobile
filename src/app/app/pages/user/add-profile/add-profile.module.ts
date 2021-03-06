import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddProfilePageRoutingModule } from './add-profile-routing.module';

import { AddProfilePage } from './add-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddProfilePageRoutingModule
  ],
  declarations: [AddProfilePage]
})
export class AddProfilePageModule { }
