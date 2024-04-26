import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AllMoviesService,
  AddFavoriteMovieService,
  UserListService,
  RemoveFavoriteMovieService,
} from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  users: any[] = [];
  favorites: any[] = [];

  showLeftArrow: boolean = false;
  showRightArrow: boolean = true;

  scroll(direction: number): void {
    const container = document.querySelector('.movie-grid');
    if (container) {
      const scrollAmount = direction * 300; // Adjust scroll amount as needed
      container.scrollLeft += scrollAmount;

      this.updateArrowVisibility(container);
    }
  }
  updateArrowVisibility(container: any): void {
    // Show/hide left arrow
    this.showLeftArrow = container.scrollLeft > 0;

    // Show/hide right arrow
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    this.showRightArrow = container.scrollLeft < maxScrollLeft;
  }
  constructor(
    private router: Router,
    public fetchMovies: AllMoviesService,
    public addFavorite: AddFavoriteMovieService,
    public removeFavorite: RemoveFavoriteMovieService,
    public fetchUsers: UserListService,
    public snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUsers();
  }
  isOnMoviesRoute(): boolean {
    return this.router.url === '/movies';
  }
  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }
  navigateToWelcome(): void {
    this.router.navigate(['/welcome']);
  }

  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  openSynopsisDialog(movie: any): void {
    this.dialog.open(SynopsisComponent, {
      data: { movie }, // Pass the movie object to the dialog
      width: '600px',
    });
  }

  openDirectorDialog(movie: any): void {
    this.dialog.open(DirectorInfoComponent, {
      data: { directorName: movie.Director },
      width: '600px',
    });
  }

  getUsers(): void {
    const { UserName } = JSON.parse(
      localStorage.getItem('currentUser') || '{}'
    );
    this.fetchUsers.getUserList().subscribe((resp: any) => {
      this.users = resp;
      const currentUser = this.users.filter(
        (user) => user.UserName === UserName
      );

      this.favorites = currentUser[0].FavoriteMovies;
    });
  }

  // filter through movies to check if a movie is in the favorite list
  isFavorite(movie: any): boolean {
    const favorite = this.favorites.filter((title) => title === movie.Title);
    return favorite.length ? true : false;
  }

  addTitleToFavorites(movie: any): void {
    this.addFavorite.addFavoriteMovie(movie.Title).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open('Movie added', 'Success', {
        duration: 2000,
      });
    });
  }

  removeTitleFromFavorites(movie: any): void {
    this.removeFavorite
      .removeMovieFromFavorites(movie.Title)
      .subscribe((resp: any) => {
        console.log(resp);
        this.snackBar.open('Movie removed', 'Success', {
          duration: 2000,
        });
      });
  }
}
