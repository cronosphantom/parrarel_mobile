import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SwitchProfilePage } from './switch-profile.page';

const routes: Routes = [
  {
    path: '',
    component: SwitchProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SwitchProfilePageRoutingModule {}
