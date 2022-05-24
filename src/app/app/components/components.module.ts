import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardIconsComponent } from './home/dashboard-icons/dashboard-icons.component';
import { HomeButtonComponent } from './general/home-button/home-button.component';
import { DateListDisplayComponent } from './date-list-display/date-list-display.component';
import { IonicModule } from '@ionic/angular';

const items = [
    DashboardIconsComponent,
    HomeButtonComponent,
    DateListDisplayComponent
];
@NgModule({
  imports: [
   IonicModule,
   CommonModule,
   RouterModule,
   FormsModule,
  ],
  declarations: [
     ...items
  ],
  exports:[
     ...items
  ]
})

export class ComponentsModule {}
