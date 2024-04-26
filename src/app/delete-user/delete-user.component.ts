import { Component } from '@angular/core';
import { DeleteUserService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss',
})
export class DeleteUserComponent {
  constructor(
    private delUser: DeleteUserService,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {}

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure you want to delete your account?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUserData(result); // If the user confirms, proceed with deletion
      }
    });
  }

  deleteUserData(id: string): void {
    this.delUser.deleteUser(id).subscribe((resp: any) => {
      this.delUser = resp;

      console.log(resp);
      this.router.navigate(['/welcome']);
    });
    this.snackBar.open('Account deleted', 'Success', {
      duration: 2000,
    });
  }
}
