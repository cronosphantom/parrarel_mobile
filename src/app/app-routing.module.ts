import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./app/pages/auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./app/pages/auth/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'my-account',
    loadChildren: () => import('./app/pages/user/my-account/my-account.module').then(m => m.MyAccountPageModule)
  },
  {
    path: 'switch-profile',
    loadChildren: () => import('./app/pages/user/switch-profile/switch-profile.module').then(m => m.SwitchProfilePageModule)
  },
  {
    path: 'profile/children/list',
    loadChildren: () => import('./app/pages/profile/children/list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'profile/children/view',
    loadChildren: () => import('./app/pages/profile/children/view/view.module').then(m => m.ViewPageModule)
  },
  {
    path: 'profile/children/view/:childId',
    loadChildren: () => import('./app/pages/profile/children/view/view.module').then(m => m.ViewPageModule)
  },
  {
    path: 'profile/address-book/list',
    loadChildren: () => import('./app/pages/profile/address-book/list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'profile/address-book/view',
    loadChildren: () => import('./app/pages/profile/address-book/view/view.module').then(m => m.ViewPageModule)
  },
  {
    path: 'profile/address-book/view/:addressBookEntryId',
    loadChildren: () => import('./app/pages/profile/address-book/view/view.module').then(m => m.ViewPageModule)
  },
  {
    path: 'profile/notes/list',
    loadChildren: () => import('./app/pages/profile/notes/list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'profile/notes/view',
    loadChildren: () => import('./app/pages/profile/notes/view/view.module').then(m => m.ViewPageModule)
  },
  {
    path: 'profile/notes/view/:noteId',
    loadChildren: () => import('./app/pages/profile/notes/view/view.module').then(m => m.ViewPageModule)
  },
  {
    path: 'profile/passwords/list',
    loadChildren: () => import('./app/pages/profile/passwords/list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'profile/passwords/view',
    loadChildren: () => import('./app/pages/profile/passwords/view/view.module').then(m => m.ViewPageModule)
  },
  {
    path: 'profile/passwords/view/:passwordId',
    loadChildren: () => import('./app/pages/profile/passwords/view/view.module').then(m => m.ViewPageModule)
  },
  {
    path: 'profile/gifts/list',
    loadChildren: () => import('./app/pages/profile/gifts/list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'profile/gifts/view',
    loadChildren: () => import('./app/pages/profile/gifts/view/view.module').then(m => m.ViewPageModule)
  },
  {
    path: 'profile/gifts/view/:giftId',
    loadChildren: () => import('./app/pages/profile/gifts/view/view.module').then(m => m.ViewPageModule)
  },
  {
    path: 'profile/calendar/view',
    loadChildren: () => import('./app/pages/profile/calendar/view/view.module').then(m => m.ViewPageModule)
  },
  {
    path: 'profile/calendar/view/:calendarId',
    loadChildren: () => import('./app/pages/profile/calendar/view/view.module').then(m => m.ViewPageModule)
  },
  {
    path: 'profile/calendar/list',
    loadChildren: () => import('./app/pages/profile/calendar/list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'profile/expenses/list',
    loadChildren: () => import('./app/pages/profile/expenses/list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'profile/access-control/list',
    loadChildren: () => import('./app/pages/profile/access-control/list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'profile/access-control/view',
    loadChildren: () => import('./app/pages/profile/access-control/view/view.module').then(m => m.ViewPageModule)
  },
  {
    path: 'profile/access-control/view/:accessId',
    loadChildren: () => import('./app/pages/profile/access-control/view/view.module').then(m => m.ViewPageModule)
  },
  {
    path: 'profile/inbox/list',
    loadChildren: () => import('./app/pages/profile/inbox/list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'profile/inbox/view',
    loadChildren: () => import('./app/pages/profile/inbox/view/view.module').then(m => m.ViewPageModule)
  },
  {
    path: 'profile/discussions/list',
    loadChildren: () => import('./app/pages/profile/discussions/list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'profile/discussions/view',
    loadChildren: () => import('./app/pages/profile/discussions/view/view.module').then(m => m.ViewPageModule)
  },
  {
    path: 'profile/expenses/view',
    loadChildren: () => import('./app/pages/profile/expenses/view/view.module').then(m => m.ViewPageModule)
  },
  {
    path: 'profile/expenses/view/:expenseId',
    loadChildren: () => import('./app/pages/profile/expenses/view/view.module').then(m => m.ViewPageModule)
  },
  {
    path: 'profile/discussions/chat',
    loadChildren: () => import('./app/pages/profile/discussions/chat/chat.module').then(m => m.ChatPageModule)
  },
  {
    path: 'connect-profile',
    loadChildren: () => import('./app/pages/user/connect-profile/connect-profile.module').then(m => m.ConnectProfilePageModule)
  },
  {
    path: 'add-profile',
    loadChildren: () => import('./app/pages/user/add-profile/add-profile.module').then(m => m.AddProfilePageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
