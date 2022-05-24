import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  tabActive="incoming"
  constructor() { }

  ngOnInit() {
  }
  segmentChanged(e){
    console.log(e)
    this.tabActive= e['detail']['value']
  }

}
