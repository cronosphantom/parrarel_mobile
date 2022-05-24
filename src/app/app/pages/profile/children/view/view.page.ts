/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/app/services/auth.service';
import { ChildrenService } from 'src/app/app/services/profile/children.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  isParent: boolean = false;
  childId: string = '';
  data: any = {};
  formData = new FormGroup({
    name: new FormControl('', [Validators.required]),
    dob: new FormControl(),
    email: new FormControl('', [Validators.email]),
    school: new FormControl(),
    description: new FormControl(),
    teacher: new FormControl(),
    photo: new FormControl(),
  });

  constructor(
    private childrenService: ChildrenService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.childId = this.route.snapshot.params?.childId ?? '';
  }

  ngOnInit() {
    this.isParent =
      this.authService.currentProfileUser['role'] === 'parent' ? true : false;

    // edit
    if (this.childId) {
      this.getChildDetail(this.childId);
    } else {
      this.initFormData();
    }
  }

  getChildDetail(id: string = '') {
    this.childrenService.child(id).subscribe((res: any = {}) => {
      console.log(res);
      this.data = res?.data?.child ?? {};

      this.initFormData(this.data);
    });
  }

  initFormData(value: any = {}) {
    this.formData.setValue({
      name: value?.name ?? '',
      dob: value?.dob ?? '',
      email: value?.email ?? '',
      school: value?.school ?? '',
      teacher: value?.teacher ?? '',
      description: value?.description ?? '',
      photo: '',
    });
  }

  submit(value = {}) {
    const submitData = {
      // ...(this.data ?? {}),
      ...(value ?? {}),
      title: '',
      favorites: '',
      clothingSizes: '',
      user: this.authService.currentProfileUser['profile']['id'],
    };

    const handleFinish = (res: any = {}) => {
      this.router.navigate(['/profile/children/list']);
    };

    // edit
    if (this.childId) {
      this.childrenService
        .updateChild(this.childId, submitData)
        .subscribe(handleFinish);
    }
    // new
    else {
      this.childrenService.createChild(submitData).subscribe(handleFinish);
    }
  }
}
