import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private isAuthenticated = false;
  tokenKey = 'userToken';

  openErrMsgSubject: Subject<boolean> = new Subject<boolean>();
  openLoaderSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router) {
    this.isLoggedIn();
  }

  isLoggedIn() {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      this.isAuthenticated = true;
      this.isAuthenticatedSubject.next(true);
      this.router.navigate(['/cards']);
    }
  }

  login(form: any): void {
    this.openLoaderSubject.next(true);
    if (form.username === 'richardy.vitorino' && form.password === 'password') {
      const token = form.username;
      localStorage.setItem(this.tokenKey, token);
      this.isAuthenticated = true;
      this.isAuthenticatedSubject.next(true);
      this.router.navigate(['/cards']);
      this.openErrMsgSubject.next(false);
    } else {
      this.isAuthenticated = false;
      this.isAuthenticatedSubject.next(false);
      this.openErrMsgSubject.next(true);
    }
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticated = false;
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}