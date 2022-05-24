import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/app/services/auth.service';
import { AddressBookService } from 'src/app/app/services/profile/address-book.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  addressBookEntryId=""
  data:any={}
  formData = new FormGroup({
    title: new FormControl(),
    name: new FormControl('', [Validators.required]),
    mobile: new FormControl(),
    email: new FormControl('', [Validators.email]),
    photo: new FormControl(),
    description: new FormControl()
  });
  constructor(
    private addressBookSrv: AddressBookService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.addressBookEntryId = this.route.snapshot.params?.addressBookEntryId ?? '';
    console.log(this.addressBookEntryId)
  }

  ngOnInit(

  ) {
    if (this.addressBookEntryId) {
      this.getAddressBookEntry();
    } else {
      this.initFormData();
    }
    
  }
  getAddressBookEntry(){
    this.addressBookSrv.addressBookEntry(this.addressBookEntryId).subscribe((res: any = {})=>{
      this.data = res?.data?.addressBookEntry ?? {};
      console.log(this.data)
      this.initFormData(this.data);
    })
  }
  initFormData(value: any = {}) {
    this.formData.setValue({
      title: value?.title ?? '',
      name: value?.name ?? '',
      mobile: value?.mobile ?? '',
      email: value?.email ?? '',
      photo: value?.photo ?? '',
      description: value?.description ?? '',
    });
  }

  submit(value = {}) {
    const submitData = {
      // ...(this.data ?? {}),
      ...(value ?? {}),
      profile: this.authService.currentProfileUser['profile']['id'],
    };
    console.log(submitData)
    const handleFinish = (res: any = {}) => {
      this.router.navigate(['profile/address-book/list']);
    };

    // edit
    if (this.addressBookEntryId) {
      this.addressBookSrv
        .updateAddressBook(this.addressBookEntryId, submitData)
        .subscribe(handleFinish);
    }
    // new
    else {
      this.addressBookSrv.createAddressBookEntry(submitData).subscribe(handleFinish);
    }
  }
}
