import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/app/services/auth.service";
import { Router } from '@angular/router';
import { ToastController } from "@ionic/angular";
import * as bcrypt from 'bcryptjs';

import {
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit {
  userid: any = ''
  formData = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required])
  });
  changePasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required])
  })
  constructor(
    private authService: AuthService,
    private toastr: ToastController,
    private router: Router
  ) {
    this.userid = this.authService.currentUser['id'];
  }

  ngOnInit() {
    this.initFormData(this.authService.currentUser);
    this.changePasswordForm.setValue({
      password: '',
      newPassword: '',
      confirmPassword: ''
    });
  }

  initFormData(value: any = {}) {
    this.formData.setValue({
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email
    });
  }

  submit(formData = {}) {
    const currentUser = this.authService.currentUser;
    const body = {
      ...formData,
      password: this.authService.currentUser['password']
    };
    console.log('submit: ', body);
    this.authService.updateUser(body, this.userid).subscribe(async (res: any) => {
      this.authService.currentUser = {
        ...currentUser,
        ...formData
      };
      const toast = await this.toastr.create({
        message: "Updated successfully.",
        color: "success",
        position: 'top',
        duration: 4000,
      })
      toast.present();
    });
  }

  async changePassword(changePasswordForm = {}) {
    if (!bcrypt.compareSync(changePasswordForm['password'], this.authService.currentUser['password'])) {
      const toast = await this.toastr.create({
        message: "Password incorrect.",
        color: "danger",
        position: 'top',
        duration: 4000,
      })
      toast.present();
    } else {
      if (changePasswordForm['newPassword'] != changePasswordForm['confirmPassword']) {
        const toast = await this.toastr.create({
          message: "New password and confirm password must match.",
          color: "danger",
          position: 'top',
          duration: 4000,
        })
        toast.present();
      } else {
        const currentUser = this.authService.currentUser;
        delete currentUser.id;
        const body = {
          firstName: this.authService.currentUser['firstName'],
          lastName: this.authService.currentUser['lastName'],
          email: this.authService.currentUser['email'],
          password: bcrypt.hashSync(changePasswordForm['newPassword'], 10)
        }
        console.log('change: ', body);
        this.authService.updateUser(body, this.userid).subscribe(async (res: any) => {
          this.authService.currentUser = res['data']['updateUser'];
          const toast = await this.toastr.create({
            message: "Updated successfully.",
            color: "success",
            position: 'top',
            duration: 4000,
          })
          toast.present();
        });
      }
    }
  }
}
