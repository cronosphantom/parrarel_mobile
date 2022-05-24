import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChildrenService } from "src/app/app/services/profile/children.service";
import { ExpensesService } from "src/app/app/services/profile/expenses.service";
import { ProfileUserService } from "src/app/app/services/profile/profileuser.service";
import { AuthService } from "src/app/app/services/auth.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  expenseId: any = '';
  children: any = [];
  profileUsers: any = [];
  expense: any = {};
  formData = new FormGroup({
    description: new FormControl('', []),
    onDate: new FormControl(new Date(), []),
    split1UserId: new FormControl('', [Validators.required]),
    split2UserId: new FormControl('', []),
    split1UserAmount: new FormControl('', []),
    split2UserAmount: new FormControl('', []),
  });
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private childrenService: ChildrenService,
    private expensesService: ExpensesService,
    private profileUsersService: ProfileUserService,
    private authService: AuthService
  ) {
    this.expenseId = this.route.snapshot.params?.expenseId ?? '';
  }

  ngOnInit() {
    this.getProfileUsers();
    this.getChildren();
    if (this.expenseId) {
      this.getExpense(this.expenseId);
    } else {
      this.initFormData();
    }
  }

  getProfileUsers() {
    this.profileUsersService.getProfileUsers(this.authService.currentProfileUser['profile']['id']).subscribe(
      async (res: any) => {
        this.profileUsers = res['data']['profileUsers'];
        this.profileUsers = this.profileUsers.filter(user => user.user != null);
        console.log("profileUsers: ", this.profileUsers);
      }
    );
  }

  getExpense(id) {
    this.expensesService.getExpense(id).subscribe(
      async (res: any) => {
        this.expense = res['data']['expenseItem'];
        this.setFormData(this.expense);
      }
    );
  }

  setFormData(value) {
    console.log(value)
    this.formData.setValue({
      description: value.description,
      onDate: value.onDate,
      split1UserId: value.split1User.id,
      split2UserId: value.split2User.id,
      split1UserAmount: value.split1UserAmount,
      split2UserAmount: value.split2UserAmount
    });
  }

  initFormData() {
    this.formData.setValue({
      description: '',
      onDate: new Date().toISOString(),
      split1UserId: '',
      split2UserId: '',
      split1UserAmount: 0,
      split2UserAmount: 0
    });
  }

  getChildren() {
    this.childrenService.children(this.authService.currentProfileUser['profile']['id']).subscribe(
      async (res: any) => {
        console.log(res)
        this.children = res['data']['children'];
      }
    );
  }

  submit(value = {}) {
    const submitData = {
      ...(value ?? {}),
      isRecurring: true,
      accessLevel: "parent",
      status: "Active"
    };
    console.log('submitData: ', submitData);
    const handleFinish = (res: any = {}) => {
      this.router.navigate(['/profile/expenses/list']);
    };

    if (this.expenseId) {
      this.expensesService
        .updateExpense(submitData, this.expenseId)
        .subscribe(handleFinish);
    }

    else {
      this.expensesService.createExpense(submitData, this.authService.currentProfileUser['profile']['id'], submitData['split1UserId'], submitData['split2UserId']).subscribe(handleFinish);
    }
  }

}
