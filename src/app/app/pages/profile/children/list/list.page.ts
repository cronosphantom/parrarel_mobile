/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/app/services/auth.service';
import { ChildrenService } from 'src/app/app/services/profile/children.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  public children: any = [];
  constructor(private childrenService: ChildrenService,
     private authService: AuthService) { }

  ngOnInit() {
    this.getChildren();
  }
  getChildren(){
    this.childrenService.children(this.authService.currentProfileUser['profile']['id']).subscribe( res=>{
      this.children = res.data['children'];
      console.log(res.data);
    });
  }

}
