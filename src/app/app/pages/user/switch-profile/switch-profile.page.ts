import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/app/services/auth.service';

@Component({
  selector: 'app-switch-profile',
  templateUrl: './switch-profile.page.html',
  styleUrls: ['./switch-profile.page.scss'],
})
export class SwitchProfilePage implements OnInit {
  userProfileAccess: any[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getUserProfileAccess();
  }

  getUserProfileAccess() {
    this.authService.getProfileUser(this.authService.currentUser['id']).subscribe(
      async (res: any) => {
        this.userProfileAccess = res['data']['userProfileAccess'];
      }
    );
  }

  setCurrentUser(id: any) {
    this.authService.profileUser(id).subscribe(
      async (res: any) => {
        this.authService.currentProfileUser = res['data']['profileUser'];
        this.router.navigate(['home']);
      }
    );
  }

}

