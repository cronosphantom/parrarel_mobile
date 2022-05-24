import { Component, OnInit } from '@angular/core';
import { CalendarService } from 'src/app/app/services/profile/calendar.service';
import { AuthService } from 'src/app/app/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  calendars: any = [];
  pastCalendars: any = [];
  upcomingCalendars: any = [];
  tabActive = 'upcoming';
  constructor(
    private calendarsService: CalendarService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getCalendars();
  }
  getCalendars() {
    this.calendarsService.getCalendars(this.authService.currentProfileUser['profile']['id']).subscribe(
      async (res: any) => {
        this.calendars = res.data['calendarItems'];
        this.pastCalendars = this.calendars.filter(calendar => new Date(calendar.onDate) < new Date());
        this.upcomingCalendars = this.calendars.filter(calendar => new Date(calendar.onDate) > new Date());
      }
    );
  }
  segmentChanged(e) {
    this.tabActive = e['detail']['value'];
  }
  getDate(datetime) {
    return new Date(datetime).getDate();
  }
  getMonth(datetime) {
    const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthArr[new Date(datetime).getMonth()];
  }
  getHours(datetime) {
    let time = new Date(datetime).getHours();
    time = time > 12 ? time - 12 : time;
    return time;
  }
  getMinutes(datetime) {
    return new Date(datetime).getMinutes();
  }
  getAP(datetime) {
    const time = new Date(datetime).getHours();
    const ap = time > 12 ? 'PM' : 'AM';
    return ap;
  }
}
