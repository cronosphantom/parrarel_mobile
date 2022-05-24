import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/app/services/auth.service";
import { ToastController } from "@ionic/angular";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { PasswordValidation } from "./password-validation";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  checkAgree = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastController
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: new FormControl("", [Validators.required]),
        lastName: new FormControl("", [Validators.required]),
        email: new FormControl("", [
          Validators.required,
        ]),
        password: new FormControl("", [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirm_password: new FormControl(""),
      },
      {
        validator: PasswordValidation.MatchPassword,
      }
    );
  }

  register(formData) {
    const body = {
      ...formData,
    };
    delete body.confirm_password;
    this.authService.createUser(body).subscribe(async (res: any) => {
      const toast = await this.toastr.create({
        message: "Registered successfully.",
        color: "success",
        position: 'top',
        duration: 4000,
      })
      toast.present();
      this.router.navigate(['/login']);
    });
  }

  login() {
    this.router.navigate(['/login']);
  }
}
