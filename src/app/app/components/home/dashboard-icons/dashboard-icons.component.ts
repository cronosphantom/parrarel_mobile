import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-icons',
  templateUrl: './dashboard-icons.component.html',
  styleUrls: ['./dashboard-icons.component.scss'],
})
export class DashboardIconsComponent implements OnInit {
  items = [
    {
      icon: "fa-child",
      title: "Children",
      uri: "/profile/children/list"
    },
    {
      icon: "fa-address-book",
      title: "Address Book",
      uri: "/profile/address-book/list"
    },
    {
      icon: "fa-sticky-note",
      title: "Notes",
      uri: "/profile/notes/list"
    },
    {
      icon: "fa-comments-alt",
      title: "Discussions",
      uri: "/profile/discusions/list"
    },
    {
      icon: "fa-shield-check",
      title: "Access Control",
      uri: "/profile/access-control/list"
    },
    {
      icon: "fa-key",
      title: "Passwords",
      uri: "/profile/passwords/list"
    },
    {
      icon: "fa-inbox",
      title: "Inbox",
      uri: "/profile/inbox/list"
    },
    {
      icon: "fa-calendar",
      title: "Calendar",
      uri: "/profile/calendar/list"
    },
    {
      icon: "fa-dollar-sign",
      title: "Expenses",
      uri: "/profile/expenses/list"
    }
  ]
  constructor() { }

  ngOnInit() { }

}
