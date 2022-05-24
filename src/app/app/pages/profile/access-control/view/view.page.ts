import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessControlService } from "src/app/app/services/profile/access-control.service";
import { AuthService } from "src/app/app/services/auth.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  access: FormGroup;
  accessId: string = '';
  profileUser: any = {};
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private accessService: AccessControlService,
    private authService: AuthService
  ) {
    this.access = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', []),
      role: new FormControl('', []),
      email: new FormControl('', []),
    });
    this.accessId = this.route.snapshot.params?.accessId ?? '';
  }

  ngOnInit() {
    if (this.accessId) {
      this.getProfileUser(this.accessId);
    } else {
      this.initFormData();
    }
  }

  getProfileUser(id) {
    this.accessService.getProfileUser(id).subscribe(
      async (res: any) => {
        console.log(res['data']['profileUser'])
        this.profileUser = res['data']['profileUser'];
        this.setFormData(this.profileUser);
      }
    );
  }

  setFormData(value) {
    console.log(value)
    this.access.setValue({
      name: value.user.firstName + " " + value.user.lastName,
      phone: "123456789",
      role: value.role,
      email: value.user.email
    });
  }

  initFormData() {
    this.access.setValue({
      name: '',
      phone: '',
      role: '',
      email: ''
    });
  }

  save(value = {}) {
    const submitData = {
      ...(value ?? {}),
      profileId: this.authService.currentProfileUser['profile']['id']
    };
    console.log('sub: ', submitData)
    const handleFinish = (res: any = {}) => {
      this.router.navigate(['/profile/access-control/list']);
    };

    if (this.accessId) {
      this.accessService
        .updateProfileUser(submitData, this.accessId)
        .subscribe(handleFinish);
    }

    else {
      this.accessService.createProfileUser(submitData).subscribe(handleFinish);
    }
  }

}
