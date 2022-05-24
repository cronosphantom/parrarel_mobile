/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from '@capacitor/storage';
import { AuthService } from "src/app/app/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  login(form) {
    this.authService.userLogin(form.value).subscribe(res => {
      const loginInfo = JSON.stringify(res['data']['userLogin']['user']);

      Storage.set({ key: 'currentUser', value: loginInfo }).then(() => {
        this.authService.isLoggedIn = true;
        this.authService.currentUser = res["data"]["userLogin"]['user'];
        this.router.navigate(['switch-profile']);
      })

    });
  }

  signup() {
    this.router.navigate(['register']);
  }
}
