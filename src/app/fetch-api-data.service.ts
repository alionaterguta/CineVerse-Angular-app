import { Injectable } from '@angular/core';
// import { catchError } from 'rxjs/internal/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://cine-verse-b8832aa84c3e.herokuapp.com/';

type userDetails = {
  UserName: string;
  Email: string;
  Password: string;
  Birthdate: Date;
};

// Service to handle errors and extract response data
export class ErrorAndResponseService {
  constructor(protected http: HttpClient) {}

  // Method to handle HTTP errors
  protected handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('An error occurred:', error.error.message);
    } else {
      // Server-side error
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    // Return an observable with an error message
    const err = new Error('Something went wrong; please try again later.');
    throwError(() => err);
  }
  protected extractResponseData(res: any): any {
    return res || {}; // Return the response body or an empty object
  }
}

@Injectable({
  providedIn: 'root',
})

// USER REGISTRATION
export class UserRegistrationService extends ErrorAndResponseService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(http: HttpClient) {
    super(http); // Call the constructor of the ErrorAndResponseService class
  }
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: userDetails): Observable<any> {
    console.log(userDetails);

    // Make a POST request to the user registration endpoint
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError), map(this.extractResponseData));
  }
}

// USER LOGIN
export class UserLoginService extends ErrorAndResponseService {
  constructor(http: HttpClient) {
    super(http);
  }
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);

    const token = localStorage.getItem('token');

    return this.http
      .post(apiUrl + 'login', userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

// GET ALL MOVIES
export class AllMoviesService extends ErrorAndResponseService {
  constructor(http: HttpClient) {
    super(http);
  }
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

// GET ONE MOVIE BY TITLE
export class OneMovieService extends ErrorAndResponseService {
  constructor(http: HttpClient) {
    super(http);
  }
  public getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + 'movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}
// GET MOVIES BY GENRE
export class MoviesByGenreService extends ErrorAndResponseService {
  constructor(http: HttpClient) {
    super(http);
  }
  public getMoviesByGenre(genre: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + '/movies/genre/' + genre, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

// GET MOVIES BY DIRECTORS NAME
export class MoviesByDirectorService extends ErrorAndResponseService {
  constructor(http: HttpClient) {
    super(http);
  }
  public getMoviesByDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + '/movies/director/' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

// GET DIRECTORS
export class DirectorService extends ErrorAndResponseService {
  constructor(http: HttpClient) {
    super(http);
  }
  public getDirectors(): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + '/movies/directors', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

// ADD == POST MOVIE TO FAVORITE LIST
export class AddFavoriteMovieService extends ErrorAndResponseService {
  constructor(http: HttpClient) {
    super(http);
  }

  public addFavoriteMovie(username: string, title: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .post(apiUrl + '/users/' + username + '/movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

// DELETE MOVIE FROM FAVORITE LIST
export class RemoveFavoriteMovieService extends ErrorAndResponseService {
  constructor(http: HttpClient) {
    super(http);
  }

  public removeMovieFromFavorites(
    username: string,
    title: string
  ): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .delete(apiUrl + '/users/' + username + '/movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}
// DELETE USER
export class DeleteUserService extends ErrorAndResponseService {
  constructor(http: HttpClient) {
    super(http);
  }

  public deleteUser(id: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .delete(apiUrl + '/users/' + id, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

// UPDATE USER BY USERNAME
export class UpdateInfoUserService extends ErrorAndResponseService {
  constructor(http: HttpClient) {
    super(http);
  }
  public updateInfoUser(username: string, userData: any): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .put(apiUrl + '/users/' + username, userData, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

// GET USER LIST
export class UserListService extends ErrorAndResponseService {
  constructor(http: HttpClient) {
    super(http);
  }
  public getUserList(): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + '/users', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}
