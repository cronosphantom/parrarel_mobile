import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotesService } from "src/app/app/services/profile/notes.service";
import { ChildrenService } from "src/app/app/services/profile/children.service";
import { AuthService } from "src/app/app/services/auth.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  children: any[] = [];
  noteId: string = '';
  image: string = '';
  note: any = {};
  formData = new FormGroup({
    childId: new FormControl('', [Validators.required]),
    accessLevel: new FormControl('', [Validators.required]),
    attachment: new FormControl(''),
    description: new FormControl('', [])
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notesService: NotesService,
    private childrenService: ChildrenService,
    private authService: AuthService
  ) {
    this.noteId = this.route.snapshot.params?.noteId ?? '';
  }

  ngOnInit() {
    this.getChildren();
    if (this.noteId) {
      this.getNote(this.noteId);
    } else {
      this.initFormData();
    }
  }

  setFormData(value) {
    console.log(value)
    this.formData.setValue({
      childId: value.child.id,
      accessLevel: value.accessLevel,
      attachment: value.attachment,
      description: value.description
    });
  }

  initFormData() {
    this.formData.setValue({
      childId: '',
      accessLevel: '',
      attachment: '',
      description: ''
    });
  }

  getChildren() {
    this.childrenService.children(this.authService.currentProfileUser['profile']['id']).subscribe(
      async (res: any) => {
        console.log(res)
        this.children = res['data']['children'];
      }
    );
  }

  getNote(id) {
    this.notesService.getNote(id).subscribe(
      async (res: any) => {
        console.log(res['data']['note'])
        this.note = res['data']['note'];
        this.setFormData(this.note);
      });
  }

  submit(value = {}) {
    const submitData = {
      ...(value ?? {}),
      profileUserId: this.authService.currentProfileUser['profile']['id'],
      isPinned: "true",
    };
    const handleFinish = (res: any = {}) => {
      this.router.navigate(['/profile/notes/list']);
    };

    if (this.noteId) {
      this.notesService
        .updateNote(submitData, this.noteId)
        .subscribe(handleFinish);
    }

    else {
      this.notesService.createNote(submitData).subscribe(handleFinish);
    }
  }

  changeFile($event) {
    if ($event.target.files && $event.target.files.length) {
      this.image = $event.target.files[0].name;
    }
  }
}
