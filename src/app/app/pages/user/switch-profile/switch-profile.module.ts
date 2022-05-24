import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SwitchProfilePageRoutingModule } from './switch-profile-routing.module';

import { SwitchProfilePage } from './switch-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwitchProfilePageRoutingModule
  ],
  declarations: [SwitchProfilePage]
})
export class SwitchProfilePageModule {}
