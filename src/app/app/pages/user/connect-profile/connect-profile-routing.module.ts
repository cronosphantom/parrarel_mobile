import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnectProfilePage } from './connect-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ConnectProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectProfilePageRoutingModule {}
