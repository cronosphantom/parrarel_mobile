import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ChildrenService } from "src/app/app/services/profile/children.service";
import { CalendarService } from "src/app/app/services/profile/calendar.service";
import { AuthService } from "src/app/app/services/auth.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  calendarId: any = '';
  children: any = [];
  calendar: any = {};
  formData = new FormGroup({
    description: new FormControl('', []),
    onDate: new FormControl(new Date(), []),
    isRecurring: new FormControl(false, []),
    location: new FormControl('', []),
    rideInformation: new FormControl('', []),
  });
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private childrenService: ChildrenService,
    private calendarService: CalendarService,
    private authService: AuthService
  ) {
    this.calendarId = this.route.snapshot.params?.calendarId ?? '';
  }

  ngOnInit() {
    this.getChildren();
    if (this.calendarId) {
      this.getCalendar(this.calendarId);
    } else {
      this.initFormData();
    }
  }

  getChildren() {
    this.childrenService.children(this.authService.currentProfileUser['profile']['id']).subscribe(
      async (res: any) => {
        console.log(res)
        this.children = res['data']['children'];
      }
    );
  }

  getCalendar(id) {
    this.calendarService.getCalendar(id).subscribe(
      async (res: any) => {
        this.calendar = res['data']['calendarItem'];
        this.setFormData(this.calendar);
      }
    );
  }

  setFormData(value) {
    console.log(value)
    this.formData.setValue({
      description: value.description,
      onDate: value.onDate,
      isRecurring: value.isRecurring,
      location: value.location,
      rideInformation: value.rideInformation
    });
  }

  initFormData() {
    this.formData.setValue({
      description: '',
      onDate: new Date().toISOString(),
      isRecurring: true,
      location: '',
      rideInformation: '',
    });
  }

  submit(value = {}) {
    const submitData = {
      ...(value ?? {}),
      name: this.authService.currentUser.firstName,
      attachment: "String",
      isPinned: true,
      accessLevel: "parent",
      status: "Active"
    };
    const handleFinish = (res: any = {}) => {
      this.router.navigate(['/profile/calendar/list']);
    };

    if (this.calendarId) {
      this.calendarService
        .updateCalendar(submitData, this.calendarId)
        .subscribe(handleFinish);
    }

    else {
      this.calendarService.createCalendar(submitData, this.authService.currentProfileUser['profile']['id'], this.authService.currentUser.id, []).subscribe(handleFinish);
    }
  }

}
