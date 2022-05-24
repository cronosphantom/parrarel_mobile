import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from "@ionic/angular";
import { AuthService } from 'src/app/app/services/auth.service';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.page.html',
  styleUrls: ['./add-profile.page.scss'],
})
export class AddProfilePage implements OnInit {
  formData = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toast: ToastController
  ) {
    this.initFormData();
  }

  initFormData() {
    this.formData.setValue({
      name: '',
      description: ''
    });
  }

  ngOnInit() {

  }

  submit(value = {}) {
    const submitData = {
      ...(value ?? {}),
      userId: this.authService.currentUser['id']
    };

    const handleFinish = async (res: any = {}) => {
      this.initFormData();
      const toastr = await this.toast.create({
        message: "Saved successfully.",
        color: "success",
        position: 'top',
        duration: 4000,
      })
      toastr.present();
    };

    console.log('submti: ', submitData)

    this.authService.createProfile(submitData).subscribe(handleFinish);
  }

}
