import { Component, Input, OnInit } from '@angular/core';
import { UpdateInfoUserService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component for updating user information.
 * Allows users to modify their username, password, email, and birthdate.
 */
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
  /**
   * Constructs the UpdateUserFormComponent.
   * @param fetchApiData Service for updating user information
   * @param snackBar Service for displaying snack bar notifications
   */
  constructor(
    public fetchApiData: UpdateInfoUserService,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit(): void {}

  /**
   * Updates the user information.
   * Calls the fetchApiData service to update the user data and displays a success or failure message accordingly.
   */
  updateUser(): void {
    this.fetchApiData.updateInfoUser(this.userData).subscribe(
      (resp: any) => {
        this.userData = resp;
        this.snackBar.open('Update', 'Success', {
          duration: 2000,
        });
      },
      () => {
        this.snackBar.open('Please try again', 'No success', {
          duration: 2000,
        });
      }
    );
  }
}
