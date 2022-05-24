import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService } from "src/app/app/services/profile/notes.service";
import { AuthService } from "src/app/app/services/auth.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  notes: any[] = [];
  constructor(
    private router: Router,
    private notesService: NotesService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    console.log(this.authService.currentUser);
    this.getNotes();
  }
  getNotes() {
    console.log(this.authService.currentProfileUser);
    this.notesService.getNotes(this.authService.currentProfileUser['profile']['id']).subscribe(
      async (res: any) => {
        console.log(res)
        this.notes = res.data['notes'];
      }
    );
  }
  goHome() {
    this.router.navigate(['/home']);
  }
}
