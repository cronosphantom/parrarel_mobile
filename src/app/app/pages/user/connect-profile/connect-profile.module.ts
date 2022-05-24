import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConnectProfilePageRoutingModule } from './connect-profile-routing.module';

import { ConnectProfilePage } from './connect-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConnectProfilePageRoutingModule
  ],
  declarations: [ConnectProfilePage]
})
export class ConnectProfilePageModule { }
