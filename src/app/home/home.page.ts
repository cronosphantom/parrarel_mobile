import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AuthService } from "src/app/app/services/auth.service";
import { CalendarService } from "src/app/app/services/profile/calendar.service";
import { ProfileMenuComponent } from '../app/components/profile-menu/profile-menu.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  upcoming_calendars: any = [];
  name: any = '';
  constructor(
    public popoverController: PopoverController,
    private authService: AuthService,
    private calendarsService: CalendarService,
  ) {
    this.name = this.authService.currentProfileUser['profile']['name'];
    this.calendarsService.getCalendars(this.authService.currentProfileUser['profile']['id']).subscribe(
      async (res: any) => {
        this.upcoming_calendars = res.data['calendarItems'].filter(calendar => new Date(calendar.onDate) > new Date());
      }
    );
  }

  async presentProfileMenu(ev: any) {
    const popover = await this.popoverController.create({
      component: ProfileMenuComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
