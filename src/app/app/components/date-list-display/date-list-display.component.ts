import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-list-display',
  templateUrl: './date-list-display.component.html',
  styleUrls: ['./date-list-display.component.scss'],
})
export class DateListDisplayComponent implements OnInit {
 @Input() displayDate: any;
 displayDay: number;
 displayMonthYear: string;
 displayTime: string;
  constructor() {}

  ngOnInit() {
    const dDate = new Date(this.displayDate);
    const month = dDate.toLocaleString('default', { month: 'short' });
    const hour = dDate.toLocaleString('default', { hour: '2-digit', minute: '2-digit' });
    const min = dDate.toLocaleString('default', { minute: '2-digit' });
    const h =  13 > 12 ? 'AM' : 'PM';
    this.displayDay =dDate.getDate();
    this.displayMonthYear =`${month} ${dDate.getFullYear()}`;
    this.displayTime = `${hour}`;
  }

}
