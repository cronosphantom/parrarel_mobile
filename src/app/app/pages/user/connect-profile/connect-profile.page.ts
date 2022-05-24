import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/app/services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-connect-profile',
  templateUrl: './connect-profile.page.html',
  styleUrls: ['./connect-profile.page.scss'],
})
export class ConnectProfilePage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    public toaster: ToastController
  ) { }

  ngOnInit() {
  }

  async invite(form) {
    this.authService.connectProfile(form.value.invitecode, this.authService.currentUser.id).subscribe(res => {
      const connectInfo = res['data']['connectProfileUser'];
      if (connectInfo === 'NOT FOUND') {
        this.toast('Invalid Invite Code. Try Again','danger');
      } else {
        this.toast('Profile Connected','success');
        this.router.navigate(['home']);
      }
    });
  }

  async toast(message,color) {
    const toast = await this.toaster.create({
      color,
      message,
      duration: 4000,
    });
    toast.present();
  }
}
