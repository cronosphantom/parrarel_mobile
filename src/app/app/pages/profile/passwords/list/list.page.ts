import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordsService } from "src/app/app/services/profile/passwords.service";
import { AuthService } from "src/app/app/services/auth.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  passwords: any[] = [];
  constructor(
    private router: Router,
    private passwordsService: PasswordsService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    console.log(this.authService.currentUser);
    this.getPasswords();
  }
  getPasswords() {
    console.log(this.authService.currentProfileUser);
    this.passwordsService.getPasswords(this.authService.currentProfileUser['profile']['id']).subscribe(
      async (res: any) => {
        console.log(res)
        this.passwords = res.data['passwords'];
      }
    );
  }
  goHome() {
    this.router.navigate(['/home']);
  }
}
