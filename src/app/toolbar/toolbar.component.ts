import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements OnInit {
  ngOnInit(): void {}

  constructor(private router: Router) {}
  navigateToMovies(): void {
    this.router.navigate(['/movies']);
  }
  navigateToWelcome(): void {
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }
  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }
  isOnProfileRoute(): boolean {
    return this.router.url === '/profile';
  }
  isOnMoviesRoute(): boolean {
    return this.router.url === '/movies';
  }
}
