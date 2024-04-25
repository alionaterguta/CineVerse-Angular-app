import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UpdateInfoUserService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-user-form',
  templateUrl: './update-user-form.component.html',
  styleUrl: './update-user-form.component.scss',
})
export class UpdateUserFormComponent implements OnInit {
  UserName = '';
  @Input() userData = {
    UserName: '',
    Password: '',
    Email: '',
    Birthdate: Date,
  };
  constructor(
    public fetchApiData: UpdateInfoUserService,
    public dialogRef: MatDialogRef<UpdateUserFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  updateUser(): void {
    this.fetchApiData.updateInfoUser(this.UserName, this.userData).subscribe(
      (result) => {
        console.log(result);
        this.dialogRef.close();
        this.snackBar.open('Update successful', 'OK', {
          duration: 2000,
        });
      },
      (result) => {
        this.snackBar.open(
          'Update not successful, please try again',
          'NOT OK',
          {
            duration: 2000,
          }
        );
      }
    );
  }
}
