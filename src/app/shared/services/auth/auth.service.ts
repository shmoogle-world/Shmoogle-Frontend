import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { GlobalsService } from '../../../Services/globals.service';
import { environment } from 'src/environments/environment';

export interface AuthResponseData {
  email: string;
  displayName: string;
  jwt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  private logoutRedirectRoute = '/';

  constructor(private http: HttpClient, private router: Router, private globals: GlobalsService) { }

  signup(data: { displayName: string, email: string, password: string }) {
    return this.http
      .post<AuthResponseData>(
        environment.apiEndpoint + "signup",
        data
      )
      .pipe(
        catchError(this.handleError),
        tap(this.handleLogin.bind(this))
      );
  }

  login(data: { email: string, password: string }) {
    return this.http
      .post<AuthResponseData>(
        environment.apiEndpoint + 'login',
        data
      )
      .pipe(
        catchError(this.handleError),
        tap(this.handleLogin.bind(this))
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate([this.logoutRedirectRoute]);
    this.clearStorage();
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  private handleLogin(res: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + 86400 * 1000);
    const user = new User(res.email, res.displayName, res.jwt, expirationDate);
    this.user.next(user);
    this.autoLogout(86400 * 1000);
    localStorage.setItem('auth-user', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (!errorRes.error) {
      return throwError(errorMessage);
    }

    switch (errorRes.error) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
      default:
        errorMessage = 'An unknown error occurred!';
    }
    return throwError(errorMessage);
  }

  private clearStorage() {
    localStorage.removeItem('auth-user');
  }

  autoLogin() {
    const userData: {
      email: string;
      displayName: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('auth-user'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.displayName,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
