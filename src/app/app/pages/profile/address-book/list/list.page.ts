import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/app/services/auth.service';
import { AddressBookService } from 'src/app/app/services/profile/address-book.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  addressbook:any[] =[]
  constructor(
    public addressBookSrv:AddressBookService,
    public authSrv:AuthService
  ) { }

  ngOnInit() {
    this.getAddressBook()
  }
  getAddressBook(){
    console.log(this.authSrv.currentProfileUser['profile']['id'])
    let profileId = this.authSrv.currentProfileUser['profile']['id']
    this.addressBookSrv.addressBook(profileId).subscribe(res=>{
      this.addressbook = res["data"]['addressBook']
    })
  }

}
