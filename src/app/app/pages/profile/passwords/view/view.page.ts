import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordsService } from "src/app/app/services/profile/passwords.service";
import { AuthService } from "src/app/app/services/auth.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  passwordId = '';
  password: any = {};
  formData = new FormGroup({
    name: new FormControl('', [Validators.required]),
    accessLevel: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required]),
    username: new FormControl('', []),
    password: new FormControl('', []),
    description: new FormControl('', [])
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private passwordsService: PasswordsService,
    private authService: AuthService
  ) {
    this.passwordId = this.route.snapshot.params?.passwordId ?? '';
  }

  ngOnInit() {
    if (this.passwordId) {
      this.getPassword(this.passwordId);
    } else {
      this.initFormData();
    }
  }

  setFormData(value) {
    this.formData.setValue({
      name: value.name,
      accessLevel: value.accessLevel,
      url: value.url,
      username: value.username,
      password: value.password,
      description: value.description
    });
  }

  initFormData() {
    this.formData.setValue({
      name: '',
      accessLevel: '',
      url: '',
      username: '',
      password: '',
      description: ''
    });
  }

  getPassword(id) {
    this.passwordsService.getPassword(id).subscribe(
      async (res: any) => {
        this.password = res['data']['password'];
        this.setFormData(this.password);
      });
  }

  submit(value = {}) {
    const submitData = {
      ...(value ?? {}),
      profileUserId: this.authService.currentProfileUser['profile']['id']
    };
    const handleFinish = (res: any = {}) => {
      this.router.navigate(['/profile/passwords/list']);
    };

    if (this.passwordId) {
      this.passwordsService
        .updatePassword(submitData, this.passwordId)
        .subscribe(handleFinish);
    }

    else {
      this.passwordsService.createPassword(submitData).subscribe(handleFinish);
    }
  }
}
