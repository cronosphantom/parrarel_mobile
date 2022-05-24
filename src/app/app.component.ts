import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './app/services/auth.service';
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      await this.authService.userData();
      if (this.authService.isLoggedIn === false) {
        this.router.navigate(['/login']);
      }
      else {
        const data = await Storage.get({ key: 'currentProfileUser' });
        console.log(data)
        if (data) {
          //  this.authService.currentProfileUser = data;
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/switch-profile']);
        }
      }

    });
  }
  logout() {
    console.log('login');
    Storage.remove({ key: 'currentUser' }).then(() => {
      console.log('remove');
      this.authService.isLoggedIn = false;
      this.authService.currentUser = {};
      this.router.navigate(['/login']);
    })
  }
}
