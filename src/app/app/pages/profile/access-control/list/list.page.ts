import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccessControlService } from "src/app/app/services/profile/access-control.service";
import { AuthService } from "src/app/app/services/auth.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  accesscontrols: any[] = [];
  isParent = this.authService.currentProfileUser['role'] === 'parent' ? true : false;
  constructor(
    private router: Router,
    private accessService: AccessControlService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getprofileUsers();
  }
  getprofileUsers() {
    this.accessService.getProfileUsers(this.authService.currentProfileUser['profile']['id']).subscribe(
      async (res: any) => {
        this.accesscontrols = res.data['profileUsers'];
        console.log(this.accesscontrols)
      }
    );
  }
  getRoleText(str: any) {
    const roleData: any = {
      "parent": "CO-PARENT",
      "relative": "RELATIVE",
      "legal": "LEGAL"
    }
    return "ROLE: " + roleData[str];
  }
  goHome() {
    this.router.navigate(['/home']);
  }
}
