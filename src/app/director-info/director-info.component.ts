import { Component, OnInit, Inject } from '@angular/core';
import { DirectorService } from '../fetch-api-data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-info',
  templateUrl: './director-info.component.html',
  styleUrl: './director-info.component.scss',
})
export class DirectorInfoComponent implements OnInit {
  director: any;
  movie: any;

  constructor(
    public dialogRef: MatDialogRef<DirectorInfoComponent>,
    public fetchDirector: DirectorService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.movie = data.movie;
  }

  ngOnInit(): void {
    // Call method to fetch director details using directorName
    this.getDirectorDetails(this.data.directorName);
  }

  getDirectorDetails(directorName: string): void {
    this.fetchDirector.getDirector(directorName).subscribe((resp: any) => {
      this.director = resp;
      console.log('Director Details:', this.director);
      return this.director;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
