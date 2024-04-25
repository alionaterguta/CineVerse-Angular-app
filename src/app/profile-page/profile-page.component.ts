import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserFormComponent } from '../update-user-form/update-user-form.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
  openUserUpdateDialog(): void {
    this.dialog.open(UpdateUserFormComponent, {
      width: '280px',
    });
  }
}
