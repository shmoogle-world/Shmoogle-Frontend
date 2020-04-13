import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

export interface AuthResponseData {
    email: string;
    token: string;
    refreshToken: string;
    expiresIn: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;
    private logoutRedirectRoute = '/';
    private apiEndpoint = '/auth/';

    constructor(private http: HttpClient, private router: Router) { }

    signup(data: { displayName: string, email: string, password: string, age: number, found: string }) {
        return this.http
            .post<AuthResponseData>(
                this.apiEndpoint + "register",
                data
            )
            .pipe(
                catchError(this.handleError),
                tap(this.loginTap)
            );
    }

    login(data: { email: string, password: string }) {
        return this.http
            .post<AuthResponseData>(
                this.apiEndpoint + 'login',
                data
            )
            .pipe(
                catchError(this.handleError),
                tap(this.loginTap)
            );
    }

    private loginTap(res: AuthResponseData) {
        this.handleLogin(
            res.email,
            res.token,
            res.refreshToken,
            +res.expiresIn
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

    private handleLogin(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
    ) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';

        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }

        switch (errorRes.error.error.message) {

            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct.';
                break;
        }
        return throwError(errorMessage);
    }

    private clearStorage() {
        localStorage.removeItem('auth-user');
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('auth-user'));

        if (!userData) {
            return;
        }

        const loadedUser = new User(
            userData.email,
            userData.id,
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
